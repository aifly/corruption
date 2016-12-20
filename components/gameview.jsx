import React from 'react';
import {FlyPublicComponent} from './public.jsx';
import './css/gameview.css';
import FlyButton from './button.jsx';
import {utilMethods,_$,$$} from '../assets/lib/utilMethod'

class FlyGameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectCardIndex:-1,
      isError:'',
      rightTigger:-1,
      iNow:1,//当前是第几轮。
      score:0,//当前的得分
      ruleShow:false,
      currentData:{},
      allCount:5,
      scoreClass:'',
      scoreData:[
        
      ]
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

      cardsArr = cardsArr.sort(()=>{return .5 - Math.random() > 0})

      this.cardsArr = cardsArr;
     // console.log(cardsArr)

      let style = {
          background: 'url(./assets/images/index-bg.jpg) no-repeat bottom center',
          backgroundSize: 'cover'
      }
      return (
          <div className='fly-game-view-ui' ref='fly-game-view-ui' style={style}>
              <section className={'fly-scrore-list '+ this.state.scoreClass}>
                  <h2 onTouchTap={()=>{this.setState({scoreClass:''})}}>&times;</h2>
                  <h3>游戏排名TOP10</h3>
                  <ul className='fly-score-title'>
                    <li>排名</li>
                    <li>玩家</li>
                    <li>积分</li>
                  </ul>
                  <div className='fly-scroll-C'>
                      <ul>
                          {this.state.scoreData.map((item,i)=>{
                            item.mobile = item.mobile.substring(0,3)+"****"+item.mobile.substring(7,11)
                            return <li key={i}><div>{i+1}</div><div>{item.mobile}</div><div>{item.score}</div></li>  
                          })}
                      </ul>
                  </div>
              </section>
              <img className='g-top-bg' src='./assets/images/index-top.png'/>
              <div className="g-rule" onTouchTap={this.showRule.bind(this)}>规则说明</div>
             
              <div className="g-rank">
                  <div><span className="g-text">第</span> <span className="g-big">{'0'+this.state.iNow}</span> <span className="g-text">/ {this.state.allCount}轮</span>
                  </div>
                  <div>
                      <span className="g-ball"><img src="./assets/images/ranking.png" alt=""/></span>
                      <span className="g-score">{this.state.score}</span> <span className="g-text">分</span> <span
                      className="g-line">|</span> <span className="g-text" onTouchTap={this.showScore.bind(this)}>排名</span>
                  </div>
              </div>
              <div className="g-info">
                  从下列牌中找到“老虎牌”
                  <img src="./assets/images/hand.png" alt=""/>
              </div>
              <ul className="g-cards-C" ref='g-cards-C'>
                 {cardsArr.map((item,i)=>{
                  return <li key={i} className={"g-cards-item  " +  (this.state.currentSelectCardIndex === i ? 'selected show  active':' show active')}  onTouchTap={this.selectedCard.bind(this,i)}>
                                <div className=""><img src="./assets/images/card.png"/></div>
                                <div className="back ">
                                  <img src="./assets/images/gy-bg.png"/>
                                  {item && item.name && <div className='g-portrait-img' style={{background:'url('+item.url+') no-repeat center',backgroundSize:'cover'}}></div>}
                                  {item && item.name && <img src="./assets/images/right.png"/>}
                                </div>
                            </li>
                 })}
              </ul>
           
              <ul className='g-tigger-list' ref='g-tigger-list' onTouchTap={this.order.bind(this)}>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
                  <li style={{background:'url(./assets/images/user.png)',backgroundSize:'cover'}}></li>
              </ul>
              {this.state.currentData && this.state.currentData.url && 
                  <div className='g-result' ref='g-result' style={{display:'none'}}>
                    <article ref='g-result-C'>
                         <section className="g-result-C"  style={{background:'url(./assets/images/result-bg.png) no-repeat center center',backgroundSize:'contain'}}>
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
                                      <td><a href='#'>{this.state.currentData.pushContent.length>30?this.state.currentData.pushContent.substring(0,30)+'...':this.state.currentData.pushContent}</a></td>
                                   </tr>
                                   <tr>
                                      <td>时<span style={{opacity:0}}>时间</span>间</td>
                                      <td><a href='#'>{this.state.currentData.date}</a></td>
                                   </tr>
                                   <tr>
                                      <td>稿<span style={{opacity:0}}>时间</span>件</td>
                                      <td><a href='#'>
                                        {this.state.currentData.file.length>18?this.state.currentData.file.substring(0,18)+'...':this.state.currentData.file}
                                      </a></td>
                                   </tr>
                                   <tr>
                                      <td>时<span style={{opacity:0}}>时间</span>间</td>
                                      <td><a href='#'>{this.state.currentData.date1}</a></td>
                                   </tr>
                                </tbody>                    
                            </table>
                            {this.state.iNow < this.state.allCount && <FlyButton clickHandler={this.nextRound.bind(this)}></FlyButton>}
                            {this.state.iNow>=this.state.allCount &&<FlyButton  text='确 定' clickHandler={this.redirectToResult.bind(this)}></FlyButton>}  
                        </section>
                        <section className='g-back' style={{background:'url(./assets/images/card.png) no-repeat center center',backgroundSize:'contain'}}>
                            
                        </section>
                    </article>
                  </div>
              }

              {this.state.currentData && !this.state.currentData.url &&
                 <div className='g-result' ref='g-result'>
                    <article ref='g-result-C' style={{background:'url(./assets/images/none.png) no-repeat center center',backgroundSize:'contain'}}>
                      <section className='g-result-C'>
                        <div className='g-look'>
                          <FlyButton clickHandler={this.lookTigger.bind(this)} text='查看“老虎”牌'></FlyButton>
                       </div>
                      </section>
                      <section className='g-back' style={{background:'url(./assets/images/card.png) no-repeat center center',backgroundSize:'contain'}}>
                            
                      </section>
                    </article>
                 
              </div>
              }
          </div>
      );
  }



 showRule(){
    let {obserable} = this.props;
    obserable.trigger({type:'openRule'});
  }
  showScore(){
    
    var s = this;
    utilMethods.post('http://api.zmiti.com/v2/user/get_user_score/',function(data){
          data = JSON.parse(data);
          if(data.getret === 0){
              s.setState({
                scoreClass:'active',
                scoreData:data.result
              });
          }
    },{
      settype:0
    });

  }

  redirectToResult(){//跳转到结果页面
      let { obserable } = this.props;
      obserable.trigger({type:'startResult',data:this.state.score});
      this.refs['fly-game-view-ui'].classList.remove('show');
       this.start = false;
  }

  nextRound(){//下一轮
      this.setState({
         iNow:this.state.iNow+1,
         currentSelectCardIndex:-1,
         rightTigger:-1,
         currentData:{} 
      });
      this.dealCard();
      this.start = false;

  }
  

  lookTigger(){//查看老虎
      this.setState({
        currentData:this.cardsArr[this.state.rightTigger]
      },()=>{
        if(this.refs['g-result'] ){
            this.refs['g-result'].style.display = 'block';
            this.refs['g-result'].classList.add('active');
        }
      });
  }

  order(){

    this.iNow = this.iNow === undefined ? 0 : this.iNow;
    var index = ++this.iNow % 6;


    // for(let i = 0 ; i < 6 ; i ++){
    //         var iNow = (index+i) > 5 ? index+i - 6  :index+i;
    //         var left = this.cardPosArr[iNow].left,
    //             top = this.cardPosArr[iNow].top;

    //         this.cardItems[i].style.left =  left +'px';
//         this.cardItems[i].style.top =  top + 'px'  ;

    //     }
    switch(index) {
      case 0:
        for(var i = 0 ; i < 6 ;i++){
          this.cardItems[i].style.left =  this.cardPosArr[i].left +'px';
          this.cardItems[i].style.top =   this.cardPosArr[i].top + 'px';  
        }
        
        break;
      case 1:

        this.cardItems[0].style.left =  this.cardPosArr[1].left +'px';
        this.cardItems[0].style.top =   this.cardPosArr[1].top + 'px';

        this.cardItems[1].style.left =  this.cardPosArr[2].left +'px';
        this.cardItems[1].style.top =   this.cardPosArr[2].top + 'px';

        this.cardItems[2].style.left =  this.cardPosArr[5].left +'px';
        this.cardItems[2].style.top =   this.cardPosArr[5].top + 'px';

        this.cardItems[3].style.left =  this.cardPosArr[0].left +'px';
        this.cardItems[3].style.top =   this.cardPosArr[0].top + 'px';

        this.cardItems[4].style.left =  this.cardPosArr[3].left +'px';
        this.cardItems[4].style.top =   this.cardPosArr[3].top + 'px';

        this.cardItems[5].style.left =  this.cardPosArr[4].left +'px';
        this.cardItems[5].style.top =   this.cardPosArr[4].top + 'px';


        
        break;
      case 2:

        this.cardItems[0].style.left =  this.cardPosArr[2].left +'px';
        this.cardItems[0].style.top =   this.cardPosArr[2].top + 'px';

        this.cardItems[1].style.left =  this.cardPosArr[5].left +'px';
        this.cardItems[1].style.top =   this.cardPosArr[5].top + 'px';

        this.cardItems[2].style.left =  this.cardPosArr[4].left +'px';
        this.cardItems[2].style.top =   this.cardPosArr[4].top + 'px';

        this.cardItems[3].style.left =  this.cardPosArr[1].left +'px';
        this.cardItems[3].style.top =   this.cardPosArr[1].top + 'px';

        this.cardItems[4].style.left =  this.cardPosArr[0].left +'px';
        this.cardItems[4].style.top =   this.cardPosArr[0].top + 'px';

        this.cardItems[5].style.left =  this.cardPosArr[3].left +'px';
        this.cardItems[5].style.top =   this.cardPosArr[3].top + 'px';
 

        break;
      case 3:
        this.cardItems[0].style.left =  this.cardPosArr[5].left +'px';
        this.cardItems[0].style.top =   this.cardPosArr[5].top + 'px';

        this.cardItems[1].style.left =  this.cardPosArr[4].left +'px';
        this.cardItems[1].style.top =   this.cardPosArr[4].top + 'px';

        this.cardItems[2].style.left =  this.cardPosArr[3].left +'px';
        this.cardItems[2].style.top =   this.cardPosArr[3].top + 'px';

        this.cardItems[3].style.left =  this.cardPosArr[2].left +'px';
        this.cardItems[3].style.top =   this.cardPosArr[2].top + 'px';

        this.cardItems[4].style.left =  this.cardPosArr[1].left +'px';
        this.cardItems[4].style.top =   this.cardPosArr[1].top + 'px';

        this.cardItems[5].style.left =  this.cardPosArr[0].left +'px';
        this.cardItems[5].style.top =   this.cardPosArr[0].top + 'px';
        break;
      case 4:
        this.cardItems[0].style.left =  this.cardPosArr[4].left +'px';
        this.cardItems[0].style.top =   this.cardPosArr[4].top + 'px';

        this.cardItems[1].style.left =  this.cardPosArr[3].left +'px';
        this.cardItems[1].style.top =   this.cardPosArr[3].top + 'px';

        this.cardItems[2].style.left =  this.cardPosArr[0].left +'px';
        this.cardItems[2].style.top =   this.cardPosArr[0].top + 'px';

        this.cardItems[3].style.left =  this.cardPosArr[5].left +'px';
        this.cardItems[3].style.top =   this.cardPosArr[5].top + 'px';

        this.cardItems[4].style.left =  this.cardPosArr[2].left +'px';
        this.cardItems[4].style.top =   this.cardPosArr[2].top + 'px';

        this.cardItems[5].style.left =  this.cardPosArr[1].left +'px';
        this.cardItems[5].style.top =   this.cardPosArr[1].top + 'px';
        break;
      case 5:
        this.cardItems[0].style.left =  this.cardPosArr[3].left +'px';
        this.cardItems[0].style.top =   this.cardPosArr[3].top + 'px';

        this.cardItems[1].style.left =  this.cardPosArr[0].left +'px';
        this.cardItems[1].style.top =   this.cardPosArr[0].top + 'px';

        this.cardItems[2].style.left =  this.cardPosArr[1].left +'px';
        this.cardItems[2].style.top =   this.cardPosArr[1].top + 'px';

        this.cardItems[3].style.left =  this.cardPosArr[4].left +'px';
        this.cardItems[3].style.top =   this.cardPosArr[4].top + 'px';

        this.cardItems[4].style.left =  this.cardPosArr[5].left +'px';
        this.cardItems[4].style.top =   this.cardPosArr[5].top + 'px';

        this.cardItems[5].style.left =  this.cardPosArr[2].left +'px';
        this.cardItems[5].style.top =   this.cardPosArr[2].top + 'px';
        break;

    }
    

  }
  setLayout(){//布局转换。
      var cardItems = this.refs['g-cards-C'].querySelectorAll('li');
      this.cardItems = cardItems;
      this.cardPosArr = [];
      for(let i = 0 ; i < cardItems.length ; i ++){
          cardItems[i].index = i;
          var left = cardItems[i].offsetLeft,
              top = cardItems[i].offsetTop;

          this.cardPosArr.push({
            left:left,
            top:top
          });

          cardItems[i].style.left =  left +'px';
          cardItems[i].style.top =  top + 'px';

      }
      for(let i = 0 ; i < cardItems.length ; i ++){
          cardItems[i].style.position = 'absolute';
          cardItems[i].style.margin = 0;
      }
  }

  componentDidMount() {
    this.dealCard();
    this.setLayout();

    let {obserable} = this.props;

    /*setInterval(()=>{
        this.order();
    },200)*/




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

      if(!this.start){
          this.start = true;
           this.setState({
              currentSelectCardIndex:e
            },()=>{
               this.smallTiggers = this.smallTiggers || this.refs['g-tigger-list'].querySelectorAll('li');

              var obj = this.refs['g-cards-C'].querySelectorAll('li')[this.state.currentSelectCardIndex];

                      obj && obj.classList.add('active');

                      setTimeout(()=>{
                         this.setState({
                            currentData:this.cardsArr[this.state.currentSelectCardIndex]
                          },()=>{
                             // console.log(this.state.currentSelectCardIndex)
                              obj.classList.remove('active');
                              if(this.refs['g-result']){
                                  this.refs['g-result'].style.display = 'block'

                              }
                              var index =this.state.currentSelectCardIndex;
                              
                              var cardC = this.refs['g-cards-C'];
                                  var PTop = cardC.offsetTop,
                                      PLeft =cardC.offsetLeft;
                                  var target = cardC.querySelectorAll('li')[index];
                                   this.refs['g-result'].classList && this.refs['g-result'].classList.add('active');
                                   this.refs['g-result-C'].classList.add('active');
                                 
                                if(this.state.currentData && this.state.currentData.url){
                                  
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
            });
      }
     
      
      //this.refs[e].classList.toggle('active');

  }
}
export default FlyPublicComponent(FlyGameView);