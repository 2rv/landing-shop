import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import DataEditor from "./components/DataEditor/DataEditor";
import Auth from "./components/Auth/Auth";

class App extends Component {


  render() {

    const {isLogged} = this.props;

    return (
      <BrowserRouter>
          {
            isLogged === false ?
              <Switch >
                <Route exact path="/admin/login" component={Auth}/>

                <Redirect to="/admin/login"/>
              </Switch>
              :
              <Switch >
                <Route exact path="/admin/edit" component={DataEditor}/>
                <Redirect to="/admin/edit"/>
              </Switch>
          }

      </BrowserRouter>
    )
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    isLogged: store.doAuth.isLogged
  }
};

export default connect(mapStateToProps)(App);

