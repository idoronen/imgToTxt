const express = require('express')
const app = express()
const http = require('http').createServer(app);
const cors = require('cors');
const origin = (process.env.NODE_ENV === 'development')? 'http://localhost:3000': '';
const path = require('path');
const axios = require('axios');


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'frontend/build')));

const vision = require('@google-cloud/vision');
const fs = require('fs');



app.post('/scan', async (req, res)=>{
    console.log('server /scan');
    // console.log(req.body.img);
    // const words = await sendToGoogle(req.body.img);
    const words = await google(req.body.img);

    // console.log(words);
    
    res.send(words);
    // res.send('ok')
    
})

async function google(img){
    //AIzaSyAnr7KLw2e2JzEPy_kEvGJXDE90adQHI0A
    // console.log('google function',img);

    var base64Data = img.replace(/^data:image\/png;base64,/, "");
    
    const objToSend={
        "requests":[
            {
              "image":{
                "content": base64Data
              },
              "features":[
                {
                  "type":"TEXT_DETECTION"
                }
              ]
            }
          ]
    }

    try{
        const result = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAnr7KLw2e2JzEPy_kEvGJXDE90adQHI0A', objToSend)
        // console.log(result.data.responses[0].textAnnotations);
        // console.log(result.data.responses[0].fullTextAnnotation.text);

        var text = result.data.responses[0].fullTextAnnotation.text;

    }catch(err){
        console.log('google said:',err);
        return 'no text'
    }

    return text
    
}

async function sendToGoogle(img){

    // console.log('function sendImg');
    
    const client = new vision.ImageAnnotatorClient();


    // var base64Data = img.replace(/^data:image\/png;base64,/, "");

    // require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
    //     console.log(err);
    // });

    // var imageFile = fs.readFileSync('./out.png');

    const fileName = "./out.png";

    try{
        var [result] = await client.textDetection(fileName);
        // console.log('result:', result);
        if (result===null){
            return 'no text in image!'
        }
        
    }catch(err){
        console.log('error sending google:',err);
    }

    const detections = result.textAnnotations;

    const text = detections[0].description;
    // console.log(text);
    return text 
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/index.html'));
  });

const port = process.env.PORT || 3001 ;

http.listen(port, () => {
    console.log (`App listening on port ${port} !`)
});

    // "start": "react-scripts start",  