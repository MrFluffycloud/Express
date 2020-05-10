const request = require('request');

exports.run = (client, message, args, ops) => {
	const url = 'https://api.mcsrvstat.us/2/' + args[0] + ':' + args[1];
	if(!args[0] || !args[1]) return message.reply('Please, input the IP and the port of the Minecraft server');
	request(url, function(err, response, body) {
		if(err) {
			console.log(err);
			return message.reply('Error getting Minecraft server status...');
		}
		body = JSON.parse(body);
		var status = '**Status of ' + args[0] + ':' + args[1] + '**\n\nServer currently is offline.';
		if(body.online == true) {
			status = '**Status of ' + body.motd.clean + '**\n\nServer currently is online';
			status += '\n__Online:__ ' + body.players.online + '/' + body.players.max;
			if(body.icon) {
				status += '\n__Platform:__ Java Edition';
				if(body.software) {
					status += '\n__Software:__ ' + body.software;
				}
			} else {
				status += '\n__Platform:__ Bedrock Edition';
				if(body.software) {
					status += '\n__Software:__ ' + body.software + ' for MCPE ' + body.version;
				}
			}
		}
		message.reply(status);
	});
}
