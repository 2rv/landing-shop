import React, {PureComponent} from 'react';
import styled, {keyframes} from "styled-components";
import {doAuth} from "../../actions";
import {connect} from "react-redux";

class Auth extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      login: this.props.login,
      password: this.props.password,
    }
  }

  handleChange = (value, name) => {
    this.setState({[name]: value})
  };

  handleSubmit = () => {
    this.props.doAuth({
      login: this.state.login,
      password: this.state.password
    })
  };

  render() {
    return (
      <Container>
        <Content>
          <Input value={this.state.login} onChange={(e) => {this.handleChange(e.target.value, "login")}} type="text"/>
          <Input value={this.state.password} onChange={(e) => {this.handleChange(e.target.value, "password")}} type="text"/>
          <Button onClick={() => this.handleSubmit()}>Войти</Button>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = store => {
  return {
    login: store.doAuth.login,
    password: store.doAuth.password,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doAuth: (data) => dispatch(doAuth(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);


const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 600px;
  `;

const Input = styled.input`
  margin-bottom: 10px;
  border: 1px solid #ddd;
  height: 40px;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  color: #444;
`;

const Button = styled.button`
  margin-top: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  color: #444;
`;
