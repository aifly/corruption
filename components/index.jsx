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
				
			]
		};
	}
	render(){

	   let style = {
            background:"url(./assets/images/shadow.png) no-repeat center center,url(./assets/images/loading-bg.jpg) no-repeat center center",
            backgroundSize:'cover'
        }
		return <div style={style} className='fly-index-page hide' ref='fly-index-page'>
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
	componentDidMount() {
		this.state.tiggerInfo = tiggerData.concat([]);
		this.state.tiggerInfo.length >9 && (this.state.tiggerInfo.length = 9);
		this.state.tiggerInfo.push({});
		this.forceUpdate();
		this.refs['fly-index-page'].classList.remove('hide');
		setTimeout(()=>{
			this.refreshCards();//翻牌
		},500)
	}
	gameStart(){
		this.setState({
			activeBtnClass:''
		});
		let {obserable} = this.props;
		obserable.trigger({type:'startPlay'});
		this.refs['fly-index-page'].classList.add('hide');

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

