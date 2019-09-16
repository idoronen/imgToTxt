const express = require('express')
const app = express()
const http = require('http').createServer(app);
const cors = require('cors');
const origin = (process.env.NODE_ENV === 'development')? 'http://localhost:3000': '';
const corsOptions = {
    origin: origin,
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
// app.use(express.static('public'));
const vision = require('@google-cloud/vision');
const fs = require('fs');



app.post('/scan', async (req, res)=>{
    console.log('server /scan');
    // console.log(req.body.img);
    const words = await sendToGoogle(req.body.img);
    // console.log(words);
    
    res.send(words);
    
})

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

const port = process.env.PORT || 3001 ;

http.listen(port, () => {
    console.log (`App listening on port ${port} !`)
});

    // "start": "react-scripts start",  