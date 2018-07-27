const fs = require('fs')

const cfg = "config.json"

class ConfigLoader {
	constructor() {
		this.config = JSON.parse(fs.readFileSync(cfg, 'utf8'));
	}

	load() {
		return this.config
	}
}

module.exports = {
	load: new ConfigLoader().load()
}