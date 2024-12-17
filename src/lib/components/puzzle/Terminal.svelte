<script lang="ts">
	import '@xterm/xterm/css/xterm.css';

	import TiltCard from '../TiltCard.svelte';
	import type { IDisposable, Terminal } from '@xterm/xterm';
	import type { FitAddon } from '@xterm/addon-fit';
	import type { ImageAddon } from '@xterm/addon-image';

	const makeTerminal = async () => {
		const { Terminal } = await import('@xterm/xterm');
		const { FitAddon } = await import('@xterm/addon-fit');
		const { ImageAddon } = await import('@xterm/addon-image');
		const { WebglAddon } = await import('@xterm/addon-webgl');

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
		const webglAddon = new WebglAddon();
		const imageAddon = new ImageAddon();

		//term.loadAddon(webglAddon);
		term.loadAddon(fitAddon);
		term.loadAddon(imageAddon);

		term.write(
			'\u001b]1337;File=;inline=1:iVBORw0KGgoAAAANSUhEUgAAABAAAAAPBAMAAAAfXVIcAAAAD1BMVEV63/39//w5TVIZFhXDjXbHNiz1AAAARUlEQVR4nJTJUQ3AIAwG4aMzsBYD9FdQEfjXtJBiYPf0JYeHJKUTC8CShYNjaMwas4xoJNHrgKdo7H0x3ovTP3wBAAD//9u1Bcrd6KY0AAAAAElFTkSuQmCC\u0007\n'
		);

		return { term, fitAddon, imageAddon };
	};

	const terminal = (
		node: HTMLElement,
		{ term, fitAddon, imageAddon }: { term: Terminal; fitAddon: FitAddon; imageAddon: ImageAddon }
	) => {
		term.open(node);
		fitAddon.fit();

		console.log(imageAddon);

		const socket = new WebSocket('ws://localhost:2326');

		socket.onmessage = (event) => {
			if (event.data.startsWith('\u001b]1337')) {
				console.log(event.data);
			}
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
			term.dispose();
		};

		return {
			destroy() {
				term.dispose();
			}
		};
	};
</script>

{#await makeTerminal() then res}
	<TiltCard class="bg-zinc-950">
		<div class="terminal h-full w-full" use:terminal={res}></div>
	</TiltCard>
{/await}
