$(document).ready(function() {
  socket = io.connect('http://'+window.location.host);
  socket.on('answering', function(data) { 
    $("#answering-team span").html(data);
    display = $('#timer span');
    startTimer(10, display);

  });
});


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
  var IntervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" +seconds);
        if (--timer < 0) {
            timer = duration;
            clearInterval(IntervalId);
            $("#answering-team span").text(' -- ');
            socket.emit('reset', '1');
        }
    }, 1000);


}
