import React from 'react';
import {NavLink} from "react-router-dom";
import styled, {keyframes} from "styled-components";
import img from "./img.jpg"

export default ()=> {

  const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

  const Container = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    margin-top: 80px;
  `;

  const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    animation: ${fade} 0.7s ease-in-out;
    padding: 0 20px;
    max-width: 1300px;
  `;

  const Image = styled.div`
    min-width: 50%;
    min-height: 400px;
    background-image: url(${img});
    background-position: 50% 50%;
    -webkit-background-size: cover;
    background-size: cover;
    margin-right: 60px;
    
    @media all and (max-width: 860px) {
      display: none;
    }
  `;

  const Block = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100%;
    align-items: flex-start;
  `;

  const Heading = styled.h1`
    font-size: 32px;
    color: #444;
    font-weight: 400;
    font-family: "Lora",serif;
    margin-bottom: 35px;
    line-height: 1.3em;
    
  `;

  const Text = styled.p`
    margin-bottom: 25px;
    font-size: 18px;
    line-height: 1.3em;
    color: #555;
    font-weight: 500;
    
  `;

  const Button = styled(NavLink)`
    padding: 0 30px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
    border: 1px solid #8CDB90;
    color: #8CDB90;
    cursor: pointer;
    font-weight: 600;
    transition: 0.7s;
    text-decoration: none;
    
    &:hover {
      background-color: #8CDB90;
      color: #fff;
      box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.07);
    }
  `;



  return (
    <Container>
      <Content>
        <Image/>
        <Block>
          <Heading>Мастерская авторской мебели  <br/>  Space Design </Heading>
          <Text>
            Если Вам хочется создать неповторимое пространство, в котором будет комфортно находиться,
            то смело обращайтесь в мастерскую Space Design.
            Наша команда поможет воплотить Ваши самые смелые задумки в жизни.
          </Text>
          <Text>
            Наша миссия - создание экологичного интерьер пространства в каждом Доме.
          </Text>
          <Button to="/catalog">Заказать сейчас</Button>
        </Block>
      </Content>
    </Container>
  )

};
