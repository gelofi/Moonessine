const Discord = require('discord.js')
const bot =  new Discord.Client();

const {Client, Attachment} = require('discord.js')

const token = 'NTg4MzQ0MjY1MzU3MjYyODUx.XRX4GA.ycxuqcKPCjEoLi3bEV-d9ve33YE';

const PREFIX = 'm!'
const superagent = require('superagent')
var version = 'v1.6.2';
var moonessinebirth = 'June 30, 2019'

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
  });
  
bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
  });

bot.on('ready', () =>{
    console.log('Moonessine is now online!');
    bot.user.setActivity(`${bot.guilds.size} servers | m!help`, { type: "WATCHING"}).catch(console.error);

})

bot.on('message', message=>{

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);

    switch(args[0]){
        case 'info':
            if(args[1] === 'server'){
                const serverembed = new Discord.RichEmbed()
                .setTitle('Info for ' + message.guild.name)
                .setThumbnail(message.guild.iconURL)
                .addField('Server ID', message.guild.id)
                .addField('Owner', message.guild.owner, true)
                .addField('Created on', message.guild.createdAt, true)
                .addField("You joined on", message.guild.joinedAt)
                .addField('Total Member Count', message.guild.memberCount)
                .setTimestamp()
                .setColor(0xf28500)
                message.channel.send(serverembed)
            }else
            if(args[1] === 'bot'){
                const botembed = new Discord.RichEmbed()
                .setTitle("Moonessine's Info")
                .setThumbnail(bot.user.displayAvatarURL)
                .addField('Bot ID', '588344265357262851')
                .addField('Version ', version, true)
                .addField('Bot Creator', 'Fizx26', true)
                .addField('Current Server', message.guild.name)
                .addField('Birthday', moonessinebirth, true)
                .setFooter('Add Moonessine to your server by using m!invite.')
                .setColor(0x32A1DD)
                message.channel.send(botembed);
            }else
            if(args[1] === 'me'){
                const meembed = new Discord.RichEmbed()
                .setTitle(message.author.username + "'s infomation")
                .setThumbnail(message.author.avatarURL)
                .addField('Nickname:', `${message.member.nickname !== null ? `${message.member.nickname}` : 'None'}`, true)
                .addField('Roles:', message.member.roles.map(roles => `${roles.name}`).join(', '), true)
                .addField('ID', message.author.id)
                .addField('Status', message.author.presence.status)
                .setColor(0x9B59B6)
                message.channel.sendEmbed(meembed);
            }else{
                message.channel.send('Please put a valid argument! (`server`, `bot`, or `me`)');
            }
        break;
    case '8ball':
        let question = message.content.split(/\s+/g).slice(1).join(" ");

        if (!question) {
            return message.channel.send('You must provide a question! **Usage: m!8ball <question>**');
        }

    var answer = ['It is certain',
                                    'It is decidedly so.',
                                    'Without a doubt.',
                                    'Yes, definitely.',
                                    'You may rely on it.',
                                    'As I see it, yes.',
                                    'Most likely.',
                                    'Outlook good.',
                                    'Perhaps.',
                                    'Yes!',
                                    'If you say so.',
                                    'Signs point to yes.',
                                    'Reply hazy try again.',
                                    'Ask again later.',
                                    'Better not tell you now.',
                                    'Cannot predict now.',
                                    'Concentrate and ask again.',
                                    'Don\'t count on it.',
                                    'My reply is no!',
                                    'My sources say no...',
                                    'I don\'t know... ask others.',
                                    'Outlook not so good.',
                                    'Very doubtful.'];
            const ballEmbed = new Discord.RichEmbed()
                .setAuthor(question)
                .setDescription(answer[Math.round(Math.random() * (answer.length - 1))] + '.')
                .setColor(0x154360);
            message.channel.send(ballEmbed);
        break;
        case 'purge', 'del':
            if(!message.member.hasPermissions('MANAGE_MESSAGES')) return message.channel.send("You don't have enough permissions to do this command!")
            
            if(!args[1]) return message.reply('put an amount of messages to delete!')
            message.channel.bulkDelete(args[1]);
            break;
        case 'kick', 'kill':
            if(!message.member.hasPermissions('KICK_MEMBERS')) return message.channel.send("You don't have enough permissions to do this command!")

            const user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.kick('Unfortunately, you have been kicked!').then(() => {
                        message.reply(`${user.tag} has been kicked! F!`);
                    }).catch(err => {
                        message.reply('I cannot kick this member!')
                        console.log(err);
                    });
                } else{
                    message.reply("I cannot find this member, or that user isn't in the server!")
                }
            } else {
                    message.reply('Please specify a member / person to be kicked! ');
                }
            break;
        case 'ban', 'bury':
            if(!message.member.hasPermissions('BAN_MEMBERS')) return message.channel.send("You don't have enough permissions to do this command!")

            const user1 = message.mentions.users.first();

            if(user1){
                const member = message.guild.member(user1);

                if(member){
                    member.ban('Unfortunately, you have been banned!').then(() => {
                        message.reply(`${user1.tag} has been banned! You've been so sketchy! Goodbye!`);
                    }).catch(err => {
                        message.reply('I cannot ban this member!')
                        console.log(err);
                    });
                } else{
                        message.reply("I cannot find this member, or that user isn't in the server!")
                }
            } else {
                        message.reply('Please specify a member / person to be banned! ');
                }
        break;
    }
})

