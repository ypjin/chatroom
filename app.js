var ACS = require('acs').ACS;
var logger = require('acs').logger;

// initialize app (setup ACS library and logger)
function start(app, express) {
    ACS.init('Pi3lvcEaaDvLZ7Fcixntx4PlJPjG7zb4');
	logger.setLevel('DEBUG');
	
	//use connect.session
	app.use(express.cookieParser());
	app.use(express.session({ key: 'node.acs', secret: "my secret" }));
	
	//set favicon
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
}

// release resources
function stop() {
	
}