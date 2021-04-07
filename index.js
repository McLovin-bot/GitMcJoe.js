const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '.';

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./src/Commands');

for (const folder of commandFolders) {
    console.log(folder);
	const commandFiles = fs.readdirSync(`./src/Commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./src/Commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('ready', () => {
    console.log('Discord bot has logged in');
});

//message listener
client.on('message', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    
    const args = message.content.slice(prefix.length).trim().split('/ +/');
    const command = args.shift().toLowerCase();
    console.log(command);


    if(!client.commands.has(command)) return;


    try {
        client.commands.get(command).execute(message, args);
        
    } catch (e) {
        console.log(e);
        //catch
    }


});


client.login(process.env.BOT_TOKEN);