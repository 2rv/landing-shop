import React, { useState } from 'react';
import styled from 'styled-components'

export default ({form, formText, fillForm, sendForm, isSent, notValid, children, title})=> {

  const [focused, setFocus] = useState(null);

  const inputFile = React.createRef();

  const handleChange = (name, value) => {
    fillForm(name, value, form.all);
  };

  const handleSend = () => {
    sendForm(inputs);
  };

  const handleOnFocus = (index) => {
    setFocus(index)
  };

  const handleOnBlur = () => {
    setFocus(null)
  };

  const {inputs} = form;

  return (
    <React.Fragment >
      <Heading>{title}</Heading>
      <Block>
        {
          inputs.map(({name, value, isError, validation}, index)=> {
            const {title, error, type} = formText[name];
            const isFocused = focused === index;
            return (
              <Label key={index}>
                <Error
                  className={isError && "active"}>
                  {error}
                </Error>
                {
                  type === "INPUT" &&
                  <React.Fragment>
                    <Input
                      isError={isError}
                      className={isFocused && "focused"}
                      value={value}
                      onFocus={()=> {handleOnFocus(index)}}
                      onBlur={()=> {handleOnBlur()}}
                      onChange={(e)=> handleChange(name, e.target.value)}/>
                    <Title
                      isError={isError}
                      className={(isFocused ? "focused " : "") + (value !== "" ? " opacity " : "")}>
                      {value === "" && title}
                    </Title>
                  </React.Fragment>
                }

                {
                  type === "TEXTAREA" &&
                    <React.Fragment>
                      <Title
                        isError={isError}
                        className={(isFocused ? "focused " : "") + (value !== "" ? " opacity " : "")}>
                        {value === "" && title}
                      </Title>
                      <TextArea
                        isError={isError}
                        className={isFocused && "focused"}
                        value={value}
                        onFocus={()=> {handleOnFocus(index)}}
                        onBlur={()=> {handleOnBlur()}}
                        onChange={(e)=> handleChange(name, e.target.value)}/>
                    </React.Fragment>
                }
                {
                  type === "FILE" &&
                  <React.Fragment>
                    <StaticTitle isError={isError}>{title}</StaticTitle>
                    <FileInputDummy
                      type={"file"}
                      isError={isError}
                      onClick={()=> inputFile.current.value}>
                      {value === "" ? "Файл не выбран" : "Файл загружен"}
                    </FileInputDummy>

                    <FileInput
                      onChange={(e)=> {
                        handleChange(name, e.target.files[0]);
                        console.log(e.target.files[0])
                      } }
                      ref={inputFile}
                      value={""}
                      type={"file"}
                    />
                  </React.Fragment>

                }
              </Label>
            )
          })
        }
        <Status
          className={(isSent === false || notValid === true) && "active"}>
          {isSent === false && "При отправки формы произошла ошибка"}
          {notValid === true && "Заполните форму правильно"}
        </Status>
        <Button onClick={()=> handleSend()}>Связаться c нами</Button>
      </Block>
      {children}
    </React.Fragment>
  )
}

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Heading = styled.strong`
    font-size: 35px;
    font-family: "Lora",serif;
    color: #666;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding: 0 25px 10px;
  `;

const Label = styled.label`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 12px;
    transition: 0.7s;
    
  `;

const StaticTitle = styled.span`
  position: absolute;
  font-style: normal;
  font-weight: 500;
  height: 22px;
  color: 
  ${({isError}) => {
    if(isError === true) return "tomato !important";
    if(isError === false) return "#8CDB90";
    else return "#888";
  }};
  transition: 0.5s;
  font-size: 13px;
  top: 0;
  left: 0;
  padding-left: 3px;
`;


const Title = styled.span`
  position: absolute;
  font-style: normal;
  font-weight: 500;
  height: 20px;
  line-height: 20px;
  color: 
  ${({isError}) => {
    if(isError === true) return "tomato !important";
    if(isError === false) return "#8CDB90";
    else return "#888";
  }};
  transition: 0.5s;
  font-size: 13px;
  top: 0;
  left: 3px;
  
  &.focused {
    left: 20px;
    font-size: 15px;
    top: 37px;
    color: 
    ${({isError}) => {
      if(isError === true) return "tomato !important";
      else return "#666";
    }};
  }
  
  &.opacity {
    opacity: 0;
  }
  
  @media all and (max-width: 480px) {
    left: 20px;
    font-size: 15px;
    bottom: 15px;
  }
`;

const Input = styled.input`
  height: 50px;
  border: 1px solid 
  ${({isError}) => {
    if(isError === true) return "tomato !important";
    if(isError === false) return "#8CDB90 !important";
    else return "rgba(34,36,38,0.15)";
  }};
  padding: 0 20px;
  font-size: 15px;
  font-weight: 500;
  color: ${({isError}) => {
    if(isError === true) return "tomato !important";
    if(isError === false) return "#8CDB90";
    else return "#666";
  }};
  transition: 0.7s;
  border-radius: 4px;

  &:focus {
    border-color: #8CDB90;
    color: #666;
  }
  
`;

const Error = styled.span`
    height: 22px;
    padding-left: 30px;
    font-size: 13px;
    color: tomato;
    text-align: right;
    opacity: 0;
    transition: 0.7s;
    padding-right: 3px;
    
    &.active {
      opacity: 1;
    }
    
  `;

const Status = styled.span`
    height: 22px;
    font-size: 13px;
    opacity: 0;
    color: tomato;
    transition: 0.7s;
    width: 100%;
    margin-top: 12px;
    
    &.active {
      opacity: 1;
    }
    
  `;


const TextArea = styled.textarea`
    height: 100px;
    color: 
    ${({isError}) => {
      if(isError === true) return "tomato !important";
      if(isError === false) return "#8CDB90";
      else return "#666";
    }};
    border: 1px solid 
    ${({isError}) => {
      if(isError === true) return "tomato !important";
      if(isError === false) return "#8CDB90 !important";
      else return "rgba(34,36,38,0.15)";
    }};;
    padding: 16px 20px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 4px;
    transition: 0.7s;
    resize: none;
   
    &:focus {
      border-color: #8CDB90;
      color: #666;
    }
  `;


const Button = styled.div`
  height: 50px;
  padding: 0 30px;
  max-width: 250px;
  width: 100%;
  background-color: #8CDB90;
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: 0.7s;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
  }
`;

const FileInputDummy = styled.div `
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 50px;
  border: 1px solid 
  ${({isError}) => {
    if(isError === true) return "tomato !important";
    if(isError === false) return "#8CDB90 !important";
    else return "rgba(34,36,38,0.15)";
  }};
  padding: 0 20px;
  font-size: 15px;
  font-weight: 500;
  color: ${({isError}) => {
    if(isError === true) return "tomato !important";
    if(isError === false) return "#8CDB90";
    else return "#666";
  }};
  transition: 0.7s;
  border-radius: 4px;

`;
const FileInput = styled.input `
  display: none;
`;
