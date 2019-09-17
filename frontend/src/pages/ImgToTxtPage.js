import React from 'react';
import frontService from './../frontService'

class ImgToTxtPage extends React.Component{

    componentDidMount(){
        this.video = document.querySelector('video');
        this.screenshotImage = document.querySelector('.screenshot-img');
        this.canvas = document.querySelector('canvas');

        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            // console.log("Let's get this party started");

            (async () => {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    facingMode: { exact: "environment" }
                })
                this.video.srcObject = stream;
    
            })();
        }
        
    }

    doScreenshot =()=>{
        // console.log('do screen');
        this.video.classList.add('hide');
        document.querySelector('.screenshot-btn').classList.add('hide');

        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.canvas.getContext('2d').drawImage(this.video, 0, 0);
        this.screenshotImage.src = this.canvas.toDataURL('image/png');

        this.sendImg();
    }

    copyText = ()=>{
        console.log('copy');
        
        const txt= document.getElementById('text').innerText;
        const area = document.querySelector('.textarea');
        area.value = txt;

        area.select();
        // document.getElementById('text').value.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    sendImg = async ()=>{
        var words = await frontService.sendImg(this.canvas.toDataURL('image/png'));

        // console.log(words);
        
        document.getElementById('text').innerText = words ;
    }


    render(){
        return (
            <div className="img-to-txt-page">
                <video autoPlay controls></video>
                <img className="screenshot-img"/>
                <br/>
                <button className="screenshot-btn" onClick={this.doScreenshot}>screen shot</button>

                <canvas hidden></canvas>
                <textarea className="textarea"></textarea>
                <p id="text" contentEditable></p>
                <button onClick={this.copyText}> copy</button>

            </div>
        )
            
        
    }
}

export default ImgToTxtPage