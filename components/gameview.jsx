import React from 'react';
import {FlyPublicComponent} from './public.jsx';
import './css/gameview.css';
class FlyGameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectCardIndex:0,
    }
  }

  render() {

      var cardsArr = [];
      for(var i =0;i<2;i++){
         cardsArr.push(tiggerData[Math.random()*tiggerData.length|0]);
      }
      for(var i=0;i<4;i++){
         cardsArr.push('');
      }

     // cardsArr = cardsArr.sort(()=>{return .5 - Math.random() > 0})

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
              <ul className="g-cards-C" ref='g-cards-C'>
                 {cardsArr.map((item,i)=>{
                  return <li key={i} className={"g-cards-item " +  (this.state.currentSelectCardIndex === i ? 'selected show':' show')}  onTouchTap={this.selectedCard.bind(this,i)}>
                                <div className=""><img src="./assets/images/card.png"/></div>
                                <div className="back "><img src="./assets/images/gy-bg.png"/></div>
                            </li>
                 })}
              </ul>
              <div className="g-choose-btn">
                  选择此牌
              </div>
              <ul className='g-tigger-list'>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'contain'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'contain'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'contain'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'contain'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'contain'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'contain'}}></li>
              </ul>

              <div className='g-result' style={{background:'url(./assets/images/result-bg.png) no-repeat center center',backgroundSize:'contain'}}>
                  <div className='g-portrait'>
                    <div className='g-portrait-bg'  style={{background:'url('+cardsArr[this.state.currentSelectCardIndex].url+') no-repeat center center',backgroundSize:'cover',overflow:'hidde'}} ></div>
                    <img src='./assets/images/hu-bg.png'/>
                  </div>
                  <div className='g-tigger-name'>
                    {cardsArr[this.state.currentSelectCardIndex].name}
                  </div>
                  <table className='g-tigger-info'>
                      <tbody>
                         <tr>
                            <td>推送内容</td>
                            <td>{cardsArr[this.state.currentSelectCardIndex].pushContent}</td>
                         </tr>
                         <tr>
                            <td>时<span style={{opacity:0}}>时间</span>间</td>
                            <td>{cardsArr[this.state.currentSelectCardIndex].date}</td>
                         </tr>
                         <tr>
                            <td>稿<span style={{opacity:0}}>时间</span>件</td>
                            <td>{cardsArr[this.state.currentSelectCardIndex].file}</td>
                         </tr>
                         <tr>
                            <td>时<span style={{opacity:0}}>时间</span>间</td>
                            <td>{cardsArr[this.state.currentSelectCardIndex].date1}</td>
                         </tr>
                      </tbody>                    
                  </table>
              </div>
          </div>
      );
  }
  componentDidMount() {
    this.dealCard();
  }
  dealCard(){//发牌
      var iNow = 0 ;
      var cardItems = this.refs['g-cards-C'].querySelectorAll('li');
      for(var i = 0 ,len = cardItems.length;i<len;i++){
        cardItems[i].classList.remove('show');
      }
      var t = setInterval(()=>{
          if(cardItems[iNow]){
            cardItems[iNow].classList.add('show');
            iNow++;  
          }
          else{
            clearInterval(t);
          }
          
      },100);
  }
  selectedCard(e) {
      this.setState({
        currentSelectCardIndex:e
      });
      //this.refs[e].classList.toggle('active');

  }
}
export default FlyPublicComponent(FlyGameView);