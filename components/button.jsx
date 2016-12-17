import React from 'react';
import {FlyPublicComponent} from './public.jsx';
import './css/button.css';

 class FlyButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)} className={this.props.className+ ' g-next'}>
      	  {this.props.text}
          {this.props.ico &&<img src={this.props.ico} /> }
      </div>
    );
  }
  touchStart(e){
  	e.target.classList.add('active');
  }
  touchEnd(e){
  	e.target.classList.remove('active');	
  	this.props.clickHandler();
  }

}
FlyButton.defaultProps = {
	text:'下一轮',
	className:'',
  ico:'',
	clickHandler:()=>{

	}
};

export default FlyPublicComponent(FlyButton);