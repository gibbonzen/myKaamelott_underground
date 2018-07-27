// { module:string, name:string, method:string, params:...string }
// const IMPORTS = []

class Imports {

	constructor() {
		if(this.modules === undefined) {
			this.init(config.modules)
		}
	}

	init(cfg) {
		log("Class loader init...")
		global.Imports = {}

		cfg.forEach(include => {
			let m = new ImportedModule(include)
			global.Imports[m.name] = m.getModule()
		})
	}

	getModules() {
		return global.Imports
	}

}

class ImportedModule {
	constructor(include) {
		this.includeModule = undefined

		this.modul = include[0]
		this.name = include[0]
		this.call = undefined
		this.params = undefined

		if(include.length >= 2) {
			this.name = include[1]
		}
		if(include.length >= 3) {
			this.call = include[2]
		}
		if(include.length >= 4) {
			this.params = global.Imports[include[3]]
		}

		log(`Chargement du module: ${this.name}`)
		this.loadModule()
	}

	loadModule() {
		let load
		try {
			load = require(this.modul)
		} catch(e) {
			throw new ModuleMissingException(e, "Module", `Impossible de charger le module: ${this.name}`)
		}

		if(this.call !== undefined) {
			let method = load[this.call]

			if(this.params !== undefined) {
				try {
					// Call constructor
					if(this.call === "constructor" || this.call === "")
						load = new load(this.params)
					else
						load = method.call(this.params)
				} catch(e) {
					throw new ModuleMissingException(e, "Calling method with parameters", `Impossible d'appeler la méthode': ${this.call} avec paramètres`)
				}
			}
			else {
				try {
					// Call constructor
					if(this.call === "constructor" || this.call === "")
						load = new load()
					else
						loal = method.call()
				} catch(e) {
					throw new ModuleMissingException(e, "Calling method without parameters", `Impossible d'appeler la méthode': ${this.call}`)
				}	
			}

		}

		this.includeModule = load
	}

	getModule() {
		return this.includeModule
	}
}

function ModuleMissingException(e, origin, message) {
	this.name = "ModuleMissingException"
	this.e = e
	this.origin = origin
	this.message = message

	log(this.message, "\x1b[31m")
	log(e)
	log("---------------\n")
}

function log(msg, color) {
	if(global.config.mode === "DEBUG")
		color === undefined ? console.log("\x1b[0m", msg) : console.log(color, msg)
}

module.exports = {
	Imports: new Imports().getModules()
}