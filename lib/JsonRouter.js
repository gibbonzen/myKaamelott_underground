const LOG = Imports.LOG
const app = Imports.app
const express = Imports.express

module.exports = class JsonRouter {
	constructor(path, method, response) {
		LOG.server(`Create new <${method}> route listen on ${path}`)

		if("GET" === method) {
			this.createGetRoute(path, response)
		}
		if("POST" === method) {
			this.createPostRoute(path, response)
		}
	}

	createGetRoute(path, response) {
		console.log(`Create route: .${path}.`)
		app.get('/coucou', (req, res) => {
			console.log("Access to router")
			res.send(200)
		})
	}

	createPostRoute(path, response) {

	}

}