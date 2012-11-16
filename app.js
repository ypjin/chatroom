var ACS = require('acs').ACS;
var logger = require('acs').logger;

// initialize app (setup ACS library and logger)
function start(app, express) {
	ACS.init('04mV26UF5Uhn6yzcWs9biHtbnqxVfm9B', '1z1HgAlxleiVXbCLz1pZqpSvJtEDoZWu');
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