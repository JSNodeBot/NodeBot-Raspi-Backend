var q = require('q');
var fs = require('fs');
var command = 'fswebcam -d /dev/video0 -r 320x240 public/cam.jpeg';
var cammod = {};
cammod.captureImage = function(){
	var def = q.defer();
	var exec = require('child_process').exec;
	exec(command, function(error,stdout,stderr){	
		console.log('image captured');
		def.resolve('image cap');
		if(error){
		def.reject();
		}
	});
	return def.promise;
}

module.exports = cammod;
