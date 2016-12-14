import './assets/css/index.css';

import  React from 'react';
import ReactDOM from 'react-dom';

import  FlyLoading from './components/loading.jsx';

class App extends React.Component{
    constructor(option){
        super(...option);
    }
    render(){
        return <div>
            hello world
            <FlyLoading></FlyLoading>
        </div>
    }
}

ReactDOM.render(<App></App>,document.getElementById('fly-main'));