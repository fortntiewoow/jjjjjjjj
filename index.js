const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const fs = require('fs');

var prefix = '$'

client.on('ready', () => {
  console.log('\x1b[1m\x1b[31m' + `\n░█▀▀█ ░█▀▀▀█ ▀▀█▀▀ 　 　 ▀█▀ ░█▀▀▀█ 　 　 ░█▀▀▀█ ░█▄─░█ ░█─── ▀█▀ ░█▄─░█ ░█▀▀▀ 
░█▀▀▄ ░█──░█ ─░█── 　 　 ░█─ ─▀▀▀▄▄ 　 　 ░█──░█ ░█░█░█ ░█─── ░█─ ░█░█░█ ░█▀▀▀ 
░█▄▄█ ░█▄▄▄█ ─░█── 　 　 ▄█▄ ░█▄▄▄█ 　 　 ░█▄▄▄█ ░█──▀█ ░█▄▄█ ▄█▄ ░█──▀█ ░█▄▄▄\n`);
  console.log('\x1b[1m\x1b[35m' + `Logged in as ${client.user.tag}`);
  client.channels.cache.get('780940453973458986').send(`***[LOGS] Bot is Online\nLogged in as ${client.user.tag}***`)
});

client.on('message', msg => {

    try {

      if (msg.content.startsWith(`${prefix}aes`)) {
        axios({
                url: 'https://benbotfn.tk/api/v1/aes'
            })
            .then(resp => {
                var aes = resp.data
                const AesEmbed = new Discord.MessageEmbed()
                .setTitle(`AES Key`)
                .setDescription(aes.mainKey)
                .setColor('#8A2BE2')
                .setFooter('@CyberDomFNBR')
                msg.channel.send(AesEmbed)
                console.log('\x1b[1m\x1b[36m', '[DATA]', 'Aes Key Sent');
            })
            .catch(err => {
            console.log(err);
            })
      }

      if (msg.content.startsWith(`${prefix}staging`)) {
        axios.get('https://fortnite-public-service-stage.ol.epicgames.com/fortnite/api/version').then(resp => {
          var testVersion = resp.data.version;
          var idnum = resp.data.build;
          const TestVersionEmbed = new Discord.MessageEmbed()
          .setTitle('Staging Version')
          .setDescription(testVersion)
          .setFooter(idnum)
          .setColor('#8A2BE2')
          msg.channel.send(TestVersionEmbed);
          console.log('\x1b[1m\x1b[36m', '[DATA]', 'Test Version Sent');
        });
      }

      if (msg.content.startsWith(`${prefix}calendar`)) {

        const TestVersionEmbed = new Discord.MessageEmbed()
        .setTitle('Fortnite Calendar')
        .setURL('https://benbotfn.tk/api/v1/calendar')
        .setColor('#8A2BE2')
        .setFooter('@CyberDomFNBR')
        msg.channel.send(TestVersionEmbed);
        console.log('\x1b[1m\x1b[36m', '[DATA]', 'Calendar Link Sent');

      }

      if (msg.content.startsWith(`${prefix}map`)) {
        axios.get('https://fortnite-api.com/v1/map').then(res => {
          var mapImage = res.data.data.images.blank;
          const mapEmbed = new Discord.MessageEmbed()
          .setTitle('Battle Royale Map')
          .setImage(mapImage)
          .setColor('#8A2BE2')
          .setFooter('@CyberDomFNBR')
          msg.channel.send(mapEmbed);
          console.log('\x1b[1m\x1b[36m', '[IMAGE]', 'Map Sent');
        });
      }

        setInterval(async() => {

            try {
  
              var res = await axios.get('https://fortnite-public-service-stage.ol.epicgames.com/fortnite/api/version');
              var currentversion = res.data.version;
              var branch = res.data.branch;
              var moduleName = res.data.moduleName;
              var build = res.data.build;
              let rawStagingData = fs.readFileSync('./data/Stanging-Data.json');
              let lastVersion = JSON.parse(rawStagingData);
              if (lastVersion != currentversion) {
                const stagingServerEbmed = new Discord.MessageEmbed()
                .setTitle(`v${currentversion} Got Added to the Staging Servers`)
                .setDescription(`\n***Branch:*** ${branch}\n\n***Build:*** ${build}\n\n***Module Name:*** ${moduleName}`)
                .setColor('#8A2BE2')
                .setFooter('@CyberDomFNBR')
                client.channels.cache.get('780940453973458986').send(stagingServerEbmed)
                console.log('\x1b[1m\x1b[31m', '[TEXT]', `v${currentversion} got added the the staging api`);
                fs.writeFile('./data/Stanging-Data.json',`"${currentversion}"`, finished);
                function finished(err) {
                  console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to Stanging-Data.json')
                }
              }
  
            } catch(e) {
              console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
              console.log(e)
            }
  
        }, 60000);

        setInterval(async() => {

            try {
  
              var res = await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game');
              var Currentemergencynotice = res.data.emergencynotice.news.messages[0].title
              var body = res.data.emergencynotice.news.messages[0].body
              let RawemergencynoticeData = fs.readFileSync('./data/Emergency-Notice.json');
              let Lastemergencynotice = JSON.parse(RawemergencynoticeData);
              if (Lastemergencynotice != Currentemergencynotice) {
                const stagingServerEbmed = new Discord.MessageEmbed()
                .setTitle(`${Currentemergencynotice}`)
                .setDescription(`${body}`)
                .setColor('#8A2BE2')
                .setFooter('@CyberDomFNBR')
                client.channels.cache.get('780940453973458986').send(stagingServerEbmed)
                console.log('\x1b[1m\x1b[31m', '[TEXT]', ` ${body}`);
                fs.writeFile('./data/Emergency-Notice.json',`"${Currentemergencynotice}"`, finished);
                function finished(err) {
                  console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to Emergency-Notice.json')
                }
              }
  
            } catch(e) {
              console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
              console.log(e)
            }
  
        }, 60000);

        setInterval(async() => {

            try {

                var res = await axios.get('https://benbotfn.tk/api/v1/status');
                var res2 = await axios.get('https://fortnite-public-service-stage.ol.epicgames.com/fortnite/api/version');
                var res3 = await axios.get('https://benbotfn.tk/api/v1/aes');
                var currentAes = res3.data.mainKey;
                var stagingVersion = res2.data.version;
                var currentversion = res.data.currentFortniteVersion;
                var totalPakCount = res.data.totalPakCount;
                var dynamicPakCount = res.data.dynamicPakCount;
                var lastversion = res.data.currentCdnVersion;
                let rawStagingData = fs.readFileSync('./data/CurrentVersion-Data.json');
                let lastVersion = JSON.parse(rawStagingData);
                if (lastVersion != currentversion) {
                    const UpdateReportEmbed = new Discord.MessageEmbed()
                    .setTitle(`Update Report`)
                    .setDescription(`***Current Version:***\n${currentversion}\n\n***Last version (buggy):\n${lastversion}\n\n***Staging Version:***\n${stagingVersion}\n\n***AES Key:***\n${currentAes}\n\n***Total Pak Count:***\n${totalPakCount}\n\n***Total Encrypted Pak Count:***\n${dynamicPakCount}`)
                    .setColor('#8A2BE2')
                    .setFooter('@CyberDomFNBR')
                    client.channels.cache.get('780940453973458986').send(UpdateReportEmbed)
                    console.log('\x1b[1m\x1b[33m', '[UPDATE]', `v${currentversion} Update Report has been sent`);
                    fs.writeFile('./data/CurrentVersion-Data.json',`"${currentversion}"`, finished);
                    function finished(err) {
                        console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to CurrentVersion-Data.json')
                    }
                }
            } catch(e) {
              console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
              console.log(e)
            }

        }, 60000);

        setInterval(async() => {

            try {

                var res = await axios.get('https://fortnite-api.com/v2/news/br');
                var currentNewsTitle = res.data.data.motds[0].title;
                var currentNewsDescription = res.data.data.motds[0].body;
                var currentNewsImage = res.data.data.motds[0].image;
                var currentNewsSmallImage = res.data.data.motds[0].tileImage;

                var currentNewsTitle1 = res.data.data.motds[1].title;
                var currentNewsDescription1 = res.data.data.motds[1].body;
                var currentNewsImage1 = res.data.data.motds[1].image;
                var currentNewsSmallImage1 = res.data.data.motds[1].tileImage;

                var currentNewsTitle2 = res.data.data.motds[2].title;
                var currentNewsDescription2 = res.data.data.motds[2].body;
                var currentNewsImage2 = res.data.data.motds[2].image;
                var currentNewsSmallImage2 = res.data.data.motds[2].tileImage;


                let rawData = fs.readFileSync('./data/br-news-data.json');
                let lastNewsTitle = JSON.parse(rawData);
                if (lastNewsTitle != currentNewsTitle) {
                  
                  const BRnewEmbed = new Discord.MessageEmbed()
                  .setTitle(currentNewsTitle)
                  .setURL(currentNewsImage)
                  .setDescription(currentNewsDescription)
                  .setThumbnail(currentNewsSmallImage)
                  .setColor('#8A2BE2')
                  .setFooter('@CyberDomFNBR')
                  client.channels.cache.get('780940453973458986').send(BRnewEmbed)

                  const BRnewEmbed1 = new Discord.MessageEmbed()
                  .setTitle(currentNewsTitle1)
                  .setURL(currentNewsImage1)
                  .setDescription(currentNewsDescription1)
                  .setThumbnail(currentNewsSmallImage1)
                  .setColor('#8A2BE2')
                  .setFooter('@CyberDomFNBR')
                  client.channels.cache.get('780940453973458986').send(BRnewEmbed1)

                  const BRnewEmbed2 = new Discord.MessageEmbed()
                  .setTitle(currentNewsTitle2)
                  .setURL(currentNewsImage2)
                  .setDescription(currentNewsDescription2)
                  .setThumbnail(currentNewsSmallImage2)
                  .setColor('#8A2BE2')
                  .setFooter('@CyberDomFNBR')
                  client.channels.cache.get('780940453973458986').send(BRnewEmbed2)

                  console.log('\x1b[1m\x1b[36m', '[IMAGE]', `BR News Detected: ${currentNewsTitle}`);

                  fs.writeFile('./data/br-news-data.json',`"${currentNewsTitle}"`, finished1);
                  function finished1(err) {
                    console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to br-news-data.json')
                  }
                }

            } catch(e) {
              console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
              console.log(e)
            }
        }, 60000);

        setInterval(async() => {

          try {

            var res = await axios.get('https://api.peely.de/v1/comics');
            var currentComics = res.data.data.comics[0]

            var lengthh = currentComics.length

            let RawlengthData = fs.readFileSync('./data/comics.json');
            let lastlengthh = JSON.parse(RawlengthData);

            if (lastlengthh != lengthh) {
              const stagingServerEbmed = new Discord.MessageEmbed()
              .setTitle(`Comic Book has been updated (${lengthh - 2})`)
              .setURL(currentComics[lengthh - 1])
              .setThumbnail(currentComics[lengthh - 1])
              .setColor('#8A2BE2')
              .setFooter('@CyberDomFNBR')
              client.channels.cache.get('780940453973458986').send(stagingServerEbmed)
              fs.writeFile('./data/comics.json',`"${lengthh}"`, finished);
              function finished(err) {
                console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to comics.json')
              }
            }

          } catch(e) {
            console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
            console.log(e)
          }

        }, 60000);

        setInterval(async() => {

          try {

            var res = await axios.get('https://api.peely.de/v1/blogposts/normal');
            var currentBlogpost = res.data.data.blogposts[0].title
            var description = res.data.data.blogposts[0].description
            var image = res.data.data.blogposts[0].image
            var url = res.data.data.blogposts[0].url
            let RawBlogpost = fs.readFileSync('./data/blogposts.json');
            let lastBlogpost = JSON.parse(RawBlogpost);
            if (lastBlogpost != currentBlogpost) {
              const stagingServerEbmed = new Discord.MessageEmbed()
              .setTitle(`${currentBlogpost}`)
              .setURL(url)
              .setDescription(`${description}`)
              .setThumbnail(image)
              .setColor('#8A2BE2')
              .setFooter('@CyberDomFNBR')
              client.channels.cache.get('780940453973458986').send(stagingServerEbmed)
              console.log('\x1b[1m\x1b[31m', '[TEXT]', ` ${currentBlogpost}`);
              fs.writeFile('./data/blogposts.json',`"${currentBlogpost}"`, finished);
              function finished(err) {
                console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to blogposts.json')
              }
            }

          } catch(e) {
            console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
            console.log(e)
          }

        }, 60000);

        setInterval(async() => {

          try {

            var res = await axios.get('https://api.peely.de/v1/br/active_playlist');
            var currentplaylists = res.data.data.playlists

            var lengthh = currentplaylists.length

            let RawplaylistsData = fs.readFileSync('./data/active_playlist.json');
            let lastPlaylist = JSON.parse(RawplaylistsData);

            if (lastPlaylist != currentplaylists[lengthh - 1].name) {
              const stagingServerEbmed = new Discord.MessageEmbed()
              .setTitle('Playlist Update')
              .setDescription(`${currentplaylists[lengthh - 1].name} is now available`)
              .setColor('#8A2BE2')
              .setFooter('@CyberDomFNBR')
              if ((currentplaylists[lengthh - 1].image) != null) {
                stagingServerEbmed.setThumbnail(currentplaylists[lengthh - 1].image)
              }
              client.channels.cache.get('780940453973458986').send(stagingServerEbmed)
              fs.writeFile('./data/active_playlist.json',`"${currentplaylists[lengthh - 1].name}"`, finished);
              function finished(err) {
                console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to active_playlist.json')
              }
            }

          } catch(e) {
            console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
            console.log(e)
          }

        }, 60000);

        setInterval(async() => {

          try {

            var res = await axios.get('https://api.peely.de/v1/br/progress/data');
            var currentNumber = res.data.data.DaysLeft
            let rawNumberData = fs.readFileSync('./data/season_countdown.json');
            let lastNumber = JSON.parse(rawNumberData);
            if (lastNumber != currentNumber) {
              const stagingServerEbmed = new Discord.MessageEmbed()
              .setColor('#8A2BE2')
              .setFooter('@CyberDomFNBR')
              if (currentNumber != 1) {
                stagingServerEbmed.setTitle(`Season Ends in ${currentNumber} Days`)
              } else {
                stagingServerEbmed.setTitle(`Season Ends in ${currentNumber} Day`)
              }
              client.channels.cache.get('780940453973458986').send(stagingServerEbmed)
              fs.writeFile('./data/season_countdown.json',`${currentNumber}`, finished);
              function finished(err) {
                console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to season_countdown.json')
              }
            }

          } catch(e) {
            console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
            console.log(e)
          }

        }, 60000);

        setInterval(async() => {

          try {

            var res = await axios.get('https://api.peely.de/v1/leaks');
            var currentleaksTime = res.data.time
            var leaksImage = res.data.url
            let RawLeaksTime = fs.readFileSync('./data/leaks.json');
            let lastLeaksTime = JSON.parse(RawLeaksTime);
            if (lastLeaksTime != currentleaksTime) {
              const stagingServerEbmed = new Discord.MessageEmbed()
              .setTitle(`New Cosmetics`)
              .setImage(leaksImage)
              .setColor('#8A2BE2')
              .setFooter('@CyberDomFNBR')
              client.channels.cache.get('780940453973458986').send(stagingServerEbmed)
              fs.writeFile('./data/leaks.json',`"${currentleaksTime}"`, finished);
              function finished(err) {
                console.log('\x1b[1m\x1b[32m', '[DATA]', 'New Data added to leaks.json')
              }
            }

          } catch(e) {
            console.log('\x1b[1m\x1b[31m', '[ERROR]', 'An Error Occurred');
            console.log(e)
          }

        }, 60000);

        //SEARCH COMMAND -------------------------------------------------------------------------

        if (msg.content.startsWith(`${prefix}`)) {
            let textFull = msg.content.substr(1);
            let textCommand = textFull.split(" ");
            let command = textCommand[0];
            let text = textCommand.splice(1).join(" ");

            if(command === 'find') {
                async function getCosmetics() {
                    try {
                    console.log('\x1b[1m\x1b[36m', '[IMAGE]', 'Starting Image Process');
                    msg.channel.send('Loading Image...');
                    var start = new Date().getTime();
                    var res = await axios.get(`https://benbotfn.tk/api/v1/cosmetics/br/search?name=${text}`);
                    var   res, data;
                    
                    var cosmeticID = item.id;
                    var CosmeticSet = item.set
                    var cosmeticName = item.name;
                    var cosmeticDesc = item.description;
                    var cosmeticPath = item.path;
                    var cosmeticType = item.shortDescription;
                    var cosmeticRarity = item.rarity;
                    var cosmeticseries = item.series;
                    var cosmeticTags = item.gameplayTags;
                    var itemIcon = item.icons.featured || item.icons.icon

                    if (cosmeticseries === null) {
                      var RarityOrSeries = `${cosmeticRarity}`
                    } else {
                      var RarityOrSeries = `${cosmeticseries.name}`
                    }

                    const CosmeticIcon = new Discord.MessageEmbed()
                    .setThumbnail(itemIcon)
                    .setTitle(cosmeticName)
                    .setDescription(cosmeticDesc)
                    .addFields(
                      { name: '***Cosmetic Type***', value: `${cosmeticType}`, inline: true },
                      { name: '***Set***', value: `${CosmeticSet}`, inline: true },
                      { name: '***Rarity***', value: `${RarityOrSeries}`, inline: true },
                      { name: '***Cosmetic ID***', value: `${cosmeticID}`, inline: true },
                    )
                    .setColor('#8A2BE2')
                    .setFooter('@CyberDomFNBR')
                    msg.channel.send(CosmeticIcon)

                    }
                    catch(e) {
                      var errmsg = e.response.data.error;
                    }

                };
                getCosmetics();
            }

        }

        if (msg.content.startsWith(`${prefix}`)) {
            let textFull = msg.content.substr(1);
            let textCommand = textFull.split(" ");
            let command = textCommand[0];
            let text = textCommand.splice(1).join(" ");

            if(command === 'find') {
                async function getCosmetics() {
                  try {
                    var start = new Date().getTime();
                    var res = await axios.get(`https://benbotfn.tk/api/v1/cosmetics/br/${text}`);
                    var item = res.data;

                    var cosmeticID = item.id;
                    var CosmeticSet = item.set
                    var cosmeticName = item.name;
                    var cosmeticDesc = item.description;
                    var cosmeticPath = item.path;
                    var cosmeticType = item.shortDescription;
                    var cosmeticRarity = item.rarity;
                    var cosmeticseries = item.series;
                    var cosmeticTags = item.gameplayTags;
                    var itemIcon = item.icons.featured || item.icons.icon

                    if (cosmeticseries === null) {
                      var RarityOrSeries = `${cosmeticRarity}`
                    } else {
                      var RarityOrSeries = `${cosmeticseries.name}`
                    }

                    const CosmeticIcon = new Discord.MessageEmbed()
                    .setThumbnail(itemIcon)
                    .setTitle(cosmeticName)
                    .setDescription(cosmeticDesc)
                    .addFields(
                      { name: '***Cosmetic Type***', value: `${cosmeticType}` },
                      { name: '***Set***', value: `${CosmeticSet}`, inline: true },
                      { name: '***Rarity***', value: `${RarityOrSeries}`, inline: true },
                      { name: '***Cosmetic ID***', value: `${cosmeticID}`, inline: true },
                    )
                    .setColor('#8A2BE2')
                    .setFooter('@CyberDomFNBR')
                    msg.channel.send(CosmeticIcon)

                  } catch(e) {
                    var errmsg = e.response.data.error;
                  }

                };
                getCosmetics();
            }

        }

        //SEARCH COMMAND -------------------------------------------------------------------------

    } catch(e) {
        console.log(e)
    }

});

client.login('NzQ2NDYwOTI2OTk5NTI3NDQ3.X0Ap6Q.8XBXWYmzrY-YLq7Tu9PkXASSIqM');