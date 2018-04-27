import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Content = styled.div`
    width: 200px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    color: black;
    box-shadow: 5px 0px 5px rgba(44, 44, 44, 0.5);
    background: #efefef;
`;
const Item = styled.div`
    width: 100%;
    height: 48px;
    color: rgba(0, 0, 0, 0.76);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    box-sizing: border-box;
    padding: 0 20px;
    border-bottom: 1px solid #999999;
    cursor: pointer;
    background: ${(props) => props.active ? '#dddddd' : '#efefef'};
    &:hover {
        background: #dddddd;
    }
`;

class LeftNav extends PureComponent {
    render() {
        return(
            <Content>
                <Item active={this.props.location.pathname === '/'} onClick={() => this.props.history.push('/')}>时钟</Item>
                <Item active={this.props.location.pathname === '/countdown'} onClick={() => this.props.history.push('/countdown')}>倒计时</Item>
                <Item active={this.props.location.pathname === '/movecanvas'} onClick={() => this.props.history.push('/movecanvas')}>canvas动画</Item>
            </Content>
        );
    }
}
LeftNav.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
export default  LeftNav;