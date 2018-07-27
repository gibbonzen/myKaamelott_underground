const LOG = Imports.LOG
const express = Imports.express
const app = Imports.app

module.exports = class JsonRouter {
	constructor(path, method, response) {
		LOG.server(`Create new <${method}> route listen on ${path}`)

		this.router = express.Router()
		if("GET" === method) {
			this.createGetRoute(path, response)
		}
		if("POST" === method) {
			this.createPostRoute(path, response)
		}

		this.publish()
	}

	createGetRoute(path, response) {
		this.router.get(path, (req, res) => {
			res.json(response)
		})
	}

	createPostRoute(path, response) {

	}

	publish() {
		app.use(this.router)
	}

}