<script lang="ts">
	import '@xterm/xterm/css/xterm.css';

	import Icon from '@iconify/svelte';
	import Rain from './Rain.svelte';
	import Snow from './Snow.svelte';

	import { Card } from '@timeleap/ui';
	import { SoundBlaster } from '$lib/utils/sound';
	import { fade } from 'svelte/transition';

	import type { IDisposable, Terminal } from '@xterm/xterm';
	import type { FitAddon } from '@xterm/addon-fit';

	const makeTerminal = async () => {
		const { Terminal } = await import('@xterm/xterm');
		const { FitAddon } = await import('@xterm/addon-fit');
		const { ImageAddon } = await import('@xterm/addon-image');
		const { CanvasAddon } = await import('@xterm/addon-canvas');

		const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

		const term = new Terminal({
			fontFamily: "'Geist Mono', monospace",
			allowProposedApi: true,
			cursorBlink: true,
			cursorStyle: 'underline',
			fontSize: isSmallScreen ? 12 : 16,
			fontWeight: 'normal',
			convertEol: true,
			allowTransparency: true,
			theme: {
				background: 'rgba(0,0,0,0)'
			},
			...(isSmallScreen && { cols: 140 })
		});

		const fitAddon = new FitAddon();
		const canvasAddon = new CanvasAddon();
		const imageAddon = new ImageAddon();

		term.loadAddon(canvasAddon);
		term.loadAddon(fitAddon);
		term.loadAddon(imageAddon);

		const sound = await getSound();

		return { term, fitAddon, sound };
	};

	const getSound = async () => {
		const sound = new SoundBlaster();
		// Ambient sounds
		await sound.load('doom', '/audio/doom.mp3', true, true, 0.6); // [!]
		await sound.load('suspense', '/audio/suspense.mp3', true, true, 0.6); // [!]
		await sound.load('sad', '/audio/sad.mp3', true, true, 0.6); // [!]
		await sound.load('joy', '/audio/joy.mp3', true, true, 0.6); // [!]
		await sound.load('danger', '/audio/danger.mp3', true, true, 0.6); // [!]
		await sound.load('ghost', '/audio/ghost.wav', true, true, 0.6); // [!]
		await sound.load('dracula', '/audio/dracula.mp3', true, true, 0.6); // [!]
		await sound.load('victory', '/audio/victory.mp3', true, true, 0.6); // [!]
		await sound.load('handel', '/audio/handel.mp3', true, true, 0.6); // [!]
		await sound.load('battle', '/audio/battle.mp3', true, true, 0.6); // [!]
		await sound.load('evil', '/audio/evil.mp3', true, true, 0.6); // [!]
		await sound.load('epic', '/audio/epic.mp3', true, true, 0.6); // [!]
		await sound.load('vampire', '/audio/vampire.mp3', true, true, 0.6); // [!]
		await sound.load('calm', '/audio/calm.mp3', true, true, 0.6); // [!]
		await sound.load('samurai', '/audio/samurai.mp3', true, true, 0.6); // [!]
		await sound.load('mystery', '/audio/mystery.mp3', true, true, 0.6); // [!]
		await sound.load('cursed', '/audio/cursed.mp3', true, true, 0.6); // [!]
		await sound.load('madness', '/audio/madness.mp3', true, true, 0.6); // [!]
		await sound.load('heartbeat', '/audio/heartbeat.mp3', true, true, 0.6); // [!]
		await sound.load('chase', '/audio/chase.mp3', true, true, 0.6); // [!]
		await sound.load('jinxed', '/audio/jinxed.mp3', true, true, 0.6); // [!]

		// Sound effects
		await sound.load('death', '/audio/death.wav', false, false, 1); // [!]
		await sound.load('item', '/audio/item.wav', false, false, 1); // [!]
		await sound.load('sword', '/audio/sword.wav', false, false, 1); // [!]
		await sound.load('uncork', '/audio/uncork.wav', false, false, 1); // [!]
		await sound.load('spell', '/audio/spell.mp3', false, false, 1); // [!]
		await sound.load('teleport', '/audio/teleport.wav', false, false, 1); // [!]
		await sound.load('whoosh', '/audio/whoosh.wav', false, false, 1); // [!]
		await sound.load('drink', '/audio/drink.wav', false, false, 1); // [!]
		await sound.load('eat', '/audio/eat.wav', false, false, 1); // [!]
		await sound.load('choking', '/audio/choking.mp3', false, false, 1); // [!]
		await sound.load('acid', '/audio/acid.mp3', false, false, 1); // [!]
		await sound.load('bell', '/audio/bell.mp3', false, false, 1); // [!]
		await sound.load('hiss', '/audio/hiss.mp3', false, false, 1); // [!]
		await sound.load('meow', '/audio/meow.mp3', false, false, 1); // [!]
		await sound.load('trap', '/audio/trap.wav', false, false, 1); // [!]
		await sound.load('scream', '/audio/scream.wav', false, false, 1); // [!]
		await sound.load('thump', '/audio/thump.mp3', false, false, 1); // [!]
		await sound.load('cold', '/audio/cold.mp3', false, false, 1); // [!]
		await sound.load('burn', '/audio/burn.mp3', false, false, 1); // [!]
		await sound.load('steps', '/audio/steps.mp3', false, false, 1); // [!]
		await sound.load('gate', '/audio/gate.mp3', false, false, 1); // [!]
		await sound.load('door', '/audio/door.wav', false, false, 1); // [!]
		await sound.load('blackhole', '/audio/blackhole.wav', false, false, 1); // [!]
		await sound.load('insert', '/audio/insert.wav', false, false, 1); // [!]
		await sound.load('banshee', '/audio/banshee.wav', false, false, 1); // [!]
		await sound.load('delicious', '/audio/delicious.mp3', false, false, 1); // [!]
		await sound.load('honk', '/audio/honk.mp3', false, false, 1); // [!]
		await sound.load('laugh', '/audio/laugh.mp3', false, false, 1); // [!]
		await sound.load('angrycat', '/audio/angrycat.wav', false, false, 1); // [!]
		await sound.load('redcat', '/audio/redcat.wav', false, false, 1); // [!]
		await sound.load('shovel', '/audio/shovel.wav', false, false, 1); // [!]
		await sound.load('distorted', '/audio/distorted.wav', false, false, 1); // [!]
		await sound.load('dice', '/audio/dice.mp3', false, false, 1); // [!]
		await sound.load('orb', '/audio/orb.wav', false, false, 1); // [!]

		return sound;
	};

	type SoundMeta = {
		id: string;
		overlay: boolean;
	};

	let startSounds: () => void;
	let stopSounds: () => void;
	let muted: boolean = true;
	let rain: boolean = false;
	let snow: boolean = false;
	let restartCount = 0;

	const restartGame = () => {
		restartCount++;
		if (!muted) {
			stopSounds();
			setTimeout(() => {
				startSounds();
			}, 1000);
		}
	};

	const toggleSound = () => {
		if (muted) {
			startSounds();
		} else {
			stopSounds();
		}
	};

	const terminal = (
		node: HTMLElement,
		{ term, fitAddon, sound }: { term: Terminal; fitAddon: FitAddon; sound: SoundBlaster }
	) => {
		term.open(node);

		const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

		if (!isSmallScreen) {
			fitAddon.fit();
		}

		const socket = new WebSocket('wss://3.tlp.sh');

		socket.onmessage = (event) => {
			if (event.data.startsWith('\x1b]777;Audio=')) {
				if (muted) {
					return;
				}

				const base64 = event.data.split(';Audio=')[1].slice(0, -1);
				const meta: SoundMeta = JSON.parse(atob(base64));
				if (meta.overlay) {
					sound.play(meta.id);
				} else {
					sound.stopAllAndPlayIfNotPlaying(meta.id);
				}
				return;
			}
			term.write(event.data);
		};

		let lineBuffer: string[] = [];
		let history: string[] = [];
		let shellListener: IDisposable | null = null;
		let offset = 0;
		let historyIndex = 0;

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
						historyIndex = 0;
						if (history.length === 0 || history[history.length - 1] !== command) {
							history.push(command);
						}
						try {
							// tricky part: for interactive sub commands you have to detach the shell listener
							// temporarily, and re-attach after the command was finished
							shellListener?.dispose();
							socket.send(command + '\n');

							const ambience = Math.floor(Math.random() * 400);

							if (ambience === 42 && !rain) {
								if (snow) {
									snow = false;
								}
								rain = true;
							} else if (ambience === 69 && !snow) {
								if (rain) {
									rain = false;
								}
								snow = true;
							} else if (ambience < 5) {
								if (snow) {
									snow = false;
								} else if (rain) {
									rain = false;
								}
							}
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
						if (historyIndex === history.length) {
							return;
						}
						term.write(
							'\b'.repeat(lineBuffer.length) +
								' '.repeat(lineBuffer.length) +
								'\b'.repeat(lineBuffer.length)
						);
						lineBuffer = history[history.length - 1 - historyIndex].split('');
						term.write(lineBuffer.join(''));
						historyIndex++;
					} else if (data.slice(i, i + 3) === '\x1b[B') {
						// DOWN pressed, select forward from history + erase terminal line + write history entry
						if (historyIndex === 1) {
							return;
						}
						term.write(
							'\b'.repeat(lineBuffer.length) +
								' '.repeat(lineBuffer.length) +
								'\b'.repeat(lineBuffer.length)
						);
						historyIndex--;
						lineBuffer = history[history.length - historyIndex].split('');
						term.write(lineBuffer.join(''));
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

		const originalCreateImage = window.createImageBitmap;
		const retinaCreateImage = (image: ImageBitmapSource, options?: ImageBitmapOptions) => {
			if (options?.resizeHeight && options?.resizeWidth && options?.resizeWidth > 800) {
				const ratio = options.resizeWidth / 800;
				const width = Math.floor(options.resizeWidth / ratio);
				const height = Math.floor(options.resizeHeight / ratio);
				return originalCreateImage(image, { ...options, resizeWidth: width, resizeHeight: height });
			}
			return originalCreateImage(image, options);
		};

		if (window.createImageBitmap) {
			window.createImageBitmap = retinaCreateImage;
		}

		startSounds = () => {
			sound.playIfNotPlaying('doom');
			muted = false;
		};

		stopSounds = () => {
			sound.stopAll();
			muted = true;
		};

		return {
			destroy() {
				term.dispose();
				socket.close();
				window.createImageBitmap = originalCreateImage;
				node.removeEventListener('click', startSounds);
			}
		};
	};

	let isMaximized = false;
	let translate = '';

	let initialHeight: number;
	let initialWidth: number;

	const toggleMaximize = (fitAddon: FitAddon) => () => {
		isMaximized = !isMaximized;
		const game = document.querySelector('.game') as HTMLElement;
		const terminal = document.querySelector('.terminal.xterm') as HTMLElement;

		initialHeight ??= terminal.getBoundingClientRect().height;
		initialWidth ??= terminal.getBoundingClientRect().width;

		game.classList.toggle('fullscreen');

		if (isMaximized) {
			game.style.transform = 'none';
		} else {
			game.style.transform = translate;
		}

		if (!isMaximized) {
			terminal.style.height = `${initialHeight}px`;
			terminal.style.width = `${initialWidth}px`;
		}

		fitAddon.fit();
	};

	const minimize = () => {
		const game = document.querySelector('.game') as HTMLElement;
		game.style.transform = 'translate(0, 100vh) scale(0)';
	};

	const closeGame = () => {
		const game = document.querySelector('.game') as HTMLElement;
		game.style.transform = 'scale(0)';
	};

	// Allow dragging the terminal
	const terminalHeader = (node: HTMLElement) => {
		let posX = 0; // Track final X position
		let posY = 0; // Track final Y position

		const onMouseDown = (e: MouseEvent) => {
			e.preventDefault();

			if (isMaximized) {
				return;
			}

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

				const game = document.querySelector('.game') as HTMLElement;

				translate = `translate(${currentX}px, ${currentY}px)`;
				game.style.transform = `${translate} scale(0.95)`;
			};

			const mouseup = (e: MouseEvent) => {
				// Finalize position by updating posX and posY
				posX += e.clientX - startX;
				posY += e.clientY - startY;

				// Cleanup event listeners
				document.removeEventListener('mousemove', mousemove);
				document.removeEventListener('mouseup', mouseup);

				const game = document.querySelector('.game') as HTMLElement;
				game.style.transform = translate;
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

	const glow = (node: HTMLElement) => {
		const mousemove = (e: MouseEvent) => {
			const rect = node.getBoundingClientRect();
			const x = e.clientX - rect.left; // Mouse X position within card
			const y = e.clientY - rect.top; // Mouse Y position within card

			// Create glow effect by setting a radial gradient
			const glow = node.querySelector('.glow') as HTMLElement;
			glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(200, 200, 200, 0.1), transparent 100%)`;
		};

		node.addEventListener('mousemove', mousemove);

		return {
			destroy() {
				node.removeEventListener('mousemove', mousemove);
				stopSounds();
			}
		};
	};
</script>

{#key restartCount}
	{#await makeTerminal()}
		<div class="text-white flex items-center">
			<span class="animate-ping inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75 mr-4"></span>
			Loading...
		</div>
	{:then res}
		<div class="game-container" use:glow>
			<Card
				class="game w-full bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 pt-24 relative z-20"
			>
				{#if rain}
					<div
						class="snow absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 z-10"
						transition:fade
					>
						<Rain />
					</div>
				{:else if snow}
					<div
						class="snow absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 z-10"
						transition:fade
					>
						<Snow />
					</div>
				{/if}
				<div class="glow absolute top-0 left-0 w-full h-full pointer-events-none z-0"></div>
				<div
					class="absolute top-0 right-0 left-0 z-20 flex justify-end sm:justify-between border-b border-zinc-800 py-3 px-4"
					use:terminalHeader
				>
					<div class="text-zinc-600 text-sm title hidden sm:block">
						The Shadowblade Chronicles <span class="text-xs">v1.0.0</span>
					</div>
					<div class="flex gap-2 items-center">
						<button
							class="p-1 mr-1 flex items-center px-4 rounded-full transition-colors duration-300 ease-in-out text-xs focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer hover:bg-zinc-700 bg-zinc-800 text-white"
							on:click={toggleSound}
						>
							Sound <Icon
								icon={muted ? 'carbon:volume-up' : 'carbon:volume-mute'}
								class="w-4 h-4 ml-2"
							/>
						</button>
						<button
							class="p-1 mr-2 flex items-center px-4 rounded-full transition-colors duration-300 ease-in-out text-xs focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer hover:bg-zinc-700 bg-zinc-800 text-white"
							on:click={restartGame}
						>
							Restart <Icon icon="carbon:restart" class="w-4 h-4 ml-2" />
						</button>
						<button
							class="rounded-full bg-green-500 w-3 h-3 cursor-pointer"
							on:click={toggleMaximize(res.fitAddon)}
						></button>
						<button class="rounded-full bg-yellow-500 w-3 h-3 cursor-pointer" on:click={minimize}
						></button>
						<button class="rounded-full bg-red-500 w-3 h-3 cursor-pointer" on:click={closeGame}
						></button>
					</div>
				</div>
				<div class="relative overflow-y-hidden overflow-x-auto grid grid-cols-1">
					<div class="terminal h-full w-full mt-8" use:terminal={res}></div>
				</div>
			</Card>
		</div>
	{/await}
{/key}

<style>
	.game-container :global(.game) {
		box-shadow:
			3.2px 1.1px 7.7px -9px rgba(0, 0, 0, 0.036),
			6px 2px 14.9px -9px rgba(0, 0, 0, 0.052),
			8.5px 2.8px 21.6px -9px rgba(0, 0, 0, 0.063),
			11.2px 3.7px 28.5px -9px rgba(0, 0, 0, 0.074),
			15.5px 5.2px 38.9px -9px rgba(0, 0, 0, 0.087),
			30px 10px 80px -9px rgba(0, 0, 0, 0.12);
		transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
	}

	.game-container :global(.fullscreen) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		transform: none !important;
	}

	.glow {
		transition: opacity 0.4s ease-in-out; /* Smoothens the glow effect */
		opacity: 0;
		background-blend-mode: multiply;
		will-change: background;
		transform: translateZ(0);
	}

	.game-container:hover .glow {
		opacity: 1;
	}

	.title {
		transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
	}

	.game-container:hover .title {
		color: var(--color-zinc-400);
	}

	.game-container :global(.fullscreen) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
	}
</style>
