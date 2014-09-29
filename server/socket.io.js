Fiber = Meteor.npmRequire('fibers'), 
io = Meteor.npmRequire('socket.io')(8080);

//if address already in use, it throw an error.

io.on('connection', function(socket) {
  socket.emit('news', {
    hello: 'world'
  });
  /*socket.on('my other event', Meteor.bindEnvironment(function(err, res) {
    console.log(res);
    Panini.insert({
      text: "Hello, world!"
    });
  }, function(err) {
    console.error(err);
  }));*/
  socket.on('my other event', function(data) {
    console.log(data);
    Fiber(function() {
      Panini.insert({
        text: "Hello, world!"
      }, function(err, res){
        if(err)
          console.error("Insert failed");
        else
          console.log('New insert: '+res);
      });
    }).run();
  });
});