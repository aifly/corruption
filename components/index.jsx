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
			cardLen:10,
			activeBtnClass:'',
			tiggerInfo:[
				{
					url:'./assets/images/lh-1.jpg',
					name:'邓崎琳'
				},{
					url:'./assets/images/lh-2.jpg',
					name:'张乐斌'
				},{
					url:'./assets/images/lh-3.jpg',
					name:'张力夫'
				},{
					url:'./assets/images/lh-4.jpg',
					name:'张乐斌'
				},{
					url:'./assets/images/lh-5.jpg',
					name:'邓崎琳'
				},{
					url:'./assets/images/lh-6.jpg',
					name:'张乐斌'
				},{
					url:'./assets/images/lh-7.jpg',
					name:'邓崎琳'
				},{
					url:'./assets/images/lh-8.jpg',
					name:'张乐斌'
				},{
					url:'./assets/images/lh-9.jpg',
					name:'邓崎琳'
				},{

				}
			]
		};
	}
	render(){

	   let style = {
            background:"url(./assets/images/shadow.png) no-repeat center center,url(./assets/images/loading-bg.jpg) no-repeat center center",
            backgroundSize:'cover'
        }
		return <div style={style} className='fly-index-page'>
			<div className='fly-2016'>
				<img src='./assets/images/2016.png' data-src='./assets/images/2016.png'/>
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
					<section onTouchStart={this.gamePrepare.bind(this)} onTouchEnd={this.gameStart.bind(this)} className={"fly-begin-btn " + this.state.activeBtnClass}>
						开始游戏
					</section>
				</section>
				{
					/*
					 <section className='fly-70'>
					 <img src='./assets/images/70.png' data-src='./assets/images/70.png'/>
					 </section>
					 <section className='fly-text'>
					 <img src='./assets/images/text.png' data-src='./assets/images/text.png'/>
					 </section>
					 <section className='fly-cards'>
					 <img src='./assets/images/cards.png' data-src='./assets/images/cards.png'/>
					 </section>*/
				}
				
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
	gameStart(){
		this.setState({
			activeBtnClass:''
		});


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

