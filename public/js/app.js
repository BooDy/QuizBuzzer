$(document).ready(function() {
  $("#set-name").click(function() { 
    team_name = $("#team-name").val();
    if (!team_name.length > 0) {
      return;
    }
    $("#set-name").hide();
    $("#team-name").hide();
    $("#team-label").html(team_name);
    $("#answer-button").removeClass('hidden');
    $("#team-name-container").removeClass('hidden');
  });

  var socket = io.connect('http://'+window.location.host);
  socket.on('message', function(data) { 
    console.log(data);
  });

  $("#answer-button").click(function() { 
    socket.emit('answering', team_name);
  });

});


