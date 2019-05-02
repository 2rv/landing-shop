import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class ScrollIndicator extends PureComponent {

  render() {
    const {oldOffset} = this.props;
    const {pathname} = this.props.location;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (oldOffset / height) * 100;

    const isTransparent = oldOffset < 100 && pathname === "/home";


    return (
      <Container className={isTransparent && "transparent"}>
        <Line style={{width: scrolled + "%"}}/>
      </Container>
    );
  }

}

const mapStateToProps = store => {
  return {
    scrollingDirection: store.scrollingPage.scrollingDirection,
    oldOffset: store.scrollingPage.oldOffset
  }
};
export default withRouter(connect(mapStateToProps)(ScrollIndicator))

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    animation: ${fade} 1s ease-in-out;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    height: 2px;
    width: 100%;
    background-color: #fff;
    
    &.transparent {
      display: none;
    }
    
  `;

const Line = styled.div`
    background-color: #8CDB90;
    height: 100%;
    
  `;
