<script lang="ts">
	import '@xterm/xterm/css/xterm.css';

	import { Card } from '@timeleap/ui';
	import type { IDisposable, Terminal } from '@xterm/xterm';
	import type { FitAddon } from '@xterm/addon-fit';
	import type { ImageAddon } from '@xterm/addon-image';

	const makeTerminal = async () => {
		const { Terminal } = await import('@xterm/xterm');
		const { FitAddon } = await import('@xterm/addon-fit');
		const { ImageAddon } = await import('@xterm/addon-image');
		const { CanvasAddon } = await import('@xterm/addon-canvas');

		const term = new Terminal({
			fontFamily: "'Geist Mono', monospace",
			allowProposedApi: true,
			cursorBlink: true,
			cursorStyle: 'underline',
			fontSize: 16,
			fontWeight: 'normal',
			convertEol: true,
			allowTransparency: true,
			theme: {
				background: 'rgba(0,0,0,0)'
			}
		});

		const fitAddon = new FitAddon();
		const canvasAddon = new CanvasAddon();
		const imageAddon = new ImageAddon();

		term.loadAddon(canvasAddon);
		term.loadAddon(fitAddon);
		term.loadAddon(imageAddon);

		return { term, fitAddon };
	};

	const terminal = (
		node: HTMLElement,
		{ term, fitAddon }: { term: Terminal; fitAddon: FitAddon }
	) => {
		term.open(node);
		fitAddon.fit();

		const socket = new WebSocket('ws://localhost:2326');

		const originalCreateImageBitmap = window.createImageBitmap;
		const retinaCreateImage = (blob: ImageBitmapSource, options?: ImageBitmapOptions) => {
			const dpi = window.devicePixelRatio || 1;
			const resizeHeight = options?.resizeHeight && options.resizeHeight / dpi;
			const resizeWidth = options?.resizeWidth && options.resizeWidth / dpi;
			return originalCreateImageBitmap(blob, { ...options, resizeWidth, resizeHeight });
		};

		if (window.createImageBitmap) {
			window.createImageBitmap = retinaCreateImage;
		}

		socket.onmessage = (event) => {
			term.write(event.data);
		};

		let lineBuffer: string[] = [];
		let history = [];
		let shellListener: IDisposable | null = null;
		let offset = 0;

		async function simpleShell(data: string) {
			// string splitting is needed to also handle multichar input (eg. from copy)
			for (let i = 0; i < data.length; ++i) {
				const c = data[i];
				if (c === '\r') {
					// <Enter> was pressed case
					offset = 0;
					term.write('\r\n');
					if (lineBuffer.length) {
						// we have something in line buffer, normally a shell does its REPL logic here
						// for simplicity - just join characters and exec...
						const command = lineBuffer.join('');
						lineBuffer.length = 0;
						history.push(command);
						try {
							// tricky part: for interactive sub commands you have to detach the shell listener
							// temporarily, and re-attach after the command was finished
							shellListener?.dispose();
							socket.send(command + '\n');
						} catch (e) {
							// we have no real process separation with STDERR
							// simply catch any error and output in red
							const msg = !e ? 'Unknown Error...' : (e as Error).message || e.toString();
							term.write(`\x1b[31m${msg.replace('\n', '\r\n')}\x1b[m`);
						} finally {
							// in any case re-attach shell
							shellListener = term.onData(simpleShell);
						}
					}
					//term.write('> ');
				} else if (c === '\x7F') {
					// <Backspace> was pressed case
					if (lineBuffer.length) {
						if (offset === 0) {
							lineBuffer.pop();
							term.write('\b \b');
						} else if (offset < 0 && Math.abs(offset) !== lineBuffer.length) {
							var insert = '';

							for (var ci = lineBuffer.length + offset; ci < lineBuffer.length; ci++) {
								insert += lineBuffer[ci];
							}

							lineBuffer.splice(lineBuffer.length + offset - 1, 1);

							var lefts = '';

							for (var ci = 0; ci < insert.length; ci++) {
								lefts += '\x1b[1D';
							}

							var termInsert = '\b \b' + insert + ' ' + '\b \b' + lefts;
							term.write(termInsert);
						}
					}
				} else if (['\x1b[A', '\x1b[B', '\x1b[C', '\x1b[D'].includes(data.slice(i, i + 3))) {
					// <arrow> keys pressed
					if (data.slice(i, i + 3) === '\x1b[A') {
						// UP pressed, select backwards from history + erase terminal line + write history entry
					} else if (data.slice(i, i + 3) === '\x1b[B') {
						// DOWN pressed, select forward from history + erase terminal line + write history entry
					} else if (data.slice(i, i + 3) === '\x1b[C') {
						if (offset < 0) {
							term.write('\x1b[1C');
							offset++;
						}
					} else if (data.slice(i, i + 3) === '\x1b[D') {
						if (Math.abs(offset) < lineBuffer.length) {
							term.write('\x1b[1D');
							offset--;
						}
					}

					i += 2;
				} else {
					// push everything else into the line buffer and echo back to user

					var insert = '';
					insert += c;

					for (var ci = lineBuffer.length + offset; ci < lineBuffer.length; ci++) {
						insert += lineBuffer[ci];
					}

					var shift = '';

					if (offset < 0) {
						for (var ci = lineBuffer.length + offset; ci < lineBuffer.length; ci++) {
							shift += '\x1b[1D';
						}
					}

					if (offset === 0) {
						lineBuffer.push(c);
					} else if (offset < 0) {
						lineBuffer.splice(lineBuffer.length + offset, 0, c);
					}

					var termInsert = insert;

					if (offset < 0) {
						termInsert += shift;
					}

					term.write(termInsert);
				}
			}
		}

		shellListener = term.onData(simpleShell);

		socket.onclose = () => {
			term.write('\r\n\x1b[31mConnection Closed\x1b[m\r\n');
			term.onData(() => {}); // stop listening for input
		};

		return {
			destroy() {
				term.dispose();
				socket.close();
				window.createImageBitmap = originalCreateImageBitmap;
			}
		};
	};

	// Allow dragging the terminal
	const terminalHeader = (node: HTMLElement) => {
		let posX = 0; // Track final X position
		let posY = 0; // Track final Y position

		const onMouseDown = (e: MouseEvent) => {
			e.preventDefault();

			// Capture the mouse position at drag start
			const startX = e.clientX;
			const startY = e.clientY;

			const mousemove = (e: MouseEvent) => {
				// Calculate the delta movement
				const dx = e.clientX - startX;
				const dy = e.clientY - startY;

				// Apply the cumulative position
				const currentX = posX + dx;
				const currentY = posY + dy;

				if (node.parentElement) {
					node.parentElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
				}
			};

			const mouseup = (e: MouseEvent) => {
				// Finalize position by updating posX and posY
				posX += e.clientX - startX;
				posY += e.clientY - startY;

				// Cleanup event listeners
				document.removeEventListener('mousemove', mousemove);
				document.removeEventListener('mouseup', mouseup);
			};

			// Attach event listeners for drag movement and release
			document.addEventListener('mousemove', mousemove);
			document.addEventListener('mouseup', mouseup);
		};

		// Attach mousedown to the node
		node.addEventListener('mousedown', onMouseDown);

		return {
			destroy() {
				node.removeEventListener('mousedown', onMouseDown);
			}
		};
	};
</script>

{#await makeTerminal() then res}
	<Card
		class="w-full bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 pt-24 relative z-20"
	>
		<div
			class="absolute top-0 right-0 left-0 z-0 flex justify-between border-b border-zinc-800 py-3 px-4"
			use:terminalHeader
		>
			<h2 class="text-zinc-600 text-sm">Game.</h2>
			<!-- Terminal buttons -->
			<div class="flex gap-2 items-center">
				<div class="rounded-full bg-green-500 w-3 h-3"></div>
				<div class="rounded-full bg-yellow-500 w-3 h-3"></div>
				<div class="rounded-full bg-red-500 w-3 h-3"></div>
			</div>
		</div>
		<div class="terminal h-full w-ful mt-8" use:terminal={res}></div>
	</Card>
{/await}
