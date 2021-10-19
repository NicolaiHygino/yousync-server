const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  socket.on('login', values => {
    socket.data.username = values.username;
    socket.data.room = values.room;
    socket.join(values.room);
  });

  // socket.on('play', () => {
  //   socket.to(socket.data.room).emit('play');
  // });

  // socket.on('pause', () => {
  //   socket.to(socket.data.room).emit('pause');
  // });

  socket.on('stateChange', state => {
    console.log('event fired');
    socket.to(socket.data.room).emit('stateChange', state);
  });
});
