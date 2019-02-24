const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const router = require('./router');

app.use(cors()); //https://expressjs.com/en/resources/middleware/cors.html
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

var port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});