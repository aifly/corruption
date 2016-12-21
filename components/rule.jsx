import React, { Component } from 'react';

export default class FlyRule extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	ruleShow:false
	  };
	}
	render() {
		return (
			 <div className='g-rule-C' style={{zIndex:this.state.ruleShow?999999:-1,opacity:this.state.ruleShow?1:0}}>
         <div className={'g-rule-container ' + (this.state.ruleShow?'active':'')}>
              <h2 className='g-rule-header'onTouchTap={()=>{this.setState({ruleShow:false})}}>&times;</h2>
              <div className='g-rule-body'>
                <h2 className='g-rule-title'>规则说明</h2>
                <h2 className='g-game-rule-t'><i>游戏规则:</i></h2>
                <div className='g-game-rule'>每组5轮，每轮都有2张“老虎牌”和4张空牌，用户抽中老虎牌计5分，没抽中不计分。</div>
                <div className='g-rule-line'></div>
                <h2 className='g-game-draw-title'><i>抽奖规则:</i></h2>
                <div className='g-game-draw-content'> 2016年12月25日从所有参加游戏的玩家中随机抽取100名</div>
                <div className='g-draw-items'>奖项如下:</div>
                <ul className='g-draw-list'>
                    <li>一等奖1名：每位获奖用户各获得<span>iPhone6s 1个</span></li> 
                    <li>二等奖3名：每位获奖用户各获得<span>赛睿键盘1个</span></li> 
                    <li>三等奖5名：每位获奖用户各获得<span>硕美科耳机1个</span></li> 
                </ul>
              </div>
            </div>
      </div>
		);
	}
	componentDidMount() {
		let {obserable} = this.props;
		obserable.on('openRule',()=>{
			this.setState({ruleShow:true});
		});
	}
}
