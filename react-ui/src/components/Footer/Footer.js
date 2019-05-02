import React from 'react';
import styled, {keyframes} from "styled-components";

export default ()=> {

  const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

  const Footer = styled.footer`
    background-color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.04);
    color: #888;
    font-weight: 500;
    animation: ${fade} 1s ease-in-out;
    text-align: center;
    line-height: 1.3em;
    
    @media all and (max-width: 480px) {
      font-size: 13px;
    }
  `;

  return (
    <Footer>
      © Space Design. Все права защищены, 2019
    </Footer>
  )

};
