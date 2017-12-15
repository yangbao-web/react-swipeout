import React, { Component } from 'react';
import './Swipeout.css';

class Swipeout extends Component {

  constructor(props) {
    super(props);
    this._btnWidth = props.btnWidth || 80;
  }

  slideOut(e) {
    let t = this;
    if (t._lastTarget) {
      let target = e.target;
      while (target && target.classList && !target.classList.contains('swipeout-item')) {
        target = target.parentNode;
      }
      t.transform('end', t._lastTarget, 0);
      t._diff = 0;
    }
  }
  handleTouchStart(e){
    let t = this;
    t.slideOut(e);
    let touch = e.touches[0];
    let target = touch.target;
    t._touchX = touch.clientX;
    t._touchY = touch.clientY;
    t._lastX = t._touchX;
    console.log(t._touchX, t._touchY);
    while (target && target.classList && !target.classList.contains('swipeout-item')) {
      target = target.parentNode;
    }
    if (target && target.style) {
      t._target = target;
      // t.state.distance = target.dataset.distance === undefined ? t.props.btnWidth : +target.dataset.distance;
    } else {
        t._target = null;
    }
  }
  handleTouchMove(e){
    let t = this;
    if(t._lastTarget){
      return;
    }
    let touch = e.touches[0];
    t._diff = touch.clientX - t._touchX;
    // t._lastX = touch.clientX;
    if(t._diff >= 0){
      t._diff = 0;
    }else if(t._diff <= -t._btnWidth){
      t._diff = -t._btnWidth;
    };
    t.transform('move', t._target, t._diff);
  }
  handleTouchEnd(e){
    let t = this;
    // if(t._lastTarget){
    //   return;
    // }
    if(t._diff <= -t._btnWidth/3){
      t._lastTarget = t._target;//打开的滑块
      t.transform('end', t._target, -t._btnWidth);
    }else{
      t._lastTarget = null;
      t.transform('end', t._target, 0);
    }
  }
  transform(type, target, width){
    if(type === 'end'){
      target.style.transition = 'transform 0.3s ease';
    }else{
      target.style.transition = 'none';
    };
    target.style.transform = `translate3d(${width}px, 0, 0)`;
    target.style.WebkitTransform = `translate3d(${width}px, 0, 0)`;
  }
  handleClick(){
    // let t = this;
    // t.transform('end', t._target, 0);
  }
  render() {
    let t = this;
    return (
      <div className="swipeout">
        <div className="swipeout-slide"
          onClick={t.handleClick.bind(t)}
          onTouchStart={t.handleTouchStart.bind(t)}
          onTouchMove={t.handleTouchMove.bind(t)}
          onTouchEnd={t.handleTouchEnd.bind(t)}
          onTouchCancel={t.handleTouchEnd.bind(t)}>
          {
            [1, 2, 3].map((d, i) => {
              return <div key={d} className="swipeout-item">
                <div className="button-group">
                  <div className="left-btn">{`删除${d}`}</div>
                </div>
                <div className="swipeout-content" onClick={()=>{console.log(d)}}>{`内容${d}`}</div>
              </div>
            })
          }
          
        </div>
      </div>
    );
  }
}

export default Swipeout;
