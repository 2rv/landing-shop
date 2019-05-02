import React, {Component} from 'react';
import { Provider } from 'react-redux'
import {store} from "./store/configureStore";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import './assets/reset.css';
import './assets/main.css';
import Header from "./components/Header/Header";
import ScrollListener from "./components/ScrollListener/ScrollListener";
import NoMatch from "./components/NoMatch/NoMatch";
import Footer from "./components/Footer/Footer";
import ScrollIndicator from "./components/ScrollIndicator/ScrollIndicator";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Services from "./components/Services/Services";
import Contacts from "./components/Contacts/Contacts";
import CalcPrice from "./components/CalcPrice/CalcPrice";
import FormSent from "./components/FormSent/FormSent";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      prevPath: ''
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={ store }>
          <ScrollListener>
            <ScrollIndicator/>
            <Header/>

            <Switch >
              <Route exact path="/home" component={Home}/>
              <Route exact path="/catalog/:filter" component={Catalog}/>
              <Route exact path="/services" component={Services}/>
              <Route exact path="/calc" component={CalcPrice}/>
              <Route exact path="/contacts" component={Contacts}/>
              <Route exact path="/successfully" component={FormSent}/>

              <Redirect exact from="/" to="/home"/>
              <Redirect exact from="/catalog" to="/catalog/all"/>
              <Route component={NoMatch}/>
            </Switch>

            <Footer/>
          </ScrollListener>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App;
