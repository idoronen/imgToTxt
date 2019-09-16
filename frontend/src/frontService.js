const axios = require('axios');

export default{
    sendImg
}

const url = (process.env.NODE_ENV === 'development')? 'http://localhost:3001': '';
console.log('url:',url);


async function sendImg(img){
    console.log('service send img');

    let imgObj ={img: img}
    
    var res = await axios.post(`${url}/scan`, imgObj);

    console.log(res.data);
    
    return res.data
}