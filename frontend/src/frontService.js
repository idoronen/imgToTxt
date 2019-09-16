const axios = require('axios');

export default{
    sendImg
}

async function sendImg(img){
    // console.log('service send img');

    let imgObj ={img: img}
    
    var res = await axios.post('http://127.0.0.1:3001/scan', imgObj);

    // console.log(res.data);
    
    return res.data
}