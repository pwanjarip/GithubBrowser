var buffer = require('buffer');

class AuthService {
  login (creds, cb){
    	var b = new buffer.Buffer(creds.userName + ':' + creds.password);
  		var encodedAuth = b.toString('base64');

  		fetch('https://api.github.com/user', {
  				headers: {
  					'Authorization' : 'Basic ' + encodedAuth
  				}
  			})
  			.then((response) => {
  				if(response.status >= 200 && response.status < 300) {
  					return response;
  				}

  				throw {
  					badCredentials: response.status == 401,
  					unknownError: response.status != 401
  				}

  				throw 'Unkown error';
  			})
  			.then((response) => {
  				return response.json();
  			})
  			.then((results) => {
  				console.log(results);
  				return cb({success: true});
  			})
  			.catch((err) => {
  				console.log('logon failed: ' + err);
  				return cb(err);
  			})
  }
}

module.exports = new AuthService();
