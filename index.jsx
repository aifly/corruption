import './assets/css/index.css';

import  React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import  FlyLoading from './components/loading.jsx'; 
import IndexApp from './components/index.jsx';
import FlyGameView from './components/gameview.jsx';
import FlyResult from './components/result.jsx';
import FlyRule from './components/rule.jsx';
import Obserable from './assets/lib/obserable';
var obserable = new Obserable();
injectTapEventPlugin();

class App extends React.Component{
    constructor(option){
        super(...option);
        this.state = {
            audioClose:false
        }
    }

    componentWillMount() {
				
    }

    render(){
        let data ={
            obserable
        }
        return <div>
            <div className={"voice "+ (this.state.audioClose?'':'active')} onTouchStart={this.toggleVoice.bind(this)}>
                <img src='./assets/images/music.png'/>
            </div>    
            <IndexApp {...data}></IndexApp>
            <FlyGameView {...data}></FlyGameView>
            <FlyResult {...data}></FlyResult>
            <FlyRule {...data}></FlyRule>
            {/*

            <FlyGameView></FlyGameView>

             
            */}
        </div>
    }

    toggleVoice(){
        
        var audios = document.querySelectorAll('audio');
        this.closeAudio =!this.closeAudio ;
        this.setState({
            audioClose:this.closeAudio
        })
        for(var i = 0,len = audios.length;i<len;i++){
            audios[i].muted = this.closeAudio;
        }


    }
}

ReactDOM.render(<App></App>,document.getElementById('fly-main'));