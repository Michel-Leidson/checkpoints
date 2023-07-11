# checkpoints

## Install

1 - Before you begin, you might want to make sure your system is up to date.
###
```
sudo apt update && sudo apt upgrade -y && sudo apt install -y build-essential curl wget jq
``` 
2- Download Repository
###
```
git clone https://github.com/Michel-Leidson/bot-checkpoints.git
```
3- Enter in directory
###
```
cd bot-checkpoints
```
4- Create config
###
```
nano .env
``` 
DISCORD_URL_WEBHOOK=######
NOTIFY_COLOR_MESSAGE=###
DISCORD_BOT_TOKEN=######
DISCORD_BOT_PREFIX=###
HEXADECIMAL_COLOR=###
BOT_NAME=Notify
``` 
5- Install PM2 for manage node applications
###
```
sudo apt update
sudo apt install npm
sudo npm install -g pm2
npm install
```
6- Running Monitor Application
###
```
pm2 start monitor.js --name monitor-checkpoint
```

7- Running bot Application
###
```
pm2 start bot.js --name bot-checkpoint
```

8- Running PM2 in startup
###
```
pm2 startup
```

9- Save current pm2 instances
###
```
pm2 save
```
