import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Helmet from 'react-helmet';

import {
    Content,
    Canvas,
} from './styles.js';
// Math.pow(-1, Math.ceil(math.random()*1000)) * 4
// 生成一定范围内的随机数
function rand(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}
// 碰撞函数
function collide(obj1, obj2) {
    const l1 = obj1.x;
    const r1 = l1 + obj1.width;
    const t1 = obj1.y;
    const b1 = t1 + obj1.height;
    const l2 = obj2.x;
    const r2 = l2 + obj2.width;
    const t2 = obj2.y;
    const b2 = t2 + obj2.height;
    if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
        return true;
    } else {
        return false;
    }
}
// 构造食物对象
function Dian(windowWidth, windowHeight) {
    this.x = rand(0, windowWidth - 20);
    this.y = rand(0, windowHeight - 20);
    this.vx = Math.pow(-1, Math.ceil(Math.random()*1000)) * rand(1, 3);
    this.vy = Math.pow(-1, Math.ceil(Math.random()*1000)) * rand(1, 3);
    this.g = rand(0, 4);
    let w = rand(10, 20);

    this.angle = 2 * Math.PI / 360 * rand(0, 360);
    this.width = w;
    this.height = w;
    this.color = `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`;
    this.reset = function() {
        this.x = rand(0, windowWidth);
        this.y = rand(0, windowHeight);
        this.color = `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`;
    };
}
class MoveCanvas extends PureComponent {
    state = {
        dianArr: [],
        canvasWidth: 0,
        canvasHeight: 0,
    }
    componentDidMount() {
        const dom = document.getElementById('moveCanvas');
        const ctx = dom.getContext('2d');
        // const width = ctx.canvas.width;
        // const height = ctx.canvas.height;
        this.ratio = ctx.canvas.width / 200;
        this.ctx = dom.getContext('2d');
        const arr = [];
        // 生成随机的20个点
        for (let i = 0; i < 40; i += 1) {
            const dianObj = new Dian($(this.content).width(), $(this.content).height());
            arr.push(dianObj);
        }
        // 保存20个点的数据，并画出
        this.setState({ dianArr: arr }, () => {
            this.moveFunc();
            this.timer = setInterval(this.moveFunc, 100);
        });
        
        
        
    }
    draw = (ctx, obj) => {
        this.ctx.save();
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.shadowOffsetX=5;
        ctx.shadowOffsetY=5;
        ctx.shadowBlur=5;
        ctx.shadowColor="rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.moveTo(obj.x, obj.y + obj.width / 2);
        ctx.lineTo(obj.x + obj.width, obj.y + obj.width / 2);
        ctx.moveTo(obj.x + obj.width / 2, obj.y);
        ctx.lineTo(obj.x + obj.width / 2, obj.y + obj.height);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, 2, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        this.ctx.restore();
    }
    moveFunc = () => {
        this.updateSite();
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        for ( let i = 0; i < this.state.dianArr.length; i += 1 ) {
            const dianObj = this.state.dianArr[i];
            this.draw(this.ctx, dianObj);
        }
        this.ctx.restore();
    }

    updateSite = () => {
        let arr = this.state.dianArr;
        for (let i = 0; i < arr.length; i += 1) {
            arr[i].x += arr[i].vx;
            arr[i].y += arr[i].vy;

            if (arr[i].x < 0) {
                arr[i].x = 0;
                arr[i].vx = -arr[i].vx;
            } else if (arr[i].x > this.ctx.canvas.width - arr[i].width) {
                arr[i].x = this.ctx.canvas.width - arr[i].width;
                arr[i].vx = -arr[i].vx;
            }
            if (arr[i].y < 0) {
                arr[i].y = 0;
                arr[i].vy = -arr[i].vy;
            } else if (arr[i].y > this.ctx.canvas.height - arr[i].height) {
                arr[i].y = this.ctx.canvas.height - arr[i].height;
                arr[i].vy = -arr[i].vy;
            }
            for (let j = 0; j < arr.length; j += 1) {
                if (collide(arr[i], arr[j]) && i !== j) {
                    /*arr[i].vx = Math.pow(-1, Math.ceil(Math.random()*1000)) * rand(1, 3);
                    arr[i].vy = Math.pow(-1, Math.ceil(Math.random()*1000)) * rand(1, 3);
                    arr[j].vx = Math.pow(-1, Math.ceil(Math.random()*1000)) * rand(1, 3);
                    arr[j].vy = Math.pow(-1, Math.ceil(Math.random()*1000)) * rand(1, 3);*/
                    /*arr[i].vx = -arr[i].vx;
                    arr[i].vy = -arr[i].vy;
                    arr[j].vx = -arr[j].vx;
                    arr[j].vy = -arr[j].vy;*/
                }
            }
        }
        this.setState({ dianArr: arr });
    }
    
    render() {
        return(
            <Content innerRef={(ref) => { this.content = ref; }}>
                <Helmet title="动画" />
                <Canvas id="moveCanvas" height={$(this.content).height()} width={$(this.content).width()} />
            </Content>
        );
    }
}
MoveCanvas.propTypes = {
    history: PropTypes.object,
};
export default MoveCanvas;