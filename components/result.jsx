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
      showDialog:false,
      showDesignation:false,
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
      var name = '中央纪委干部';
      if(this.state.score<70){
          name='省纪委干部';
      }
      if(this.state.score<55){
        name='市纪委干部';
      }
      if(this.state.score<25){
        name='县纪委干部';
      }
     
    return (
      <div className={'r-main-ui  ' + this.state.showBoard} ref='r-main-ui' style={style}>
      		<div className={'g-message ' + this.state.error}>&times; 手机号码格式不正确！</div>
      		<div className={'r-board '} style={boardStyle}></div>
          {this.state.showDesignation &&  <div onTouchTap={()=>{this.setState({showDesignation:false})}} className={'r-designation '+ (this.state.showDesignation?'show':'')}>
                      <span>{name}</span>
                      <img src='./assets/images/chenghao.png'/>
                    </div>}
          {/*this.state.showDialog && <div className='r-dialog'>
              <section>
                <h1 onTouchTap={()=>{this.setState({showDialog:false})}}>&times;</h1>
                <div>输入手机号</div>
                <div>
                    <input type='text' placeholder='留下您的手机号' ref='phone'/>
                </div>
                <div className='r-btns'>
                  <aside>
                    <FlyButton text='取消' clickHandler={()=>{this.setState({showDialog:false})}}></FlyButton>
                  </aside>
                  <aside>
                    <FlyButton text='确定' clickHandler={this.sureShare.bind(this)}></FlyButton>
                  </aside>
                </div>
              </section>
          </div>*/}
      		<section className='r-content-C' style={{background:'url(./assets/images/result-bg1.png) no-repeat center',backgroundSize:'contain'}}>
      			<h1></h1>
      			<h3>您一共翻出了{this.state.score/5}名违纪官员， </h3>
      			<p>可以当</p>
      			<div className='r-score-C'>{name}</div>
      			<div className='r-rank'>
      				<img src='./assets/images/paiming.png'/>
      			</div> 
            {
              !this.state.showNext && <div><FlyButton text="分 享" clickHandler={this.shareTimeline.bind(this)}></FlyButton></div>
            }
      			{/*!this.state.showNext &&<div className='r-mark'>
              <span>参与100名幸运抽奖活动</span>
              <span onTouchTap={()=>{this.setState({showDialog:true})}}>立即前往>></span>
              <span onTouchTap={this.showRule.bind(this)}>获奖说明</span>
            </div> */}

            {
              !this.state.showNext && <div><FlyButton text="再玩一轮" ico='./assets/images/fresh.png' clickHandler={()=>{window.location.href=window.location.href}}></FlyButton></div>
            }

             {this.state.showNext && <div className='r-restart'>
                             <FlyButton clickHandler={this.restart.bind(this)} text='继续下一关' ></FlyButton>
                         </div>}
      			{this.state.showNext && <div className='r-btn-group '>
              {/*<FlyButton clickHandler={this.sureShare.bind(this)} text='确定并分享'></FlyButton>*/}
              <span onTouchTap={this.shareTimeline.bind(this)}>不玩了，分享给好友</span>
            </div>}
      			
      		</section>
          {this.state.showMask && <div onTouchStart={()=>{this.setState({showMask:false})}} className='r-mask' style={{background:"url(./assets/images/arron1.png) no-repeat center top",backgroundSize:'cover'}}></div>}
      </div>
    );
  }

  showRule(){
    let {obserable} = this.props;
    obserable.trigger({type:'openRule'});
  }

  shareTimeline(){//不玩了，分享给好友
      this.setState({
        showMask:true
      });
      this.setTitle();
  }

  onFocus(e){

    return false;
  }

  onBlur(e){
    return false;
  }

  sureShare(){//确定并分享、
    document.title =  '';
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
        });
        this.setTitle();
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
  	this.setState({
      showBoard:' '
    })
  }

  setTitle(){

      var name = '中央纪委干部';
      if(this.state.score<70){
          name='省纪委干部';
      }
      if(this.state.score<55){
        name='市纪委干部';
      }
      if(this.state.score<25){
        name='县纪委干部';
      }

      var title = '您一共翻出了'+(this.state.score/5)+'名违纪官员，可以当' + name ;

      document.title = title;
  }

  componentDidMount() {

  	let {obserable} = this.props;

    obserable.on('removeEntryNext',()=>{
      this.setState({
        showNext:false,
      });
    });

    obserable.on('showDesignation',()=>{
      this.setState({
          showDesignation:true
      });
    })

  	obserable.on('startResult',(data)=>{

  		//this.refs['r-main-ui'].classList.add('show');

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