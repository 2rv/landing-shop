import React, { Component} from 'react';
import styled, {keyframes} from 'styled-components'
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import {getCategories, getGds} from "../../actions";
import PropTypes from "prop-types";


class Categories extends Component {

  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    setCategories: PropTypes.func.isRequired,
    getGds: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    oldOffset: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this.props.getGds(this.props.match.params.filter, ()=> this.props.showEmptyPage());
    this.props.getCategories(this.props.match.params.filter, "LOAD");
  };

  selectTag = (tag) => {
    this.props.setCategories(tag);
    this.props.getGds(tag);
  };

  render() {
    const offset = this.props.oldOffset;
    const {isLoading, data} = this.props.categories;

    const isFixed = this.props.oldOffset > 190 && "fixed";
    const isScrolled = offset > 150 && "scrolled";

    return (
      <Container>
        {
          isLoading === false &&
          <Content className={isFixed + " " + isScrolled}>
            <Inside>
              {
                data.map(({name, tag}, index)=>
                  <Category
                    onClick={ ()=> {this.selectTag(tag)} }
                    key={index}
                    to={"/catalog/"+tag}>
                    {name}
                  </Category>
                )
              }

              <Block>
                <Category
                  onClick={ ()=> {this.selectTag("all")} }
                  to={"/catalog/all"}>
                  Все
                </Category>
              </Block>
            </Inside>
          </Content>
        }
      </Container>
    );
  }

}

const mapStateToProps = store => {
  return {
    categories: store.getCategories,
    oldOffset: store.scrollingPage.oldOffset
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: (url_param, type) => dispatch(getCategories(url_param, type)),
    setCategories: (tag) => dispatch(getCategories(tag, null)),
    getGds: (filter, ifEmpty) => dispatch(getGds(filter, ifEmpty)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    display: flex;
    padding: 0 25px;
    margin: 50px 0;
    justify-content: center;
    height: 75px;
    
  `;


const Content = styled.div`
  width: auto;
  min-width: 1300px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  height: 75px;
  animation: ${fade} 1s ease-in-out;
  border-radius: 5px;
  transition: 0.7s ease-in-out;
  transition-property: top;
  padding: 0 15px;
  
  @media all and (max-width: 1299px) {
    min-width: 100%;
    width: 100%;
  }
  
  &.scrolled {
    position: fixed;
    width: 100%;
    top: -10px;
    height: 65px;
    left: 0;
    padding: 0 20px;
    z-index: 5;
    transition: 0.5s ease-in-out;
    transition-property: top;
  }
  
  &.fixed {
    top: 62px;
  }
`;

const Inside = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: -moz-scrollbars-none;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #8CDB90;
    
  }

`;

const Block = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const Category = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  text-decoration: none;
  color: #666;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  transition: 0.7s;
  min-width: auto;
  
  &.active {
    color: #8CDB90;
    background-color: #fdfdfd;
  }

`;
