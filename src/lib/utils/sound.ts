import { Howl, Howler } from 'howler';

export class SoundBlaster {
	private sounds: Record<string, Howl> = {};
	private playing: string[] = [];
	public howler = Howler;

	constructor() {
		Howler.volume(1);
	}

	public load(id: string, src: string, loop = false, stream = false, volume = 1): Promise<void> {
		return new Promise((resolve, reject) => {
			this.sounds[id] = new Howl({
				src: [src],
				loop,
				html5: stream,
				volume: volume,
				onload() {
					resolve();
				},
				onloaderror() {
					reject();
				}
			});
			this.sounds[id].on('play', () => {
				this.setPlaying(id);
			});
			this.sounds[id].on('end', () => {
				this.removePlaying(id);
			});
		});
	}

	public play(id: string): void {
		this.sounds[id].play();
	}

	public playIfNotPlaying(id: string): void {
		if (!this.sounds[id].playing()) {
			this.sounds[id].play();
		}
	}

	public stop(id: string): void {
		this.sounds[id].stop();
	}

	public fadeOut(id: string, duration: number): void {
		this.sounds[id].fade(1, 0, duration);
	}

	public fadeIn(id: string, duration: number): void {
		this.sounds[id].volume(0);
		this.sounds[id].play();
		this.sounds[id].fade(0, 1, duration);
	}

	public stopAll(): void {
		this.playing.forEach((sound) => {
			this.sounds[sound].stop();
		});
	}

	public stopAllAndPlay(id: string): void {
		this.stopAll();
		this.play(id);
	}

	public stopAllAndPlayIfNotPlaying(id: string): void {
		if (!this.sounds[id].playing()) {
			this.stopAllAndPlay(id);
		}
	}

	public fadeTo(id: string, duration: number): void {
		this.playing.forEach((sound) => {
			this.sounds[sound].fade(this.sounds[sound].volume(), 0, duration);
		});

		this.fadeIn(id, duration);
	}

	public get(id: string): Howl {
		return this.sounds[id];
	}

	private setPlaying(id: string): void {
		this.playing.push(id);
	}

	private removePlaying(id: string): void {
		this.playing = this.playing.filter((sound) => sound !== id);
	}
}
