import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import {connect} from "react-redux";
import {fillForm, sendForm} from "../../actions";
import PropTypes from "prop-types";
import Form from "../Form/Form";
import {Redirect} from "react-router-dom";
import img from "./img.jpg";

class ContactsComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      focused: null,
      isSent: false
    }
  }


  static propTypes = {
    fillForm: PropTypes.func.isRequired,
    sendForm: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
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
      message: {
        title: "Ваше сообщение",
        error: "Введите ваше сообщение",
        type: "TEXTAREA",
      },
    }
  };

  componentWillMount() {
    window.scrollTo({
      top: -document.body.scrollHeight,
      behavior: 'smooth',
    });

    this.props.fillForm();
  }

  handleOnSend = (inputs) => {
    this.props.sendForm(inputs, ()=> {
      this.setState({isSent: true})
    });
  };

  render() {

    const {isLoaded, isSent, notValid} = this.props.form;
    const {form, formText, fillForm} = this.props;

    return (
      <React.Fragment>
        {
          this.state.isSent ?
            <Redirect to={{
              pathname: "/successfully",
              state: {isSent: isSent}
            }}/>
            :
            <Container>
              <Content >
                <Overlay/>
                <FormBlock>
                  {
                    isLoaded === true &&
                    <Form
                      title={"Свяжитесь с нами"}
                      fillForm={fillForm}
                      sendForm={this.handleOnSend}
                      formText={formText}
                      form={form}
                      isSent={isSent}
                      notValid={notValid}>
                      <Contacts>
                        {
                          [
                            "+1 (234) 567 89 10",
                            "spacedesign@mail.com",
                            "Austria, Grimminggasse 5",

                          ].map((text, index)=>
                            <Contact key={index}>{text}</Contact>
                          )
                        }
                      </Contacts>
                    </Form>
                  }
                </FormBlock>
              </Content>
              <Map src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24601136.19355323!2d-73.83527415572621!3d67.89275028980938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ea20dbbe3c07715%3A0x34cf9d830114e218!2z0JPRgNC10L3Qu9Cw0L3QtNC40Y8!5e0!3m2!1sru!2sua!4v1556756932272!5m2!1sru!2sua"
                   width="600" height="450" frameBorder="0" style={{border: 0}}
                   allowFullScreen={true}/>
            </Container>

        }
      </React.Fragment>
    );
  }

}

const mapStateToProps = store => {
  return {
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
        store.fillForm.message,
      ]
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fillForm: (name, value, all) => dispatch(fillForm(name, value, all)),
    sendForm: (form, next) => dispatch(sendForm(form, next)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsComponent)

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    animation: ${fade} 0.7s ease-in-out;
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

  `;


const Content = styled.div`
    background-image: url(${img});
    background-position: 50% 50%;
    -webkit-background-size: cover;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.15);
    position: relative;
    padding: 0 40px;

    @media all and (max-width: 620px) {
      padding: 20px;
    }
  `;

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.15);
  `;

const FormBlock = styled.form`
    margin: 120px 0;
    display: flex;
    width: 100%;
    max-width: 700px;
    flex-direction: column;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    position: relative;
    z-index: 1;
    animation: ${fade} 1s ease-in-out;

    @media all and (max-width: 480px) {
      padding: 20px;
    }
  `;

const Map = styled.iframe`
  height: 100vh;
  width: 100%;
  border: 0;
  background-color: #fff;
  padding-top: 122px;
  box-shadow: none;
`;


const Contacts = styled.div`
  padding-top: 15px;
  margin-top: 35px;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media all and (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 25px;
  }
`;

const Contact = styled.div`
  font-size: 16px;
  color: #888;
  line-height: 1.5em;

  @media all and (max-width: 640px) {
    margin-right: 30px;
    margin-bottom: 5px;
  }

  @media all and (max-width: 400px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 5px;
  }
`;
