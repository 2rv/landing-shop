import React, { Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";

import logo from '../../assets/logo.svg';
import './App.css';

import {change_text, change_name, do_fetch} from "../../actions";


class App extends Component {

  static defaultProps = {
    title: "React"
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  handleChange = () => {
    alert(this.props.title);
  };


  render() {
    console.log(this.props);

    return (
      <div className={"App"}>
        <header className={"Appheader"}>
          <div className="" onClick={this.handleChange}>{this.props.title}</div>
          <img src={logo}
               className={"Applogo"}
               alt="logo"
          />
          <p>
            <code
              onClick={()=> {this.props.changeName("New name") }}>src/App.js</code> {this.props.text}
          </p>
          <div
            className={"Applink"}
            onClick={() => {this.props.changeText("New text") }}
          >
            {this.props.name}
          </div>

          <div onClick={() => {this.props.doFetch(this.props.info) }}>{this.props.info}</div>


        </header>
      </div>
    );
  }

}



export default connect(mapStateToProps, mapDispatchToProps)(App);
