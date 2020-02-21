
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const router = require('./router');
const fs = require('fs');
const helmet = require("helmet");

const secureHttp = false;
const port = 443;

app.use(cors()); //https://expressjs.com/en/resources/middleware/cors.html
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

app.use(helmet());




if(secureHttp){
	const https = require('https');
	const pswd = require("./config.js");

	https.createServer({
		key: fs.readFileSync('key.pem'),
		cert: fs.readFileSync('cert.pem'),
		passphrase: pswd
	}, app).listen(port, () => {
		console.log(`Listening on port ${port}`)
	});
}
else{
	const http = require('http');
	http.createServer(app).listen(port, () => {
		console.log(`Listening on port ${port}`)
	});
}