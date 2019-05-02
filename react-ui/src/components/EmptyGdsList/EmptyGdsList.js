import React from 'react';
import {NavLink} from "react-router-dom";
import styled, {keyframes} from "styled-components";

export default () => {
  return (
    <Container>
      <Heading>Товар не найден</Heading>
      <Text>Товар с такой категорией не существует</Text>
      <Links>
        Посмотреть все <Link to={"/catalog"}>товары</Link>
      </Links>
    </Container>
  )
}

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 60px - 63px);
    justify-content: center;
    align-items: center;
    align-self: center;
    animation: ${fade} 0.7s ease-in-out;
    padding: 15px;
  `;

const Heading = styled.strong`
    font-size: 40px;
    font-weight: 700;
    color: #444;
    margin-bottom: 20px;
    text-align: center; 
  `;

const Text = styled.div`
    text-align: center;
    font-size: 20px;
    color: #444;
    margin-bottom: 20px;
  `;

const Links = styled.div`
    text-align: center;
    font-size: 16px;
    color: #888;
    font-weight: 600;
  `;

const Link = styled(NavLink)`
    text-align: center;
    font-size: 16px;
    color: #8CDB90;
    font-weight: 600;
    transition: 0.5s;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding: 0 3px 1px;
    cursor: pointer;
    
    :hover {
    border-color: #8CDB90;
    opacity: 0.85;
    }
  `;
