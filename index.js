const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var message = 'Vitajte na serveri';
var timestmp = Date.now();
var userName = 'admin';

app.use(
	bodyParser.urlencoded({
		extended: true
	})
)

app.use(bodyParser.json());

app.get('/', (req, res) => {
    var JSON = {
	time: timestmp,
	sprava: message,
	user: userName
}
    res.send(JSON);
});

app.post('/',(req, res) => {
	res.send('Post metoda');
	message = req.body.sprava;
	timestmp = Date.now();
	userName = req.body.user;
});

app.get('/api/courses', (req, res) => {
	res.send([1, 2, 3]);
});

app.listen(4000, () => console.log('Listening on port 3000..'));
