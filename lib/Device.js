const Imports = global.Imports
const EventEmitter = Imports.EventEmitter
//const express = Imports.express
const LOG = Imports.LOG
const JsonRouter = Imports.JsonRouter
const SocketRouter = Imports.SocketRouter

module.exports = class Device extends EventEmitter {
	constructor(buffer) {
		super()
		this.name = buffer.name
		this.routes = buffer.routes
		this.routers = []

		this.initDevice(buffer)
		this.initRoot()
		this.defineRouters()
	}

	initDevice(buffer) {}

	initRoot() {
		let rootRoute = this.routes.find(route => route.root === true)
		let name = this.name.trim().toLowerCase()
			.replace(/[\W\s]/gi,'')
		rootRoute = rootRoute !== undefined ? rootRoute : "/" 
		this.root = rootRoute.url === "/" ? `/${name}` : rootRoute.url
	}

	defineRouters() {
		this.routes.forEach(route => this.createRoute(route, this[route.for]))
	}

	createRoute(route, method) {
		let isGettable = route.get === true
		let isPostable = route.post === true
		let isSocketable = route.socket === true

		let routePath = route.root ? this.root : `${this.root}${route.url}`

		if(isGettable) this.routers.push(new JsonRouter(routePath, "GET", method))
		if(isPostable) this.routers.push(new JsonRouter(routePath, "POST", method))
		if(isSocketable) new SocketRouter(routePath, method)
	}

	getRouters() {
		return this.routers
	}

	log(msg) {
		LOG.device(this, msg)
	}
}