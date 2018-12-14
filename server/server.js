require('./config/config');
const path          = require('path');
const http          = require('http');
const express       = require('express');
const socketIO      = require('socket.io');
const bodyParser    = require('body-parser');
const hbs           = require('hbs');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const registerRouter = require('./routes/register');
const loginRouter    = require('./routes/login');

var app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

var server = http.createServer(app);
var io  = socketIO(server);

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});