import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getGds, cart as Cart} from "../../actions";
import PropTypes from "prop-types";
import Gds from "../Gds/Gds";


class GdsList extends PureComponent {

  static propTypes = {
    getGds: PropTypes.func.isRequired,
    gds: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    toggleCart: PropTypes.func.isRequired,
    loadCart: PropTypes.func.isRequired
  };

  toggleGds = (gds) => {
    this.props.toggleCart(this.props.cart, gds);
  };

  addGds = (gds) => {
    this.props.addToCart(this.props.cart, gds);
  };

  componentWillMount() {
    this.props.loadCart();
  }

  render() {

    const {isLoading, data} = this.props.gds;

    return (
      <>
        {
          isLoading === false ?
          <Container>
            <Content>
              {
                data.map((obj, index)=> {
                  let isAdded = false;
                  this.props.cart.added.forEach((id)=> {
                    if(id === obj.id) {
                      isAdded = true;
                      return true;
                    }
                  });

                  return (
                    <React.Fragment key={index}>
                      <Gds
                        isAdded={isAdded}
                        gds={obj}
                        toggleGds={this.toggleGds}
                        addGds={this.addGds}/>
                    </React.Fragment>
                  )
                })
              }
            </Content>
          </Container>
            :
          <Container>
            <Loading className="preloader">
              <svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45"/>
              </svg>
            </Loading>
          </Container>
        }
      </>
    );
  }

}

const mapStateToProps = store => {
  return {
    gds: store.getGds,
    cart: store.cart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getGds: (filter) => dispatch(getGds(filter)),
    addToCart: (cart, gds) => dispatch(Cart(cart, gds, "ADD")),
    toggleCart: (cart, gds) => dispatch(Cart(cart, gds, "TOGGLE")),
    loadCart: () => dispatch(Cart(null, null, "LOAD")),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GdsList));

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    display: flex;
    padding: 0 20px;
    justify-content: center;
    margin-bottom: 100px;
    width: 100%;
    
  `;

const Loading = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    animation: ${fade} 0.7s ease-in-out;

    
  `;

const Content = styled.div`
  
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(33.3% - (40px / 2) ), 1fr));
    grid-template-rows: auto;
    grid-template-areas: ". . .";
    gap: 20px;
    
    
    @media all and (max-width: 720px) {
      grid-template-columns: 1fr;
      grid-template-areas: ".";
    }
    
    @media all and (min-width: 720px) and (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
      grid-template-areas: ". .";
    }
  `;

