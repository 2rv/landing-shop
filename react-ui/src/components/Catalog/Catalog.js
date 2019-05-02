import React, { PureComponent, Fragment} from 'react';
import styled, {keyframes} from 'styled-components'
import Categories from "../Categories/Categories";
import GdsList from "../GdsList/GdsList";
import {connect} from "react-redux";
import EmptyGdsList from "../EmptyGdsList/EmptyGdsList";

class Catalog extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      empty: false
    }
  }

  showEmptyPage = () => {
    this.setState({empty: true})
  };


  render() {


    return (
      <Container>
        {
          this.state.empty === true ?
            <EmptyGdsList/>
            :
            <Fragment>
              <Categories showEmptyPage={this.showEmptyPage}/>
              <GdsList filter={this.props.filter}/>
            </Fragment>
        }
      </Container>
    );
  }

}

const mapStateToProps = store => {
  return {
    filter: store.getCategories.selected,
  }
};

export default connect(mapStateToProps)(Catalog)

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    animation: ${fade} 0.5s ease-in-out;
    padding-top: 60px;
    min-height: calc(100vh - 60px);
  `;

