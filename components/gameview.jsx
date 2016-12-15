import React from 'react';
import {FlyPublicComponent} from './public.jsx';
import './css/gameview.css';
class FlyGameView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	let style = {
  		background:'url(./assets/images/index-bg.jpg) no-repeat bottom center',
  		backgroundSize:'cover'
  	}
    return (
      <div className='fly-game-view-ui' style={style}>
      		<img className='g-top-bg' src='./assets/images/index-top.png'/>
      </div>
    );
  }
}
export default FlyPublicComponent(FlyGameView);