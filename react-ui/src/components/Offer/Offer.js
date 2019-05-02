import React from 'react';
import styled, {keyframes} from "styled-components";
import img_1 from "./img_1.jpg";
import img_2 from "./img_2.jpg";
import img_3 from "./img_3.jpg";
import img_4 from "./img_4.jpg";

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
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
  `;

  const Content = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: ". .";
    gap: 30px;
    animation: ${fade} 0.7s ease-in-out;
    padding: 0 20px;
    max-width: 1300px;
    
    @media all and (max-width: 1100px) {
      grid-template-columns: 1fr;
      grid-template-areas: ".";
    }
    
    @media all and (max-width: 600px) {
      padding: 10px;
    }
    
  `;

  const Block = styled.div`
    display: flex;
    height: 250px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
    transition: 0.7s;
    
    @media all and (max-width: 1100px) {
      height: auto;
    }
    
    &:hover {
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.09);
    }
  `;

  const Image = styled.div`
    width: 45%;
    background-image: ${props => `url("${props.image}")`};
    background-position: 50% 50%;
    -webkit-background-size: cover;
    background-size: cover;
    margin-right: 10px;
    
    @media all and (max-width: 600px) {
      display: none;
    }
  `;

  const Info = styled.div`
    width: 55%;
    padding: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    @media all and (max-width: 1100px) {
      padding: 25px;
    }
    
    @media all and (max-width: 600px) {
      width: 100%;
      padding: 20px;
    }
  `;

  const Heading = styled.h1`
    font-size: 27px;
    color: #444;
    font-weight: 400;
    font-family: "Lora",serif;
    margin-bottom: 15px;
    line-height: 1.3em;
    
  `;

  const Text = styled.p`
    font-size: 17px;
    line-height: 1.4em;
    color: #555;
    font-weight: 500;
    flex-grow: 1;
    
  `;

  const Title = styled.strong`
    font-size: 32px;
    margin-bottom: 40px;
    color: #666;
    font-family: "Lora",serif;
    text-align: center;
    
  `;




  return (
    <Container>
      <Title>Что мы предлагаем для Вас?</Title>
      <Content>
        {[{ image: img_1,
            heading: "Мебель из слэбов",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
              "Aliquam maximus lorem quis velit gravida blandit vel in odio. " +
              "In eu lacus lobortis, dignissim diam in, pretium urna."
          },
          {
            image: img_2,
            heading: "Светильники",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
              "Aliquam maximus lorem quis velit gravida blandit vel in odio. " +
              "In eu lacus lobortis, dignissim diam in, pretium urna."
          },
          {
            image: img_3,
            heading: "Изделия из металла",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
              "Aliquam maximus lorem quis velit gravida blandit vel in odio. " +
              "In eu lacus lobortis, dignissim diam in, pretium urna."
          },
          {
            image: img_4,
            heading: "Предметы декора",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
              "Aliquam maximus lorem quis velit gravida blandit vel in odio. " +
              "In eu lacus lobortis, dignissim diam in, pretium urna."
          }
          ].map((block, index)=>
            <Block key={index}>
              <Image image={block.image}/>
              <Info>
                <Heading>{block.heading}</Heading>
                <Text>{block.text}</Text>
              </Info>
            </Block>
          )
        }
      </Content>
    </Container>
  )

};
