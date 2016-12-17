import React from 'react';
import {FlyPublicComponent} from './public.jsx';
import './css/gameview.css';
import FlyButton from './button.jsx';

class FlyGameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectCardIndex:-1,
      isError:'',
      rightTigger:-1,
      iNow:1,//当前是第几轮。
      score:0,//当前的得分
      currentData:{}
    }
  }

  render() {

      var cardsArr = [];
      for(var i =0;i<2;i++){
        
         cardsArr.push(tiggerData[Math.floor(Math.random()*(tiggerData.length-1))]);
         //cardsArr.push('none');
      }
      for(var i=0;i<4;i++){
         cardsArr.push('none');
      }

      //cardsArr = cardsArr.sort(()=>{return .5 - Math.random() > 0})

      this.cardsArr = cardsArr;
     // console.log(cardsArr)


      let style = {
          background: 'url(./assets/images/index-bg.jpg) no-repeat bottom center',
          backgroundSize: 'cover'
      }
      return (
          <div className='fly-game-view-ui' ref='fly-game-view-ui' style={style}>
              <img className='g-top-bg' src='./assets/images/index-top.png'/>
              <div className={'g-message ' + this.state.error}>&times; 请选择一张牌</div>
              <div className="g-rule">规则说明</div>
              <div className="g-rank">
                  <div><span className="g-text">第</span> <span className="g-big">{'0'+this.state.iNow}</span> <span className="g-text">/ 6轮</span>
                  </div>
                  <div>
                      <span className="g-ball"><img src="./assets/images/ranking.png" alt=""/></span>
                      <span className="g-score">{this.state.score}</span> <span className="g-text">分</span> <span
                      className="g-line">|</span> <span className="g-text">排名</span>
                  </div>
              </div>
              <div className="g-info">
                  从下列牌中找到“老虎牌”
                  <img src="./assets/images/hand.png" alt=""/>
              </div>
              <ul className="g-cards-C" ref='g-cards-C'>
                 {cardsArr.map((item,i)=>{
                  return <li key={i} className={"g-cards-item " +  (this.state.currentSelectCardIndex === i ? 'selected show ':' show ')}  onTouchTap={this.selectedCard.bind(this,i)}>
                                <div className=""><img src="./assets/images/card.png"/></div>
                                <div className="back ">
                                  <img src="./assets/images/gy-bg.png"/>
                                  {item && item.name && <div className='g-portrait-img' style={{background:'url('+item.url+') no-repeat center',backgroundSize:'cover'}}></div>}
                                  {item && item.name && <img src="./assets/images/right.png"/>}
                                </div>
                            </li>
                 })}
              </ul>
              <div className="g-choose-btn" ref='g-choose-btn' onTouchEnd={this.beginChooseCard.bind(this)} onTouchStart={()=>{this.refs['g-choose-btn'].classList.add('active')}}>
                  选择此牌
              </div>
              <ul className='g-tigger-list' ref='g-tigger-list'>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
              </ul>
              {this.state.currentData && this.state.currentData.url && 
                  <div className='g-result' ref='g-result' style={{background:'url(./assets/images/result-bg.png) no-repeat center center',backgroundSize:'contain',display:'none'}}>
                  {this.state.rightTigger<0 && <div className='g-right'><img src='./assets/images/right.png'/></div>}
                  <div className='g-portrait'>
                    <div className='g-portrait-bg'  style={{background:'url('+this.state.currentData.url+') no-repeat center center',backgroundSize:'cover',overflow:'hidde'}} ></div>
                    <img src='./assets/images/hu-bg.png'/>
                  </div>
                  <div className='g-tigger-name'>
                    {this.state.currentData.name}
                  </div>
                  <table className='g-tigger-info'>
                      <tbody>
                         <tr>
                            <td>推送内容</td>
                            <td>{this.state.currentData.pushContent}</td>
                         </tr>
                         <tr>
                            <td>时<span style={{opacity:0}}>时间</span>间</td>
                            <td>{this.state.currentData.date}</td>
                         </tr>
                         <tr>
                            <td>稿<span style={{opacity:0}}>时间</span>件</td>
                            <td>{this.state.currentData.file}</td>
                         </tr>
                         <tr>
                            <td>时<span style={{opacity:0}}>时间</span>间</td>
                            <td>{this.state.currentData.date1}</td>
                         </tr>
                      </tbody>                    
                  </table>
                  {this.state.iNow < 6 && <FlyButton clickHandler={this.nextRound.bind(this)}></FlyButton>}
                  {this.state.iNow>=6 &&<FlyButton  text='确 定' clickHandler={this.redirectToResult.bind(this)}></FlyButton>}
              </div>
              }
              

              {this.state.currentData && !this.state.currentData.url &&
                 <div className='g-result' ref='g-result' style={{background:'url(./assets/images/none.png) no-repeat center center',backgroundSize:'contain'}}>
                 <div className='g-look'>
                    <FlyButton clickHandler={this.lookTigger.bind(this)} text='查看“老虎”牌'></FlyButton>
                 </div>
              </div>
              }
          </div>
      );
  }

  redirectToResult(){//跳转到结果页面
      let { obserable } = this.props;
      obserable.trigger({type:'startResult',data:this.state.score});
      this.refs['fly-game-view-ui'].classList.remove('show');
  }

  nextRound(){//下一轮
      this.setState({
         iNow:this.state.iNow+1,
         currentSelectCardIndex:-1,
         rightTigger:-1,
         currentData:{} 
      });
      this.dealCard();

  }
  beginChooseCard(){//

      this.smallTiggers = this.smallTiggers || this.refs['g-tigger-list'].querySelectorAll('li');
           
      this.refs['g-choose-btn'].classList.remove('active');
            if(this.state.currentSelectCardIndex < 0){
                this.setState({
                  error:"active"
                });  
                setTimeout(()=>{
                  this.setState({
                    error:""
                  });  
                },1000)
            }
            else{

                var obj = this.refs['g-cards-C'].querySelectorAll('li')[this.state.currentSelectCardIndex];
                obj.classList.add('active');

                setTimeout(()=>{
                   this.setState({
                      currentData:this.cardsArr[this.state.currentSelectCardIndex]
                    },()=>{
                       // console.log(this.state.currentSelectCardIndex)
                        this.refs['g-result'] && (this.refs['g-result'].style.display = 'block');
                          if(this.cardsArr[this.state.currentSelectCardIndex] && this.cardsArr[this.state.currentSelectCardIndex].url){
                             
                             this.setState({//答对，得分+5 轮数+1
                                score:this.state.score+5,
                             });

                            this.smallTiggers[this.state.iNow-1].style.background = 'url('+this.state.currentData.url+') no-repeat center';
                            this.smallTiggers[this.state.iNow-1].style.backgroundSize = 'cover';

                          }else{//没有选择到老虎
                              this.cardsArr.map((item,i)=>{

                                  if(item && item.url){
                                      this.state.rightTigger = i;
                                  }
                            });

                        }  
                  });
                 },800);
            }
      
      
  }

  lookTigger(){//查看老虎
      this.setState({
        currentData:this.cardsArr[this.state.rightTigger]
      },()=>{
        this.refs['g-result'] && (this.refs['g-result'].style.display = 'block');
      });
  }

  componentDidMount() {
    this.dealCard();

    let {obserable} = this.props;

    obserable.on('startPlay',()=>{
      this.refs['fly-game-view-ui'].classList.add('show');
    })

    obserable.on('replay',()=>{//重新开始。
      this.refs['fly-game-view-ui'].classList.add('show');
      this.setState({
          currentSelectCardIndex:-1,
          isError:'',
          rightTigger:-1,
          iNow:1,//当前是第几轮。
          score:0,//当前的得分
          currentData:{}
      });
      for(var i = 0,len=this.smallTiggers.length;i<len;i++){
          this.smallTiggers[i].style.background = 'url(./assets/images/user.png) no-repeat center';
          this.smallTiggers[i].style.backgroundSize = 'cover';
      }
    });
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