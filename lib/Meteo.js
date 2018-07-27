const Imports = global.Imports
const Device = Imports.Device

const Mesure = function(unit) {
	return {
		value: 0,
		unit: unit
	}
}

module.exports = class Meteo extends Device {
	constructor(buffer) {
		super(buffer)

		this.checkMeteo()
	}

	// @Override
	initDevice(buffer) {
		this.temperature = Mesure(buffer.mesures.temperature.unit)
		this.humidity = Mesure(buffer.mesures.humidity.unit)
		this.meteo = { 
			"temperature": this.temperature,
			 "humidity": this.humidity
		}
	}

	checkMeteo() {
		this.temperature.value = 32
		this.humidity.value = 43
	}

	getMeteo() {
		return this.meteo
	}

	getTemperature() {
		return this.temperature
			
	}

	getHumidity() {
		return this.humidity
	}

}