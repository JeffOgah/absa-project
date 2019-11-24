var express = require("express");
var bodyParser = require('body-parser');

const routes = require('./routes');

var app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', process.env.PORT || 3000);

app.use(express.static("public"));
app.use(routes);
app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});