import React from 'react';
import {FlyPublicComponent } from './public.jsx';
import './css/index.css';


class IndexApp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			firgureStyle:{
				background:'url(./assets/images/figure.png) no-repeat center top',
				backgroundSize:'contain'
			},
			animated:'animated',
			cardLen:10,
			activeBtnClass:'',
			tiggerInfo:[
				
			]
		};
	}
	render(){

	   let style = {
            background:"url(./assets/images/shadow.png) no-repeat center center,url(./assets/images/loading-bg.jpg) no-repeat center center",
            backgroundSize:'cover'
        }
		return <div style={style} className='fly-index-page hide' ref='fly-index-page'>
			<audio ref='audio' src='./assets/music/doudizhu.mp3'></audio>
			<div className='fly-2016'>
				<img src='./assets/images/2016.png' data-src='./assets/images/2016.png'/>
			</div>
			<div className={'fly-push '+ this.state.animated} ref='fly-push'>
				<img src='./assets/images/push.png' data-src='./assets/images/push.png'/>
			</div>
			<section className='fly-main-area'>

				<section className='fly-figure' style={this.state.firgureStyle}>
					<section className="fly-card-C" ref="fly-card-C" onTouchTap={this.refreshCards.bind(this)}>
						{this.state.tiggerInfo.map((item,i)=>{

							if(item.url){
								return <figure key={i}>
									<img src="./assets/images/gy-bg.png" alt=""/>
									<div className="fly-tigger-ico" style={{background:'url('+item.url+') no-repeat center center',backgroundSize:'cover'}}>

									</div>
									<div className="fly-tigger-name">
										{item.name}
									</div>
								</figure>
							}
							else{
								return <figure key={i} >
									<img src="./assets/images/card.png" alt=""/>
								</figure>
							}
						})}
					</section>
					<section className="fly-tigger">
						<img src="./assets/images/hu.png" alt=""/>
					</section>
					<section onTouchStart={this.gamePrepare.bind(this)} onTouchEnd={this.gameStart.bind(this)} className={"fly-begin-btn " + this.state.activeBtnClass} ref='fly-begin-btn'>
						<div>
							<span className='active'>开始游戏</span>
							<span className='right'><img src='./assets/images/push-btn.png'/></span>
						</div>
					</section>
				</section>
			</section>
			<section className='fly-logo'>
				<img src='./assets/images/logo.png' data-src='./assets/images/logo.png'/>
			</section>
		</div>
	}
	gamePrepare(){
		this.setState({
			activeBtnClass:'active'
		});
	}

	btnAnimate(i,spans){
		
		if(i===0){
			spans[0].classList.add('left');
			spans[0].classList.remove('active');
			spans[1].classList.add('active');
			spans[1].classList.remove('right');
			spans[1].classList.add('animated');
			setTimeout(()=>{
				spans[0].classList.remove('left');
				spans[0].classList.add('right');

			},300)
		}else{
			spans[1].classList.add('left');
			spans[1].classList.remove('active');
			spans[0].classList.add('active');
			spans[0].classList.remove('right');
			spans[1].classList.remove('animated');
			setTimeout(()=>{
				spans[1].classList.remove('left');
				spans[1].classList.add('right');
				
			},300)
		}
		

	}

	componentDidMount() {
		var ii =0 ;
		var spanC =this.refs['fly-begin-btn'].querySelector('div');
		var spans = spanC.querySelectorAll('span');
		this.btnTimer = setInterval(()=>{
			this.btnAnimate(ii++%2,spans);
		},3000);
		this.state.tiggerInfo = tiggerData.concat([]);
		this.state.tiggerInfo.length >9 && (this.state.tiggerInfo.length = 9);
		this.state.tiggerInfo.push({});
		this.forceUpdate();
		this.refs['fly-index-page'].classList.remove('hide');


		setTimeout(()=>{
			this.refreshCards();//翻牌
		},1000);



		this.refs['fly-push'].addEventListener('webkitAnimationEnd',()=>{
			this.setState({animated:''});	
		});

		
		document.getElementById('audio').addEventListener('canplaythrough',()=>{
			document.getElementById('audio').volume  = .1;	
		})

		var audio = this.refs['audio'];

		audio.addEventListener('canplaythrough',()=>{
			audio.volume  =0.1;				
		})

		var startIndex = 0;
		var isStartPlay = false;
		this.refs['fly-index-page'].addEventListener('touchstart',()=>{
			if(isStartPlay){
				if(startIndex === 0 && audio.paused){
					audio.play();
				}
				startIndex++;
			}
			
		});

		this.bgLoopTimer = setInterval(()=>{
				isStartPlay = true;
				audio.play();
				this.refreshCards();//翻牌
				this.setState({animated:'animated'});
		},10000);
	}
	gameStart(){
		this.setState({
			activeBtnClass:''
		});
		let {obserable} = this.props;
		obserable.trigger({type:'startPlay'});
		this.refs['fly-index-page'].classList.add('hide');
		clearInterval(this.bgLoopTimer);
		clearInterval(this.btnTimer);

	}
	refreshCards(){
		var cards = this.refs['fly-card-C'].querySelectorAll('figure'),
			m = Math;

		var iNow = 0;
		var duration = 50;
		var t = setInterval(()=>{
			if(cards[iNow]){
				cards[iNow].classList.add('active');
				iNow++;
			}
			else{
				clearInterval(t);
				iNow=0;
				setTimeout(()=>{
					t = setInterval(()=>{

						if(cards[iNow]){
							cards[iNow].classList.remove('active');
							iNow++;
						}
						else{
							clearInterval(t);
						}

					},duration)
				},300)
			}

		},duration)
	}
}

export default FlyPublicComponent(IndexApp);

