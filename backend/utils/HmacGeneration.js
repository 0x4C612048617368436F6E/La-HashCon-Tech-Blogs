const crypto = require('crypto');

const URL = "https://random-word-api.herokuapp.com/word";

const generateWord = async ()=>{
    let word = await fetch(URL);
    let word2 = await fetch(URL);

    let secret =  await word.json();
    let UpdatingData = await word2.json();


    let hash = crypto.createHmac('sha256',secret[0]).update(UpdatingData[0]).digest('hex');
    console.log(hash);
}

generateWord()