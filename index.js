var express = require('express');
var config = require('config');
var app = express();
app.set('view engine', 'pug');
app.set('views','./templates');
app.use(require('express-jquery')('/jquery.js'));
app.use(express.static('public'));



app.get('/', function(req, res){
     res.render("play");
});

app.get('/dashboard', function(req, res){
     res.render('dashboard');
});
var io = require('socket.io').listen(app.listen(config.get('port')));

console.log("Serving on address: http://localhost:"+config.get('port'));

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


