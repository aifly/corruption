import React from 'react';
import {FlyPublicComponent} from './public.jsx';
import './css/result.css';
import FlyButton from './button.jsx';

import {utilMethods,_$,$$} from '../assets/lib/utilMethod';


class FlyResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	showBoard:'',
    	score:'',
      showMask:false,
    	error:'',
      showNext:true //是否显示下一关按钮

    }
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
      var name = '正局级监察专员';
      if(this.state.score<70){
          name='副局级监察专员';
      }
      if(this.state.score<55){
        name='正处级监察员';
      }
      if(this.state.score<35){
        name='副处级监察员';
      }
      if(this.state.score<20){
        name='主任科员';
      }if(this.state.score<10){
        name='副主任科员';
      }
      if(this.state.score<=5){
        name='科员';
      }
    return (
      <div className={'r-main-ui ' + this.state.showBoard} ref='r-main-ui' style={style}>
      		<div className={'g-message ' + this.state.error}>&times; 手机号码格式不正确！</div>
      		<div className={'r-board '} style={boardStyle}></div>
      		<section className='r-content-C' style={{background:'url(./assets/images/result-bg1.png) no-repeat center',backgroundSize:'contain'}}>
      			<h1></h1>
      			<h3>您一共翻出了{this.state.score/5}名违纪官员， </h3>
      			<p>共计获的得</p>
      			<div className='r-score-C'>{name}称号</div>
      			<div className='r-rank'>
      				<img src='./assets/images/paiming.png'/>
      			</div>
            <div className='r-restart'>
              {this.state.showNext && <FlyButton clickHandler={this.restart.bind(this)} text='继续下一关' ></FlyButton>}
            </div>
      			<div className='r-tel'>
      				<input ref='phone' onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} type='text' placeholder='留下您的手机号' />
      			</div>
      			<div className='r-mark'>
      				<span>参与100名幸运抽奖活动</span>
      				<span onTouchTap={this.showRule.bind(this)}>获奖说明</span>
      			</div>
      			<div className='r-btn-group '>
      				<FlyButton clickHandler={this.sureShare.bind(this)} text='确定并分享'></FlyButton>
      			</div>
      			
      		</section>
          {this.state.showMask && <div onTouchStart={()=>{this.setState({showMask:false})}} className='r-mask' style={{background:"url(./assets/images/arron1.png) no-repeat center top",backgroundSize:'cover'}}></div>}
      </div>
    );
  }

  showRule(){
    let {obserable} = this.props;
    obserable.trigger({type:'openRule'});
  }

  onFocus(e){

    return false;
  }

  onBlur(e){
    return false;
  }

  sureShare(){//确定并分享、
  	var phone = this.refs['phone'].value;
  	 var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	 if (!reg.test(phone)) {
	     //正确。
	     this.setState({
	     	error:'active'
	     });
	     setTimeout(()=>{
          this.setState({
            error:""
          });  
        },1000)
	     return false;
	 }
	 utilMethods.post('http://api.zmiti.com/v2/user/save_user_score/',(data)=>{
		 setTimeout(()=>{
		  	//window.location.href = './share.html?score='+this.state.score;
        this.setState({
          showMask:true
        })
		  },100);	
	 },{
	 	setscore:this.state.score,
	 	setmobile:phone,
    settype:0
	 });
  }

  restart(){//继续下一关。
  	let {obserable} = this.props;
  	obserable.trigger({
  		type:'replay'
  	});
  	this.refs['r-main-ui'].classList.remove('show');
  }

  componentDidMount() {

  	let {obserable} = this.props;

    obserable.on('removeEntryNext',()=>{
      this.setState({
        showNext:false
      });
    })

  	obserable.on('startResult',(data)=>{

  		this.refs['r-main-ui'].classList.add('show');

  		this.setState({
  			score:data
  		});
  		setTimeout(()=>{
	  		this.setState({
	  			showBoard:'active show'
	  		})
	  	},400);
  	});

  }

  r(m,n){
  	return m + Math.random()*(n-m);
  }
}

export default FlyPublicComponent(FlyResult);