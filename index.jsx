import './assets/css/index.css';

import  React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import  FlyLoading from './components/loading.jsx'; 
import IndexApp from './components/index.jsx';
import FlyGameView from './components/gameview.jsx';

injectTapEventPlugin();

class App extends React.Component{
    constructor(option){
        super(...option);
    }

    componentWillMount() {
		document.querySelector('html').style.fontSize = document.documentElement.clientWidth / 10 + 'px';    		
    }

    render(){
        return <div>
            <FlyGameView></FlyGameView>
            {/*

             <IndexApp></IndexApp>
            <FlyLoading></FlyLoading>*/}
        </div>
    }
}

ReactDOM.render(<App></App>,document.getElementById('fly-main'));