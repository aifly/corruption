import React from 'react';
import {FlyPublicComponent } from './public.jsx';
import './css/index.css';

class IndexApp extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
	   let style = {
            background:"url(./assets/images/loading-bg.jpg) no-repeat center center",
            backgroundSize:'cover'
        }
		return <div style={style} className='fly-index-page'>
			<div className='fly-2016'>
				<img src='./assets/images/2016.png' data-src='./assets/images/2016.png'/>
			</div>
			<section className='fly-main-area'>
				<section className='fly-figure'>
					<img src='./assets/images/figure.png' data-src='./assets/images/figure.png'/>
				</section>
				<section className='fly-70'>
					<img src='./assets/images/70.png' data-src='./assets/images/70.png'/>
				</section>
				<section className='fly-text'>
					<img src='./assets/images/text.png' data-src='./assets/images/text.png'/>
				</section>
				<section className='fly-cards'>
					<img src='./assets/images/cards.png' data-src='./assets/images/cards.png'/>
				</section>
				
			</section>
			<section className='fly-logo'>
				<img src='./assets/images/logo.png' data-src='./assets/images/logo.png'/>
			</section>
		</div>
	}
}

export default FlyPublicComponent(IndexApp);

