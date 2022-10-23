export class Logger {
	constructor(private readonly name: string) {}

	neutral(message: string) {
		console.log(`[${this.name} at ${Date.now()}] INFO: ${message}`);
	}

	warning(message: string) {
		console.warn(`[${this.name} at ${Date.now()}] WARNING: ${message}`);
	}

	error(message: string) {
		console.error(`[${this.name} at ${Date.now()}] ERROR: ${message}`);
	}
}
