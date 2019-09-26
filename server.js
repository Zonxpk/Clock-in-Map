
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const configurePassport = require('./server/config/passport');

// Get our API routes
const api = require('./server/routes/api');

const app = express();
app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Set our api routes
app.use('/api', api);




/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

app.use(express.static('uploads'));
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('set_user', (location) => {
        socket.username = location.name;
        console.log(socket.username+' : connection');
        console.log(location.lat);
        console.log(location.lng);
        // io.emit('users-changed', {user: us_name, event: 'online'});    
    });
    
    socket.on('disconnect', function(){
        console.log(socket.username+' : disconnect');
        // io.emit('users-changed', {user: socket.us_name, event: 'offline'});    
    });
  });
