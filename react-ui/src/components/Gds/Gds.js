import React from 'react';
import styled, {keyframes} from 'styled-components'
import {NavLink} from "react-router-dom";

export default ({isAdded, gds, toggleGds, addedOpacity, addGds = null}) => {
  return (
    <Product className={addedOpacity && !isAdded && "removed"}>
      <Image backgroundImage={gds.img}/>
      <Inside>
        <Name>{gds.name}</Name>
        <Info>{gds.info}</Info>
        <Buttons>
          <Add
            className={isAdded && "active"}
            onClick={()=> {toggleGds(gds)}}>+</Add>
          {
            addGds !== null && <Pay onClick={()=> {addGds(gds)}} to={"/calc"}>Рассчет стоимости</Pay>
          }
        </Buttons>
      </Inside>
    </Product>
  )
}

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Inside = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 100%;
    background: radial-gradient(258.00px at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    opacity: 0;
    transition: 0.7s; 
    padding: 20px;
    flex-direction: column;
    
    @media all and (max-width: 480px) {
      padding: 15px;
    }
  `;

const Product = styled.div`
    display: flex;
    height: 300px;
    position: relative;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    transition: 0.7s;
    animation: ${fade} 1.5s;
    
    &:not(:last-of-type) {
      margin-bottom: 20px;
    }
    
    &.removed {
    opacity: 0.6;
    }
    
    &:hover {
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      
      ${Inside} {
        opacity: 1;
      }
    }
  `;

const Image = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => `url("${props.backgroundImage}")`};
    -webkit-background-size: cover;
    background-size: cover;
    background-position: 50% 50%;
  `;

const Name = styled.strong`
    color: #fff;
    font-family: "Lora",serif;
    font-size: 32px;
    margin-bottom: 10px;
    
  `;

const Info = styled.p`
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    flex-grow: 1;
    
  `;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-start;
    
  `;

const Add = styled.div`
    width: 40px;
    height: 40px;
    font-weight: 800;
    font-size: 26px;
    line-height: 35px;
    text-align: center;
    border: 2px solid #8CDB90;
    color: #8CDB90;
    border-radius: 30px;
    margin-right: 10px;
    cursor: pointer;
    transition: 0.7s;
    
    &:hover {
      opacity: 0.9;
    }
    
    &.active {
      background-color: #8CDB90;
      color: #fff;
    }
  `;

const Pay = styled(NavLink)`
    text-decoration: none;
    height: 40px;
    padding: 0 20px;
    border-radius: 40px;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    border: 2px solid #8CDB90;
    color: #8CDB90;
    cursor: pointer;
    transition: 0.7s;
    font-size: 16px;
    
    &:hover {
      background-color: #8CDB90;
      color: #fff;
    }
  `;
