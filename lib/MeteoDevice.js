const Imports = global.Imports
const Device = Imports.Device

module.exports = class MeteoDevice extends Device {
	constructor() {
		super("MeteoIndoor")
	}
}