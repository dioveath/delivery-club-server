const config = require('../../config');
const mongoose = require('mongoose');

var env = config.NODE_ENV;

if(env === 'development') {
  console.log("running in production mode...!");
  mongoose.connect(config.MONGODB_URI);
} else {
  console.log(`Running in ${env}, Not configured!!!`);
}


// signal connection
mongoose.connection.once('open', function() {
  console.log('Connection has been made.');
}).on('error', function(error) {
  console.log('Connect error.', error);
}).on('disconnected', function(){
  console.log('Connection disconnected.');
});

// function closeConnection(){
//   mongoose.connection.close();
// }

module.exports = mongoose;