bot.on('message', async message =>{
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
    }

    if(message.content === PREFIX + 'cat'){

        let {body} = await superagent
        .get('http://aws.random.cat/meow')
        if(!{body}) return message.channel.send('An error occured! Please try again.')

            let cEmbed = new Discord.RichEmbed()
            .setColor(0xd4ac0d)
            .setAuthor('Cats!', message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter('m!cat', bot.user.displayAvatarURL)

            message.channel.send({embed: cEmbed})

    }

    if(message.content === PREFIX + 'dog'){

        let {body} = await superagent
        .get('https://dog.ceo/api/breeds/image/random')
        if(!{body}) return message.channel.send('An error occured! Please try again.')

            let dEmbed = new Discord.RichEmbed()
            .setColor(0xd4ac0d)
            .setAuthor('Doggo!', message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter('m!dog', bot.user.displayAvatarURL)

            message.channel.send({embed: dEmbed})

    }

    if(message.content === PREFIX + 'prefix'){
        message.channel.send('You cannot change my prefix. The default prefix is `m!`.')
    }
    
    if(message.content === PREFIX + 'help'){
        const helpembed = new Discord.RichEmbed()
        .setAuthor("Commands List", bot.user.displayAvatarURL)
        .setDescription('Use `m!help` to view the command list. Use `m!allhelp` to view all commands with a description.')
        .addField(':video_game: Games and Fun', '`moon`, `coinflip`, `say`')
        .addField(':newspaper: Information', '`info`, `invite`, `ping`, `help`, `support`')
        .addField(':frame_photo: Images', '`cat`, `dog`')
        .addField(':game_die: Random', "`8ball`, `wisdom`, `rps`")
        .addField(':diamond_shape_with_a_dot_inside: Moderation', '`kick`, `ban`')
        .addField(':tools: Server Tools', '`purge`, `avatar`')
        .setFooter("Fizx26's Bot, twitter.com/Fizx26S")
        .setColor(0x2E86C1)
        message.channel.send(helpembed);
    }
    if(message.content === PREFIX + "allhelp"){
        const allhelp = new Discord.RichEmbed()
        .setAuthor("Viewing all commands of Moonessine", bot.user.displayAvatarURL)
        .addField(":video_game: Games and Fun", "Commands for playing with Moonessine!")
        .addField("`moon`", "- Gives you a percentage of how moon-y you are!")
        .addField("`coinflip`", "- Flips a coin, perfect for arguments on what to choose.")
        .addField("`say`", "- Repeats the message you said, then deletes it.")
        .addField(":newspaper: Information", "- Gives you informations about the following:")
        .addField("`info`", "- Gives you information about you, the server, or the bot.")
        .addField("`invite`", "- Gives you an invite link for Moonessine to join to your server!")
        .addField("`ping`", "- Check if Moonessine is running, and check your latency.")
        .addField("`help`", "- Gives you the command list, but without descriptions.")
        .addField("`support`", "- Gives you an invite link to join Moonessine's server!")
        .addField(":frame_photo: Images", "- Gives you a random image of the following:")
        .addField("`cat`", "- Sends a random image of a cat.")
        .addField("`dog`", "- Send a random image of a dog.")
        .addField(":game_die: Random", "- Moonessine will reply randomly to these commands!")
        .addField("`8ball`", "- Ask Moonessine something, and he'll reply what he *[DATA EXPUNGED]*. ")
        .addField("`wisdom`", "- Sends a random popular quote or a poem, with words of wisdom.")
        .addField("`rps`", "- Rock, Paper, Scissors!")
        .addField(":diamond_shape_with_a_dot_inside: Moderation", "- Manage and protect your server with these commands!")
        .addField("`kick`", "- Kicks a user.")
        .addField("`ban`", "- Bans a user.")
        .addField(":tools: Server Tools", "A very tiny set of tools for you to use.")
        .addField("`purge`", "- Deletes several messages in a single command. `a.k.a. del`")
        .addField("`avatar`", "- Shows your avatar.")
        .setTimestamp()
        .setFooter("Use m!help for shorter commands list!")
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor(0x884ea0)
        message.channel.send(allhelp);
    }
    
    if(message.content === PREFIX + 'ping'){
        const m = await message.channel.send("Calculating ping...")
        m.edit(`Pong! -${Math.round(bot.ping)}ms-`);
    }
    if(message.content === PREFIX + "avatar"){
        let avatar = new Discord.RichEmbed()
        .setTitle('Your avatar and URL:')
        .setDescription(message.author.avatarURL)
        .setImage(message.author.avatarURL)
        .setColor(0x148f77)
        message.channel.sendEmbed(avatar);
    }
    if(message.content === PREFIX + 'invite'){
        const invite = new Discord.RichEmbed()
        .addField('Add Moonessine on your server!', 'https://tinyurl.com/invMoonessine')
        .setFooter('Thanks for adding me!')
        .setColor(0xf28500)
        message.channel.sendEmbed(invite);
    }
    if(message.content === PREFIX + 'support'){
        const support = new Discord.RichEmbed()
        .addField("Go on Moonessine's server!", "https://discord.plus/supMoonessine")
        .setFooter('Problems? Suggestions? Go here!', bot.user.displayAvatarURL)
        .setColor(0xf28500)
        message.channel.sendEmbed(support);
    }
    if(message.content === PREFIX + 'wisdom') {
        var answer = ['“Nobody can make you feel inferior without your permission.” —Eleanor Roosevelt',
                                        '“You can never plan the future by the past.” —Edmund Burke',
                                        '“He who has a why to live can bear almost any how.” —Friedrich Nietzsche',
                                        '“He that respects himself is safe from others.” —Henry Wadsworth Longfellow',
                                        '“If you want something you never had, you have to do something you’ve never done.”',
                                        '“Change your thoughts and you change your world.” —Norman Vincent Peale',
                                        '“Life is too important to be taken seriously.” —Oscar Wilde',
                                        '"In the end, it\'s not the years in your life that count. It\'s the life in your years." —Abraham Lincoln',
                                        '"Only a life lived for others is a life worthwhile." -Albert Einstein',
                                        '“There are many ways of going forward, but only one way of standing still.” – Franklin D. Roosevelt',
                                        '“An unexamined life is not worth living.” – Socrates',
                                        '“Love all, trust a few, do wrong to none.”  ― William Shakespeare, All\'s Well That Ends Well',
                                        '“The fool doth think he is wise, but the wise man knows himself to be a fool.” ― William Shakespeare, As You Like It',
                                        '“There is nothing either good or bad, but thinking makes it so.” ― William Shakespear, Hamlet',
                                        '`“When he shall die,\nTake him and cut him out in little stars,\nAnd he will make the face of heaven so fine\nThat all the world will be in love with night\nAnd pay no worship to the garish sun.” \n― William Shakespeare, Romeo and Juliet`',
                                        'Seemed Possible\nPoet: Adelaide A. Procter\nHave we not all, amid life\'s petty strife,\nSome pure ideal of a noble life\nThat once seemed possible? Did we not hear\nThe flutter of its wings and feel it near,\nAnd just within our reach? It was. And yet\nWe lost it in this daily jar and fret.\nBut still our place is kept and it will wait,\nReady for us to fill it, soon or late.\nNo star is ever lost we once have seen:\nWe always may be what we might have been.',
                                        '“Self-love, my liege, is not so vile a sin, as self-neglecting.” – William Shakespeare',
                                        '“It is not in the stars to hold our destiny but in ourselves.” – William Shakespeare',
                                        '“Give every man thy ear, but few thy voice.” – William Shakespeare',
                                        '“Some are born great, some achieve greatness, and some have greatness thrust upon them.” – William Shakespeare',
                                        '“There is no darkness but ignorance.” – William Shakespeare',
                                        '“God has given you one face, and you make yourself another.” – William Shakespeare',
                                        '“We know what we are, but know not what we may be.” – William Shakespeare',
                                        '“The empty vessel makes the loudest sound.” – William Shakespeare',
                                        '“This above all: to thine own self be true.” – William Shakespeare',
                                        '“One touch of nature makes the whole world kin.” – William Shakespeare',
                                        '"Live life to the fullest, and focus on the positive." -Matt Cameron'];
                const wisdomEmbed = new Discord.RichEmbed()
                    .setAuthor("Random Wisdom!")
                    .setDescription(answer[Math.round(Math.random() * (answer.length - 1))] + '.')
                    .setColor(0x85c1e9);
                message.channel.send(wisdomEmbed); 
    }
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    if (message.content === PREFIX + "coinflip") {
		var msg2 = Array(2);
		msg2[1] = "It's heads!";
	    msg2[2] = "It's tails!";
        var x = getRandomInt(0, 8);
		if (x < 4){
			message.channel.send(msg2[1]);
		}
		else{
			message.channel.send(msg2[2]);
		}
    }
    if (message.content === PREFIX + "rps") {
		var msg1 = Array(3);
		msg1[1] = "I drop Rock! :black_circle:";
	    msg1[2] = "I drop Paper! :page_facing_up:";
		msg1[3] = "I drop Scissors! :scissors:"
        var x = getRandomInt(0, 9);
		if (x < 6){
         if (x < 3){
			message.reply(msg1[1]);
		}
		else{
               message.reply(msg1[3]);
		}
		}
		else{ 
			message.reply(msg1[2]);
        }
    }
    if (message.content === PREFIX + "moon") {
		var msg1 = Array(3);
		msg1[1] = "You are 1/3 Moon-y. ";
	    msg1[2] = "This command is 3/3 useless.";
		msg1[3] = "You are 3/3 Moon-y!."
        var x = getRandomInt(0, 9);
		if (x < 6){
         if (x < 3){
			message.reply(msg1[1]);
		}
		else{
               message.reply(msg1[3]);
		}
		}
		else{ 
			message.reply(msg1[2]);
        }
    }
})

bot.on("guildMemberRemove", function(member) {
    member.guild.channels.find("name", "general", "lounge").send(member.toString() + ", has left the server. Farewell, buddy.")

})



bot.login(token);