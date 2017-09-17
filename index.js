// setup 
var express  = require('express');
var app      = express();
var config = require('config');

app.set('view engine', 'pug');
app.set('views','./app/templates');
app.use(require('express-jquery')('/jquery.js'));
app.use(express.static('public'));

//Get them routes..
var routes = require('./app/routes.js');

app.use('/', routes);
/*
var routes = requireDir('./app/routes');
for (var i in routes) {
  app.use('/', routes[i]);
}
*/
//Open up, come on... There goes the nice socket.
var io = require('socket.io').listen(app.listen(config.get('port')));

console.log("Serving on address: "+config.get('url')+":"+config.get('port'));

locked = false;
io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'welcome to the quiz night' });
  socket.on('answering', function (data) {
    if (!locked) {
      socket.broadcast.emit('answering', data);
      console.log(data);
      locked = true;
    }
  });

  socket.on('reset', function(data) {
    locked = false;
  });
});
