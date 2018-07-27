// Entry parameters
let args = process.argv
const Mode = {
	DEBUG: "DEBUG",
	NORMAL:	"NORMAL"
}

launchServer(args)

/// 

function launchServer(args) {
	checkStartMode(args, start, quit)
}

function checkStartMode(args, next, error) {
	let mode = undefined
	if(args.length >= 3) {
		switch(args[2].toUpperCase()) {
			case Mode.DEBUG:
				mode = Mode.DEBUG
				break
			case Mode.NORMAL:
				mode = Mode.NORMAL
				break;
			default:
				mode = Mode.NORMAL
				break
		}
	}

	mode === undefined ? error() : next(mode)
}

// Server
function quit() {
	console.log("Server can't start...")
	process.exit()
}

function start(mode) {
	// Config
	global.config = require('./lib/ConfigLoader').load
	config.mode = mode
	const Imports = require('./lib/Imports').Imports

	let LOG = Imports.LOG

	let app = Imports.app
	app.use(Imports.cors())
	app.use(Imports.bodyParser.json())
	app.use(Imports.bodyParser.urlencoded({extended: true}))

// SERVER //
	Imports.server.listen(config.port, "localhost", () => 
		LOG.server(`Listening on ${config.port}...`, true)
	)

	// SOCKET //
	Imports.io.on('connection', (socket) => {
		socket.emit("message", "Bonjour")
	})

	global.Devices = Imports.DeviceUtils.loadAllDevices()

	app.get('/', (req, res) => {
		console.log("Hello chicken !")
		res.json({t:"t"})
	})
	
}