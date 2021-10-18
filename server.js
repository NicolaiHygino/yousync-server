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

  socket.on('play', () => {
    console.log('play event');
    socket.to(socket.data.room).emit('play');
  });

  socket.on('pause', () => {
    console.log('pause event');
    socket.to(socket.data.room).emit('pause');
  })
});
