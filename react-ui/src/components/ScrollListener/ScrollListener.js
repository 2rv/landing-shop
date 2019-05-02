import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {scrollingPage} from "../../actions";


class ScrollListener extends Component {

  static propTypes = {
    currentOffset: PropTypes.number.isRequired,
    oldOffset: PropTypes.number.isRequired,
  };

  handleScroll = () => {
    this.props.scrollingPage({
      currentOffset: window.pageYOffset,
      oldOffset: this.props.oldOffset
    });

  };

  componentWillMount() {
    window.addEventListener("scroll", (e)=> {
      this.handleScroll(e);
    })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", (e)=> {
      this.handleScroll(e);
    })
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

const mapStateToProps = store => {
  return {
    currentOffset: store.scrollingPage.currentOffset,
    oldOffset: store.scrollingPage.oldOffset,
    scrollingDirection: store.scrollingPage.scrollingDirection,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    scrollingPage: obj => dispatch(scrollingPage(obj)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollListener);
