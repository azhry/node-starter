const app = require('express')();
const http = require('http').Server(app);
const index = require('./routes/index');
const auth = require('./routes/auth');
const io = require('socket.io')(http);

require('./consumer.js')(io);

app.use('/', index);
app.use('/auth', auth);

http.listen(3001, function() {
	console.log('listening on *:3001');
});