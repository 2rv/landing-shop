import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getServices} from "../../actions";
import {NavLink} from "react-router-dom";


class Services extends PureComponent {

  static propTypes = {
    getServices: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.getServices();
  }

  render() {
    const {isLoading, data} = this.props.services;

    return (
      <Container style={{boxShadow: isLoading && "inset 0 0 50px rgba(0, 0, 0, 0.2)"}}>
        {
          isLoading === false &&
          data.map(({title, info, img}, index)=>
            <Content key={index}>
              <Image order={index+1} backgroundImage={img}/>
              <Block>
                <Title>{title}</Title>
                <Text>{info}</Text>
                <Button to={"/contacts"}>Заказать услугу</Button>
              </Block>
            </Content>
          )
        }
      </Container>
    );
  }

}

const mapStateToProps = store => {
  return {
    services: store.getServices,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getServices: () => dispatch(getServices()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    animation: ${fade} 0.5s ease-in-out;
    transition: 0.7s;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 62px;
  `;

const Content = styled.div`
    animation: ${fade} 1.2s ease-in-out;
    width: 100%;
    min-height: calc(100vh - 60px);
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    position: relative;
    
    @media all and (max-width: 720px) {
      margin-bottom: 100px;
    }
  `;

const Image = styled.div`
    width: 50%;
    background-image: ${props => `url("${props.backgroundImage}")`};
    background-position: 50% 50%;
    -webkit-background-size: cover;
    background-size: cover;
    order: ${({order}) => {
      if(order % 2 === 0) return 1;
      else return -1 
    }};
    
    @media all and (max-width: 720px) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;

const Block = styled.div`
    width: 50%;
    min-height: 100%;
    padding: 25px 60px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    z-index: 1;
    
    @media all and (max-width: 720px) {
      width: 100%;
      padding: 50px 15px;
      background-color: rgba(0,0,0,0.3);
    }
  `;

const Title = styled.strong`
    font-family: "Lora",serif;
    color: #444;
    font-size: 35px;
    font-weight: 400;
    margin-bottom: 25px;
    
    @media all and (max-width: 720px) {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
    }
  `;

const Text = styled.p`
    font-size: 18px;
    color: #444;
    line-height: 1.4em;
    
    @media all and (max-width: 720px) {
      color: #fff;
      font-size: 16px;
      line-height: 1.5em;
      font-weight: 600;
    }
  `;

const Button = styled(NavLink)`
    text-decoration: none;
    height: 45px;
    padding: 0 30px;
    border-radius: 40px;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    border: 1px solid #8CDB90;
    color: #8CDB90;
    cursor: pointer;
    transition: 0.7s;
    font-size: 16px;
    margin-top: 25px;
    
    &:hover {
      background-color: #8CDB90;
      color: #fff;
    }
  `;

