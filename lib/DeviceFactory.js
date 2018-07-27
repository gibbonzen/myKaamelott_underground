const path = global.Imports.path
const LOG = global.Imports.LOG

module.exports = class DeviceFactory {
	static createNewDevice(buffer) {
		deviceFind(buffer.name)

		try {
			let module = requireMod(buffer.type)
			if(module !== undefined) {
				return new module(buffer)
			}
		} catch(e) {
			LOG.log(LOG.LEVEL.WARNING, `Can't load module: ${buffer.name}`)
			LOG.log(e)
		}
	}
}

function deviceFind(name) {
	LOG.server(`Try to load device [${name}]...`)
}

function requireMod(module) {
		let firstLetter = module.substr(0, 1)
		module = module.replace(firstLetter, firstLetter.toUpperCase())
	try {
		let devPath = path.resolve('./lib', module)
		const deviceModule = require(devPath)
		return deviceModule
	}
	catch(e) {
		LOG.log(LOG.LEVEL.WARNING, `Error on loading ${module}`)
		console.log(e)

		if("MODULE_NOT_FOUND" === e.code) {
			let pattern = "^Cannot find module '(.*)'.*"
			let regex = new RegExp(pattern, "gi")
			let moduleNotFind = regex.exec(e.message)
			if(moduleNotFind !== null) {
				LOG.log(LOG.LEVEL.INFO, `Module not find: ${moduleNotFind[1]}`)
			}
		}
	}
}