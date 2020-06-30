const SlackBot=require('slackbots')
const axios=require('axios')
const bot=new SlackBot({
    token:'xoxb-1063411665794-1063709115283-qXuLJ2bzyYQrEBiGafXrq3Rp',
    name:'joke'
})

bot.on('start',()=>{
    const params={
        icon_emoji:':smiley:'
    }
    bot.postMessageToChannel('general','get ready to laugh',params)
})

bot.on('error',function(err){
    console.log(err)
})

bot.on('message',function(data){
    if(data.type!=='message'){
        return
    }
    handleMessage(data.text)
})

function handleMessage(message){
if(message.includes(' chucknorris')){
    chuckJoke()
}
else if(message.includes(' yomama')){
    yomamaJoke()
}
else if(message.includes(' random')){
   randomJoke()
}
else if(message.includes(' help')){
    help()
 }
}

function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random')
    .then(res=>{
        const joke=res.data.value.joke
        const params={
            icon_emoji:':laughing:'
        }
        bot.postMessageToChannel('general',`Chuck Norris:${joke}`,params)
    })
}

function yomamaJoke(){
    axios.get('http://api.yomomma.info')
    .then(res=>{
        const joke=res.data.joke
        const params={
            icon_emoji:':joy:'
        }
        bot.postMessageToChannel('general',`Yomama:${joke}`,params)
    })
}
function randomJoke(){
   const rand=Math.floor(Math.random()*2) + 1
   if(rand===1){
       chuckJoke()
   }
   else if(rand===2){
       yomamaJoke()
   }

}

function help(){
   
        const params={
            icon_emoji:':confused:'
        }
        bot.postMessageToChannel('general',`Type joke@ and 'yomama' or 'chucknorris' or 'random'`,params)
   
}