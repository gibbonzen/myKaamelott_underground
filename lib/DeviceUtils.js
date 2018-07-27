const config = global.config
const Imports = global.Imports
const path = Imports.path
const LOG = Imports.LOG

module.exports = class DeviceUtils {
	static loadAllDevices() {
		let devicesCfg = config.devices
		let devices = []
		devicesCfg.load.map(d => {
			try {
				let file = path.join(devicesCfg.dir, d)
				return Imports.JsonUtils.parseJsonFile(file)
			} catch(e) {
				throw e
			}
		}).forEach(d => devices.push(Imports.DeviceFactory.createNewDevice(d)))
		return devices
	}
}