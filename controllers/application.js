var exec = require('child_process').exec;

function index(req, res) {
    res.render('index', {user: req.session.user});
}

function login(req, res) {
    res.render('login');
}

function signup(req, res) {
    res.render('signup');
}

function chatroom(req, res) {
    res.render('chatroom', {user: req.session.user});
}

function nodeVersion(req, res) {



    res.send(process.version + ' ' + JSON.stringify(process.memoryUsage()));
}


function eatBuffer(req, res) {

    var Buffer = require('buffer').Buffer;
    var n = 1024 * 1024 * 10;

    var b = new Buffer(n);
    for (var i = 0; i < n; i++) {
        b[i] = Math.floor((Math.random()*100)+1);
    }


    console.log('' + b[124*1024*10-1]);

    res.send('' + b);
}


function eatMore(req, res) {

    var cur = 167772160;
    var bcast = 167872160;//184549375;
    var addresses = [];
    while (cur <= bcast){
        cur += 1;
        addresses.push(cur);
    }
    console.log(addresses.length);
    console.log(addresses); // memory goes from a few megs to over a gig in seconds when trying to print this
    res.send(addresses);
//    res.render('index', { title: 'Welcome to Node.ACS! ' + process.version });

}


function cleanupACS(req, res){
    var prev48 = Date.now() - (1000 * 60 * 60 * 48);
    console.log("Deleting results older than "+new Date(prev48).toLocaleString());
    exec('curl -F "login=user2@ypjin.com" -F "password=user2" http://api.cloud.appcelerator.com/v1/users/login.json?key=Pi3lvcEaaDvLZ7Fcixntx4PlJPjG7zb4', function(error, stdout, stderr){
        console.log("login done")
        var sessionId = JSON.parse(stdout).meta.session_id;
        exec('curl -X DELETE -F \'where={"timestamp":{"$lt": '+prev48+'}}\' "http://api.cloud.appcelerator.com/v1/objects/result/admin_batch_delete.json?key=Pi3lvcEaaDvLZ7Fcixntx4PlJPjG7zb4&_session_id='+sessionId+'"', function(error, stdout, stderr){
            res.write(stdout);
            res.end();
        });
    })
}