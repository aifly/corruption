import React from 'react';
import ReactDOM from 'react-dom';
import './components/css/result.css';
import './assets/css/share.css';
import FlyButton from './components/button.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	showBoard:'show',
    	score:'',
    	error:''
    }
  }
  componentWillMount() {
	document.querySelector('html').style.fontSize = document.documentElement.clientWidth / 10 + 'px';    		
  }

  render() {
  	let style = {
          background: 'url(./assets/images/r-bg.jpg) no-repeat bottom center',
          backgroundSize: 'cover'
      },
      boardStyle={
      	  background: 'url(./assets/images/board-bg.png) no-repeat bottom center',
          backgroundSize: 'cover'
      }

    return (
      <div className={'r-main-ui ' + this.state.showBoard} ref='r-main-ui' style={style}>
      		<div className={'r-board '} style={boardStyle}></div>
      		<section className='r-content-C' style={{background:'url(./assets/images/result-bg1.png) no-repeat center',backgroundSize:'contain'}}>
      			<h1></h1>
      			<h3>您DE好友翻出了{this.state.score/5|0}名违纪官员， </h3>
      			<p>共计获的得分</p>
      			<div className='r-score-C'><span>{this.state.score}</span>分</div>
      			<div className='r-rank'>
      				<img src='./assets/images/paiming.png'/>
      			</div>
      			<div className='s-play'>
      				<FlyButton clickHandler={this.play.bind(this)} text='我也要去挑战'></FlyButton>
      			</div>
      		</section>
      </div>
    );
  }
  getQueryString(name){
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);
	    return null;
  }
  play(){
  	setTimeout(()=>{
  		window.location.href = './';
  	},100);
  }
  componentDidMount() {
  		var data = this.getQueryString('score');

  		this.refs['r-main-ui'].classList.add('show');

  		this.setState({
  			score:data || 0
  		});
  		setTimeout(()=>{
	  		this.setState({
	  			showBoard:'active show'
	  		})
	  	},400);
  }
}

ReactDOM.render(<App></App>,document.getElementById('fly-main'));



