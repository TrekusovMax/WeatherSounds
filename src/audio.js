export class Sound {
	#media
	constructor(sound) {
		this.#media = sound
	}
	play() {
		this.#media.play()
	}
	pause() {
		this.#media.pause()
	}
}
