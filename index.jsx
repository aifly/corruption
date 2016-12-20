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
    }

    componentWillMount() {
				
    }

    render(){
        let data ={
            obserable
        }
        return <div>
            <IndexApp {...data}></IndexApp>
            <FlyGameView {...data}></FlyGameView>
            <FlyResult {...data}></FlyResult>
            <FlyRule {...data}></FlyRule>
            {/*

            <FlyGameView></FlyGameView>

             
            */}
        </div>
    }
}

ReactDOM.render(<App></App>,document.getElementById('fly-main'));