import React from 'react';
import {FlyPublicComponent} from './public.jsx';
import './css/gameview.css';
class FlyGameView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      let style = {
          background: 'url(./assets/images/index-bg.jpg) no-repeat bottom center',
          backgroundSize: 'cover'
      }
      return (
          <div className='fly-game-view-ui' style={style}>
              <img className='g-top-bg' src='./assets/images/index-top.png'/>
              <div className="g-rule">规则说明</div>
              <div className="g-rank">
                  <div><span className="g-text">第</span> <span className="g-big">01</span> <span className="g-text">/ 18轮</span>
                  </div>
                  <div>
                      <span className="g-ball"><img src="./assets/images/ranking.png" alt=""/></span>
                      <span className="g-score">25</span> <span className="g-text">分</span> <span
                      className="g-line">|</span> <span className="g-text">排名</span>
                  </div>
              </div>
              <div className="g-info">
                  从下列牌中找到“老虎牌”
                  <img src="./assets/images/hand.png" alt=""/>
              </div>
              <ul className="g-cards-C">
                  <li className="g-cards-item" onTouchTap={this.selectedCard.bind(this,'g-cards-item1')} ref='g-cards-item1'>
                      <div className=""><img src="./assets/images/card.png"/></div>
                      <div className="back "><img src="./assets/images/gy-bg.png"/></div>
                  </li>
                  <li className="g-cards-item" onTouchTap={this.selectedCard.bind(this,'g-cards-item1')} ref='g-cards-item1'>
                      <div className=""><img src="./assets/images/card.png"/></div>
                      <div className="back "><img src="./assets/images/gy-bg.png"/></div>
                  </li>
                  <li className="g-cards-item" onTouchTap={this.selectedCard.bind(this,'g-cards-item1')} ref='g-cards-item1'>
                      <div className=""><img src="./assets/images/card.png"/></div>
                      <div className="back "><img src="./assets/images/gy-bg.png"/></div>
                  </li>
                  <li className="g-cards-item" onTouchTap={this.selectedCard.bind(this,'g-cards-item1')} ref='g-cards-item1'>
                      <div className=""><img src="./assets/images/card.png"/></div>
                      <div className="back "><img src="./assets/images/gy-bg.png"/></div>
                  </li>
                  <li className="g-cards-item" onTouchTap={this.selectedCard.bind(this,'g-cards-item1')} ref='g-cards-item1'>
                      <div className=""><img src="./assets/images/card.png"/></div>
                      <div className="back "><img src="./assets/images/gy-bg.png"/></div>
                  </li>
                  <li className="g-cards-item" onTouchTap={this.selectedCard.bind(this,'g-cards-item1')} ref='g-cards-item1'>
                      <div className=""><img src="./assets/images/card.png"/></div>
                      <div className="back "><img src="./assets/images/gy-bg.png"/></div>
                  </li>
              </ul>
              <div className="g-choose-btn">
                  选择此牌
              </div>
          </div>
      );
  }
    selectedCard(e,ref) {
        console.log(e)
        this.refs[e].classList.toggle('active');

    }
}
export default FlyPublicComponent(FlyGameView);