import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import Slider from "../Slider/Slider";
import Greeting from "../Greeting/Greeting";
import Offer from "../Offer/Offer";
import About from "../About/About";


class Home extends PureComponent {

  render() {


    return (
      <Container>
        <Slider/>
        <Greeting/>
        <Offer/>
        <About/>
      </Container>
    );
  }

}

export default Home

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    animation: ${fade} 0.5s ease-in-out;
  `;

