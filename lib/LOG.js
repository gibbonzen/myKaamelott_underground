'use strict'

const Color = {
	RESET: "\x1b[0m",
	BRIGHT: "\x1b[1m",
	DIM: "\x1b[2m",
	UNDERSCORE: "\x1b[4m",
	BLINK: "\x1b[5m",
	REVERSE: "\x1b[7m",
	HIDDEN: "\x1b[8m",

	FG_BLACK: "\x1b[30m",
	FG_RED: "\x1b[31m",
	FG_GREEN: "\x1b[32m",
	FG_YELLOW: "\x1b[33m",
	FG_BLUE: "\x1b[34m",
	FG_MAGENTA: "\x1b[35m",
	FG_CYAN: "\x1b[36m",
	FG_WHITE: "\x1b[37m",

	BG_BLACK: "\x1b[40m",
	BG_RED: "\x1b[41m",
	BG_GREEN: "\x1b[42m",
	BG_YELLOW: "\x1b[43m",
	BG_BLUE: "\x1b[44m",
	BG_MAGENTA: "\x1b[45m",
	BG_CYAN: "\x1b[46m",
	BG_WHITE: "\-x1b[47m"
};

const LEVEL = {
	INFO: Color.FG_BLUE,
	NORMAL: Color.FG_WHITE,
	WARNING: Color.FG_RED

};

class LOG {
	static log(level, msg, force) {
		if(global.config.mode === "DEBUG" || force)
			console.log(`${level}%s${Color.RESET}`, msg === undefined ? "" : msg);
	}

	static socketServer(msg, force) {
		LOG.log(Color.FG_BLUE, `Server: ${msg}`, force);
	}

	static socketClient(msg, force) {
		LOG.log(Color.FG_GREEN, `Client ask: ${msg}`, force);
	}

	static server(msg, force) {
		LOG.log(Color.FG_CYAN, `${msg}`, force);
	}

	static client(msg, force) {
		LOG.log(Color.FG_GREEN, `${msg}`, force);
	}

	static device(device, msg, force) {
		LOG.log(Color.FG_YELLOW, `${device.name}: ${msg}`, force)
	}
}

module.exports = {
	log: LOG.log,
	server: LOG.server,
	client: LOG.client,
	device: LOG.device,
	LEVEL: LEVEL
}
