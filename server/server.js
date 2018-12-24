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
const indexRouter    = require('./routes/index');
const homeRouter     = require('./routes/home');
const playRouter     = require('./routes/play');

const partialsDir    = __dirname+'/partials';

hbs.registerPartials(partialsDir);

var app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use('/',indexRouter);
app.use('/home',homeRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/play',playRouter);

var server = http.createServer(app);
var io  = socketIO(server);

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});