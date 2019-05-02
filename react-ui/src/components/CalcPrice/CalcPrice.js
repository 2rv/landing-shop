import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {cart as Cart, fillForm, sendForm} from "../../actions";
import CartList from "../CartList/CartList";
import Form from "../Form/Form";
import EmptyCart from "../EmptyCart/EmptyCart";
import {Redirect} from "react-router-dom";


class CalcPrice extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart.data,
      isSent: false
    }
  }


  static propTypes = {
    fillForm: PropTypes.func.isRequired,
    sendForm: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    toggleCart: PropTypes.func.isRequired,
    loadCart: PropTypes.func.isRequired
  };

  static defaultProps = {
    formText: {
      name: {
        title: "Ваше имя",
        error: "Укажите правильно свое имя",
        type: "INPUT",
      },
      surname: {
        title: "Ваша фамилия",
        error: "Укажите правильно свою фамилию",
        type: "INPUT",
      },
      email: {
        title: "Ваша почта",
        error: "Укажите правильно свою почту",
        type: "INPUT",
      },
      phone: {
        title: "Ваш телефон",
        error: "Укажите правильно свой телефон",
        type: "INPUT",
      },
      file: {
        title: "Загрузите эскиз",
        error: "Файл некорректный",
        type: "FILE",
      },
      sizes: {
        title: "Размеры Д/Ш/Т в мм",
        error: "Введите нужные размеры",
        type: "INPUT",
      },
      message: {
        title: "Ваше сообщение",
        error: "Введите ваше сообщение",
        type: "TEXTAREA",
      },
    }
  };

  handleSend = (form) => {
    const {cart} = this.props;
    if(cart.added.length > 0) {
      this.props.sendForm(form, ()=> {
        this.setState({isSent: true});
      }, cart);
    }
  };

  toggleGds = (gds) => {
    this.props.toggleCart(this.props.cart, gds);
  };

  componentWillMount() {
    window.scrollTo({
      top: -document.body.scrollHeight,
      behavior: 'smooth',
    });
    this.props.loadCart();
    this.props.fillForm();
  }

  render() {

    const {added} = this.props.cart;
    const {isLoaded, isSent, notValid} = this.props.form;
    const {form, formText, fillForm} = this.props;
    const cart = this.state.cart;

    return (
      <React.Fragment>
        {
          this.state.isSent ?
          <Redirect to={{
            pathname: "/successfully",
            state: {isSent}
          }}/>
          :
          <Container>
            {
              cart.length === 0 ?
                <EmptyCart/>
                :
                <Content>
                  <CartBlock>
                    <CartList
                      toggleGds={this.toggleGds}
                      added={added}
                      cart={cart}
                    />
                  </CartBlock>
                  <FormBlock>
                    {
                      isLoaded === true &&
                      <Form
                        title={"Оставить заявку"}
                        fillForm={fillForm}
                        sendForm={this.handleSend}
                        formText={formText}
                        form={form}
                        isSent={isSent}
                        notValid={notValid}>
                      </Form>
                    }
                  </FormBlock>
                </Content>
            }
          </Container>
        }
      </React.Fragment>
    );
  }

}

const mapStateToProps = store => {
  return {
    cart: store.cart,
    form: {
      all: store.fillForm,
      isLoaded: store.fillForm.isLoaded,
      isSent: store.fillForm.isSent,
      notValid: store.fillForm.notValid,
      inputs: [
        store.fillForm.name,
        store.fillForm.surname,
        store.fillForm.phone,
        store.fillForm.email,
        store.fillForm.sizes,
        store.fillForm.file,
        store.fillForm.message,
      ]
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCart: (cart, gds) => dispatch(Cart(cart, gds, "TOGGLE")),
    loadCart: () => dispatch(Cart(null, null, "LOAD")),
    fillForm: (name, value, all) => dispatch(fillForm(name, value, all)),
    sendForm: (form, next, cart) => dispatch(sendForm(form, next, cart)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalcPrice);

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    animation: ${fade} 0.5s ease-in-out;
    transition: 0.7s;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    padding-top: 62px;
    align-items: center;
  `;

const Content = styled.div`
    padding: 60px 20px;
    display: flex;
    align-items: flex-start;
    max-width: 1300px;
    
    @media all and (max-width: 900px) {
      flex-direction: column;
    }
  `;

const CartBlock = styled.div`
    flex-grow: 1;
    margin-right: 20px;
    
    @media all and (max-width: 900px) {
      width: 100%;
    }
  `;

const FormBlock = styled.form`
    width: 60%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 5px;
    animation: ${fade} 1.2s ease-in-out;
    
    @media all and (max-width: 480px) {
      padding: 20px;
    }
    
    @media all and (max-width: 900px) {
      width: 100%;
    }
  `;
