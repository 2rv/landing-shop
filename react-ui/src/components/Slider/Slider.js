import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import {connect} from "react-redux";
import {getSlides} from "../../actions";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";


class Slider extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      limit: 0
    }
  }

  static propTypes = {
    slides: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.getSlides((length)=> {
      this.setState({limit: length});
      this.interval = setInterval(this.changeSlide, 5000)
    });
  }

  changeSlide = (index = null) => {
    this.setState(()=> {
      if(index !== null) {
        clearInterval(this.interval);
        this.interval = setInterval(this.changeSlide, 5000);
        return {active: index}
      } else if(index === null) {
        let {active, limit} = this.state;

        if(active === limit-1) {
          return {active: 0}
        } else {
          return {active: active + 1}
        }
      }
    })
  };


  render() {

    const {isLoading, data} = this.props.slides;

    return (
      <Container>
        {
          isLoading === false &&
          <React.Fragment>
            <Content>
              {
                data.map((slide, index)=>
                  <React.Fragment key={index}>
                    { this.state.active === index &&
                    <Block>
                      <Image backgroundImage={slide.img}/>
                      <Overlay/>
                      <Title>
                        <Heading>{slide.text}</Heading>
                        <Button to="/catalog">Заказать</Button>
                      </Title>
                    </Block>
                    }
                  </React.Fragment>
                )
              }
            </Content>
            <Switches>
              {
                data.map((slide,index)=>
                  <Switch
                    key={index}
                    className={this.state.active === index && "active"}
                    onClick={()=> {this.changeSlide(index)}}/>
                )
              }
            </Switches>
          </React.Fragment>
        }
      </Container>
    );
  }

}

const mapStateToProps = store => {
  return {
    slides: store.getSlides,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getSlides: (next) => dispatch(getSlides(next)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);

  const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

  const Container = styled.div`
    width: 100%;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 100vh;
  `;

  const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  `;

  const Block = styled.div`
    min-height: 100vh;
    width: 100%;
    animation: ${fade} 0.5s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `;

  const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 100px;
    width: 100%;
    text-align: center;
    
    @media all and (max-width: 720px) {
      padding: 100px 15px;
    }
  `;

  const Heading = styled.div`
    font-family: "Lora", serif;
    font-weight: 700;
    font-size: 40px;
    color: #fff;
    margin-bottom: 30px;
    
    @media all and (max-width: 480px) {
    font-size: 32px;
    }

  `;

  const Button = styled(NavLink)`
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 18px;
    border-radius: 40px;
    background-color: #8CDB90;
    color: #fff;
    font-weight: 600;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: 0.7s;
    text-decoration: none;
    
    &:hover {
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
      position: relative;
    }
  `;

  const Image = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    -webkit-background-size: cover;
    background-image: ${props => "url("+props.backgroundImage+")"};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    
  `;

  const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.25);
  `;

  const Switches = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 30px;
    left: 0;
  `;

  const Switch = styled.div`
    margin: 0 8px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background-color: #fff;
    opacity: 0.7;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    &.active {
    opacity: 1;
    }
    
    &:hover:not(&.active) {
      opacity: 0.9;
    }
    
  `;
