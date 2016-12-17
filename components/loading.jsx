
import React from 'react';

import {FlyPublicComponent} from './public.jsx';

import  Vector2 from './vector2';

import  './css/loading.css';

import {utilMethods,_$,$$} from '../assets/lib/utilMethod';

class FlyLoading  extends React.Component{

    constructor(option){
        super(option);
        this.state = {
            scale:0,
            done:false
        }
    }
    render(){
        let style = {
            background:"url(./assets/images/loading-bg.jpg) no-repeat center center",
            backgroundSize:'cover'
        }
        return <div className={"fly-loading-C "+ (this.state.done?'hide':'')} ref='fly-loading-C' style={style}>
            <canvas ref="loading"></canvas>
            <div className='l-loading-scale'>{this.state.scale}%</div>
        </div>
    }

    componentDidMount(){

       let {viewWidth,viewHeight} =  this.setSize();

       var  Word = function (text, fontSize, color, position) {
            this.text = text;
            this.fontSize = fontSize;
            this.color = color;
            this.position = position;
        }
        var y = viewHeight / 2;
        var x = (viewWidth - 180 ) / 2;

        var textL = new Word("L", 40, "#ffffff", new Vector2(x, y));
        var textO = new Word("o", 40, "#ffffff", new Vector2(x+20, y));
        var textA = new Word("a", 40, "#ffffff", new Vector2(x+40, y));
        var textD = new Word("d", 40, "#ffffff", new Vector2(x+60, y));
        var textI = new Word("i", 40, "#ffffff", new Vector2(x+80, y));
        var textN = new Word("n", 40, "#ffffff", new Vector2(x+100, y));
        var textG = new Word("g", 40, "#ffffff", new Vector2(x+120, y));
        var textPoint1 = new Word(".", 40, "#ffffff", new Vector2(x+140, y));
        var textPoint2 = new Word(".", 40, "#ffffff", new Vector2(x+160, y));
        var textPoint3 = new Word(".", 40, "#ffffff", new Vector2(x+180, y));

        var text = [];
        text.push(textL);
        text.push(textO);
        text.push(textA);
        text.push(textD);
        text.push(textI);
        text.push(textN);
        text.push(textG);
        text.push(textPoint1);
        text.push(textPoint2);
        text.push(textPoint3);

        var c = this.refs['loading'];
        var cxt = c.getContext("2d");
        cxt.fillStyle = "#fff";
        function drawAllWords() {
            cxt.font = "bolder " + textL.fontSize + "px 宋体";
            cxt.fillText(textL.text, textL.position.x, textL.position.y);
            cxt.font = "bolder " + textO.fontSize + "px 宋体";
            cxt.fillText(textO.text, textO.position.x, textO.position.y);
            cxt.font = "bolder " + textA.fontSize + "px 宋体";
            cxt.fillText(textA.text, textA.position.x, textA.position.y);
            cxt.font = "bolder " + textD.fontSize + "px 宋体";
            cxt.fillText(textD.text, textD.position.x, textD.position.y);
            cxt.font = "bolder " + textI.fontSize + "px 宋体";
            cxt.fillText(textI.text, textI.position.x, textI.position.y);
            cxt.font = "bolder " + textN.fontSize + "px 宋体";
            cxt.fillText(textN.text, textN.position.x, textN.position.y);
            cxt.font = "bolder " + textG.fontSize + "px 宋体";
            cxt.fillText(textG.text, textG.position.x, textG.position.y);
            cxt.font = "bolder " + textPoint1.fontSize + "px 宋体";
            cxt.fillText(textPoint1.text, textPoint1.position.x, textPoint1.position.y);
            cxt.font = "bolder " + textPoint2.fontSize + "px 宋体";
            cxt.fillText(textPoint2.text, textPoint2.position.x, textPoint2.position.y);
            cxt.font = "bolder " + textPoint3.fontSize + "px 宋体";
            cxt.fillText(textPoint3.text, textPoint3.position.x, textPoint3.position.y);
        }

        var currentMap = 0;
        var t = setInterval(function(){
            cxt.clearRect(0, 0, c.width, c.height);
            drawAllWords();
            if (currentMap > 395) currentMap = 0;
            currentMap += 5;
            if (parseInt(currentMap / 40) <= text.length - 1) {
                text[parseInt(currentMap / 40)].fontSize = 60 - currentMap % 40;

            }
            if (parseInt(currentMap / 40) + 1 <= text.length - 1) {

                text[parseInt(currentMap / 40) + 1].fontSize = currentMap % 40 + 20;
            }
        },20)

        this.loading(t);

    }

    loading(t){

         var arr = [
            './assets/images/card.png',
            './assets/images/figure.png',
            './assets/images/gy-bg.png',
            './assets/images/hu.png',
            './assets/images/hu1.png',
            './assets/images/hu-bg.png',
            './assets/images/index-bg.jpg',
            './assets/images/index-top.png',
            './assets/images/loading-bg.jpg',
            './assets/images/logo.png',
            './assets/images/none.png',
            './assets/images/board-bg.png',
            './assets/images/hand.png',
            './assets/images/paiming.png',
            './assets/images/r-bg.jpg',
            './assets/images/result-bg.png',
            './assets/images/result-bg1.png',
            './assets/images/right.png',
            './assets/images/shadow.png',
            './assets/images/user.png',
            './assets/images/2016.png',


        ];

        let {obserable} = this.props;
        utilMethods.loading(arr,(data)=>{

            this.setState({
                scale:data*100
            });
        },()=>{
            this.setState({
                done:true
            });
            obserable.trigger({type:'showIndexPage'})
            setTimeout(()=>{clearInterval(t);},1000)
        })
    }

    setSize(){
        var viewWidth = document.documentElement.clientWidth,
            viewHeight = document.documentElement.clientHeight;
        this.refs['loading'].width = viewWidth;
        this.refs['loading'].height = viewHeight;
        return{viewWidth,viewHeight};
    }
}



export default FlyPublicComponent(FlyLoading);