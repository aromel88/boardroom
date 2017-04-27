import HomeContainer from './components/home/HomeContainer';

let socket;

const connect = (teamname, joincode, username, joinSuccessCallback, joinFailureCallback) => {
  socket = io.connect();
  socket.on('joined', (data) => {
    if (data.success) {
      joinSuccessCallback();
    } else {
      joinFailureCallback();
    }
  });
  socket.on('created',  (data) => {
    if (data.success) {
      joinSuccessCallback();
    } else {
      joinFailureCallback();
    }
  });
  // socket.on('connected', connectSuccess);
  // socket.on('messages', getMessages);
  // socket.on('users', getUsers);

  socket.emit('join', { team: teamname, join: joincode, user: username });
};

module.exports.connect = connect;
