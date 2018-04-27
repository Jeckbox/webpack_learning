import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import $ from 'jquery';
import Helmet from 'react-helmet';

import {
    Content,
    Canvas,
} from './styles.js';

class CountDown extends PureComponent {
    componentDidMount() {
        const dom = document.getElementById('countDown');
        const ctx = dom.getContext('2d');
        const width = ctx.canvas.width;
        // const height = ctx.canvas.height;
        this.ratio = ctx.canvas.width / 200;
        this.ctx = dom.getContext('2d');
        this.r = width / 2;
        this.clockMove();
        this.timer = setInterval(this.clockMove, 1000);
        /*$.ajax({
            type: "GET",
            async: true,
            dataType: "json",
            url: "http://118.89.39.101:5000/getData",
            success: function(data){
                if(data.result == 0){
                    this.setState({
                        vcodePath: data.vcodePath,
                        default_vcode: data.vcode
                    });
                }
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }.bind(this)
        });*/
        fetch("http://118.89.39.101:5000/getData",{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            throw err;
        });
    }
    timer;
    ctx;
    r;
    ratio;
    drawbackground = (ctx, r) => {
        ctx.save();
        ctx.translate(r, r);
        ctx.beginPath();
        ctx.lineWidth = 10 * this.ratio;
        ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
        ctx.stroke();

        let hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        ctx.font = `${18 * this.ratio}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        hourNumber.forEach((number, i) => {
            const rad = 2 * Math.PI / 12 * i;
            const x = Math.cos(rad) * (r - 30 * this.ratio);
            const y = Math.sin(rad) * (r - 30 * this.ratio);
            ctx.fillText(number, x, y);
        });

        for (let i = 0; i < 60; i += 1) {
            const rad = 2 * Math.PI / 60 * i;
            const x = Math.cos(rad) * (r - 18 * this.ratio);
            const y = Math.sin(rad) * (r - 18 * this.ratio);
            ctx.beginPath();
            if (i % 5 === 0) {
                ctx.fillStyle = '#000';
                ctx.arc(x, y, 2 * this.ratio, 0, 2 * Math.PI, false);
            }  else {
                ctx.fillStyle = '#ccc';
                ctx.arc(x, y, 2 * this.ratio, 0, 2 * Math.PI, false);
            }
            ctx.fill();
        }
    }
    drawHour = (ctx, hour, r, minute) => {
        ctx.save();
        ctx.beginPath();
        const rad = 2 * Math.PI / 12 * hour;
        const mrad = 2 * Math.PI / 12 / 60 * minute;
        ctx.rotate(rad + mrad);
        ctx.lineCap = 'round';
        ctx.lineWidth = 6 * this.ratio;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r / 2 + 10);
        ctx.stroke();
        ctx.restore();
    }
    drawMinute = (ctx, minute, r, second) => {
        ctx.save();
        ctx.beginPath();
        const rad = 2 * Math.PI / 60 * minute;
        const srad = 2 * Math.PI / 60 / 60 * second;
        ctx.rotate(rad + srad);
        ctx.lineCap = 'round';
        ctx.lineWidth = 4 * this.ratio;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r / 2);
        ctx.stroke();
        ctx.restore();
    }
    drawSecond = (ctx, second, r) => {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#c14543";
        var rad = 2 * Math.PI / 60 * second;
        ctx.rotate(rad);
        ctx.moveTo(-2 * this.ratio, 20);
        ctx.lineTo(2 * this.ratio, 20);
        ctx.lineTo(1, -r + 18 * this.ratio);
        ctx.lineTo(-1, -r + 18 * this.ratio);
        ctx.fill();
        ctx.restore();
    }
    drawDot = (ctx) => {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(0, 0, 3 * this.ratio, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
    }
    clockMove = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.drawbackground(this.ctx, this.r);
        const today = new Date();
        this.drawHour(this.ctx, today.getHours(), this.r, today.getMinutes());
        this.drawMinute(this.ctx, today.getMinutes(), this.r, today.getSeconds());
        this.drawSecond(this.ctx, today.getSeconds(), this.r);
        this.drawDot(this.ctx);
        this.ctx.restore();
    }
    render() {
        return(
            <Content>
                <Helmet title="倒计时" />
                <Canvas id="countDown" height="500px" width="500px" />
            </Content>
        );
    }
}
CountDown.propTypes = {
    history: PropTypes.object,
};
export default CountDown;