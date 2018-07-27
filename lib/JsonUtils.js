const Imports = global.Imports
const fs = Imports.fs
const path = Imports.path
const LOG = Imports.LOG
const LEVEL = LOG.LEVEL

module.exports = class JsonUtils {
	static parseJsonFile(file) {
		file = path.resolve(`${file}.json`)
		try {
			LOG.log(`Reading ${file}...`)
			return JSON.parse(fs.readFileSync(file, 'utf8'))
		} catch(e) {
			LOG.log(LEVEL.WARNING, `Impossible de lire le fichier: ${file}`, true)
			LOG.log(e)
		}
	}
}