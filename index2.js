const WebSocket = require('ws');
const bodyParser = require('body-parser');

const wss = new WebSocket.Server({ port: 9011 });
console.log("Server running on " + wss.address);
/*
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
*/

wss.on('connection', function connection(ws,req) {
    const ip = req.connection.remoteAddress;
    console.log("connected " + ip);
    var JSONobj = {
        time: Date.now(),
        message: "Hello user!",
        user: "Server"
    }  
    var myJSON = JSON.stringify(JSONobj); 
    ws.send(myJSON);

    ws.on('message', function incoming(message) {
        var obj = JSON.parse(message);
        var JSONobj = {
            time: Date.now(),
            message: obj.message,
            user: obj.user
        }        
        var myJSON = JSON.stringify(JSONobj); 

       wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(myJSON);
        }
      });       
    });

    ws.on('close', function close() {
        console.log('disconnected');
    });
});