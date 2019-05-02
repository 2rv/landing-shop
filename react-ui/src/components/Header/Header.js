import React, { PureComponent} from 'react';
import styled, {keyframes} from 'styled-components'
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";


class Header extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  static defaultProps = {
    links: [
      {name: "Главная", link: "/home"},
      {name: "Каталог", link: "/catalog"},
      {name: "Услуги", link: "/services"},
      {name: "Расчет стоимости", link: "/calc"},
      {name: "Контакты", link: "/contacts"},
    ]
  };

  toggleMenu = () => {
    this.setState({active: !this.state.active})
  };

  render() {
    const {oldOffset, links} = this.props;
    const {pathname} = this.props.location;

    const isTransparent =
      (pathname === "/home" && oldOffset < 100) ||
      (pathname === "/contacts" && oldOffset < 10);


    return (
      <React.Fragment>
        <Container
          className={isTransparent && "transparent"}>
          <Logo to={"/"}>Space Design</Logo>
          <Nav>
            {
              links.map(({link, name}, index)=> (
                <Link key={index} to={link}>{name}</Link>
              ))
            }
            <Icon href="https://instagram.com/accounts/edit/?hl=ru">
              <svg width="18" height="18" viewBox="0 0 512 512" fill={isTransparent ? "#fff" : "#666"} xmlns="http://www.w3.org/2000/svg">
                <path d="M352 0H160C71.648 0 0 71.648 0 160V352C0 440.352 71.648 512 160 512H352C440.352 512 512 440.352 512 352V160C512 71.648 440.352 0 352 0ZM464 352C464 413.76 413.76 464 352 464H160C98.24 464 48 413.76 48 352V160C48 98.24 98.24 48 160 48H352C413.76 48 464 98.24 464 160V352Z"
                      fill={isTransparent ? "#fff" : "#666"}/>
                <path d="M256 128C185.312 128 128 185.312 128 256C128 326.688 185.312 384 256 384C326.688 384 384 326.688 384 256C384 185.312 326.688 128 256 128ZM256 336C211.904 336 176 300.096 176 256C176 211.872 211.904 176 256 176C300.096 176 336 211.872 336 256C336 300.096 300.096 336 256 336Z"
                      fill={isTransparent ? "#fff" : "#666"}/>
                <path d="M393.6 135.456C403.02 135.456 410.656 127.82 410.656 118.4C410.656 108.98 403.02 101.344 393.6 101.344C384.18 101.344 376.544 108.98 376.544 118.4C376.544 127.82 384.18 135.456 393.6 135.456Z"
                      fill={isTransparent ? "#fff" : "#666"}/>
              </svg>

            </Icon>
            <Button onClick={this.toggleMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14 17H4V19H14V17ZM20 9H4V11H20V9ZM4 15H20V13H4V15ZM4 5V7H20V5H4Z"
                      fill={isTransparent ? "#fff" : "#666"}/>
              </svg>
            </Button>
          </Nav>
        </Container>

        <MobileNav className={this.state.active === false && "closed"}>
          <MobileButton onClick={this.toggleMenu}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="#666"/>
            </svg>
          </MobileButton>
          {
            links.map(({link, name}, index)=> (
              <MobileLink key={index} onClick={this.toggleMenu} to={link}>{name}</MobileLink>
            ))
          }
        </MobileNav>
      </React.Fragment>
    );
  }

}

const mapStateToProps = store => {
  return {
    scrollingDirection: store.scrollingPage.scrollingDirection,
    oldOffset: store.scrollingPage.oldOffset
  }
};
export default withRouter(connect(mapStateToProps)(Header))

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Logo = styled(NavLink)`
    height: 40px;
    padding: 0 15px;
    border: 2px solid #666;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    transition: 0.7s;
    color: #666;
    font-family: "Lora",serif;
    text-decoration: none;
    
    &:hover {
    opacity: 0.7;
    }
    
    @media all and (max-width: 720px) {
      height: 35px;
      font-size: 14px;
    }
    
    .transparent & {
      border-color: #fff;
      color: #fff;
    }
  `;


const Nav = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
  `;

const MobileNav = styled.div`
    display: flex;
    z-index: 20;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding: 100px 0;
    transition: 1s;
    opacity: 1;
    background-color: #fff;
    flex-direction: column;
    top: 0;
    left: 0;
    
    &.closed {
      opacity: 0;
      left: -100vh;
      transition: 2s;
    }
    
    @media all and (min-width: 861px) {
      display: none;
    };
    
  `;

const Button = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 40px;
    height: 40px;
    transition: 0.7s;
    cursor: pointer;
    margin-left: 10px;
    
    @media all and (min-width: 861px) {
      display: none;
    };
    
    &:hover {
    opacity: 0.7;
    }
    
  `;

const MobileButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 15px;
    right: 15px;
    transition: 0.7s;
    cursor: pointer;
    
    &:hover {
      opacity: 0.7;
    }
  `;

const Icon = styled.a`
    width: 18px;
    height: 18px;
    border-radius: 18px;
    cursor: pointer;
    transition: 0.7s;
    
    &:hover {
    opacity: 0.7;
    }
`;

const MobileLink = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    transition: 0.7s;
    padding: 15px 0;
    position: relative;
    color: #666 ;
    cursor: pointer;
    width: 100%;
    
    
    &:hover {
    opacity: 0.7;
    }
    
    &.active {
      color: #8CDB90;
      background-color: #fcfcfc;
    }
    
    .transparent & {
      color: #fff;
      
      &.active {
        color: #8CDB90 !important;
      }
    }
    
  `;

const Link = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: 0.7s;
    padding: 0 10px;
    position: relative;
    color: #666 ;
    cursor: pointer;
    margin-right: 15px;
    
    &:hover {
    opacity: 0.7;
    }
    
    &.active {
      color: #8CDB90;
    }
    
    .transparent & {
      color: #fff;
      
      &.active {
        color: #8CDB90 !important;
      }
    }
    
    @media all and (max-width: 860px) {
      display: none;
    }
    
  `;


const Container = styled.header`
    width: 100%;
    display: flex;
    padding: 0 25px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    position: fixed;
    transition: 0.5s ease-in-out;
    z-index: 10;
    height: 60px;
    min-width: auto;
    animation: ${fade} 1.2s ease-in-out;
    top: 2px;
    
    &.transparent {
      background-color: transparent;
      height: 90px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0);
      
      ${Link} {
        color: #fff;
      }
    }
    
    @media all and (max-width: 720px) {
      &.transparent {
        height: 60px;
        padding: 0 15px;
      }
      
      & {
        padding: 0 15px;
      }
    }
    
  `;
