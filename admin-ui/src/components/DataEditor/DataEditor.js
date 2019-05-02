import React, { PureComponent, Fragment} from 'react';
import styled, {keyframes} from 'styled-components'
import {connect} from "react-redux";
import {getData, editData, addData, removeData} from "../../actions";


class DataEditor extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      key: "",
      categories: {},
      gds: {},
    }
  }

  handleSelectKey = (key) => {
    this.setState({key});
    this.props.getData(key, this.props.auth)
  };

  handleAddData = (key) => {
    this.props.addData(key, this.state[key], this.props.auth);
  };

  handleEditData = (key) => {
    this.props.editData(key, this.state[key], this.props.auth);
  };

  handleChangeInput = (key, name, value) => {
    const state = this.state[key];
    this.setState({[key]: {
      ...state,
        [name]: value
      }})
  };

  handleChangeInputFile = (key, name, file) => {
    const handle = this.handleChangeInput;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      handle(key, name, reader.result)
    };
  };

  render() {

    const {key} = this.state;

    const {isLoaded, data} = this.props.data;

    return (
      <Container>
        <Content>
          <Button onClick={()=> this.handleSelectKey("orders")} >Открыть новые заявки</Button>
          <Button onClick={()=> this.handleSelectKey("categories")} >Категории</Button>
          <Button onClick={()=> this.handleSelectKey("gds")} >Товары</Button>
          <Button onClick={()=> this.handleSelectKey("services")} >Услуги</Button>
          <Button onClick={()=> this.handleSelectKey("slides")} >Слайдер</Button>
        </Content>

        <Fragment>
          {
            key === "categories" &&
              <Fragment>
                <Content>
                  <h1>Создать</h1>
                  <input onChange={(e)=> this.handleChangeInput(key, "name", e.target.value)} placeholder={"Название категории"} type="text"/>
                  <input onChange={(e)=> this.handleChangeInput(key, "tag", e.target.value)} placeholder={"URL tag"} type="text"/>
                  <button onClick={()=> this.handleAddData(key)}>Добавить</button>
                </Content>

                <Content>
                  <h1>Редактировать</h1>
                  <input onChange={(e)=> this.handleChangeInput(key, "id", e.target.value)} placeholder={"ID"} type="text"/>
                  <input onChange={(e)=> this.handleChangeInput(key, "name", e.target.value)} placeholder={"Название категории"} type="text"/>
                  <input onChange={(e)=> this.handleChangeInput(key, "tag", e.target.value)} placeholder={"URL tag"} type="text"/>
                  <button onClick={()=> this.handleEditData(key)}>Изменить</button>
                </Content>

                {
                  isLoaded &&
                  <DataContent>
                    {
                      data.map((data, index)=> {
                        return (
                          <DataBlock key={index}>

                            <div>id: {data.id};</div>
                            <div>Name: {data.name};</div>
                            <div>tag: {data.tag}</div>
                            <Button onClick={()=> this.props.removeData(key, data.id, this.props.auth)}>Удалить</Button>
                          </DataBlock>
                        )
                      })
                    }
                  </DataContent>
                }
              </Fragment>
          }
        </Fragment>

        <Fragment>
          {
            key === "gds" &&
            <Fragment>
              <Content>
                <h1>Создать</h1>
                <input onChange={(e)=> this.handleChangeInput(key, "name", e.target.value)} placeholder={"Название товара"} type="text"/>
                <textarea onChange={(e)=> this.handleChangeInput(key, "info", e.target.value)} placeholder={"Информация"}/>
                <input type="text" onChange={(e)=> this.handleChangeInput(key, "tag", e.target.value)} placeholder={"Категория"}/>
                <input type="file" onChange={(e)=> this.handleChangeInputFile(key, "img", e.target.files[0])}/>
                <button onClick={()=> this.handleAddData(key)}>Добавить</button>
              </Content>

              <Content>
                <h1>Редактировать</h1>
                <input onChange={(e)=> this.handleChangeInput(key, "id", e.target.value)} placeholder={"ID"} type="text"/>
                <input onChange={(e)=> this.handleChangeInput(key, "name", e.target.value)} placeholder={"Название товара"} type="text"/>
                <textarea onChange={(e)=> this.handleChangeInput(key, "info", e.target.value)} placeholder={"Информация"}/>
                <input type="text" onChange={(e)=> this.handleChangeInput(key, "tag", e.target.value)} placeholder={"Категория"}/>
                <input type="file" onChange={(e)=> this.handleChangeInputFile(key, "img", e.target.files[0])}/>
                <button onClick={()=> this.handleEditData(key)}>Изменить</button>
              </Content>

              {
                isLoaded &&
                <DataContent>
                  {
                    data.map((data, index)=> {
                      return (
                        <DataBlock key={index}>

                          <div>id: {data.id};</div>
                          <div>Name: {data.name};</div>
                          <div>info: {data.info};</div>
                          <div>tag: {data.tag}</div>
                          <Image bg={data.img}/>
                          <Button onClick={()=> this.props.removeData(key, data.id, this.props.auth)}>Удалить</Button>
                        </DataBlock>
                      )
                    })
                  }
                </DataContent>
              }
            </Fragment>
          }
        </Fragment>

        <Fragment>
          {
            key === "services" &&
            <Fragment>
              <Content>
                <h1>Создать</h1>
                <input onChange={(e)=> this.handleChangeInput(key, "title", e.target.value)} placeholder={"Название услуги"} type="text"/>
                <textarea onChange={(e)=> this.handleChangeInput(key, "info", e.target.value)} placeholder={"Информация"}/>
                <input type="file" onChange={(e)=> this.handleChangeInputFile(key, "img", e.target.files[0])}/>
                <button onClick={()=> this.handleAddData(key)}>Добавить</button>
              </Content>

              <Content>
                <h1>Редактировать</h1>
                <input onChange={(e)=> this.handleChangeInput(key, "id", e.target.value)} placeholder={"ID"} type="text"/>
                <input onChange={(e)=> this.handleChangeInput(key, "title", e.target.value)} placeholder={"Название услуги"} type="text"/>
                <textarea onChange={(e)=> this.handleChangeInput(key, "info", e.target.value)} placeholder={"Информация"}/>
                <input type="file" onChange={(e)=> this.handleChangeInputFile(key, "img", e.target.files[0])}/>
                <button onClick={()=> this.handleEditData(key)}>Изменить</button>
              </Content>

              {
                isLoaded &&
                <DataContent>
                  {
                    data.map((data, index)=> {
                      return (
                        <DataBlock key={index}>

                          <div>id: {data.id};</div>
                          <div>Name: {data.title};</div>
                          <div>info: {data.info};</div>
                          <Image bg={data.img}/>
                          <Button onClick={()=> this.props.removeData(key, data.id, this.props.auth)}>Удалить</Button>
                        </DataBlock>
                      )
                    })
                  }
                </DataContent>
              }
            </Fragment>
          }
        </Fragment>

        <Fragment>
          {
            key === "slides" &&
            <Fragment>
              <Content>
                <h1>Создать</h1>
                <input onChange={(e)=> this.handleChangeInput(key, "text", e.target.value)} placeholder={"Текст слайдера"} type="text"/>
                <input type="file" onChange={(e)=> this.handleChangeInputFile(key, "img", e.target.files[0])}/>
                <button onClick={()=> this.handleAddData(key)}>Добавить</button>
              </Content>

              <Content>
                <h1>Редактировать</h1>
                <input onChange={(e)=> this.handleChangeInput(key, "id", e.target.value)} placeholder={"ID"} type="text"/>
                <input onChange={(e)=> this.handleChangeInput(key, "text", e.target.value)} placeholder={"Текст слайдера"} type="text"/>
                <input type="file" onChange={(e)=> this.handleChangeInputFile(key, "img", e.target.files[0])}/>
                <button onClick={()=> this.handleEditData(key)}>Изменить</button>
              </Content>

              {
                isLoaded &&
                <DataContent>
                  {
                    data.map((data, index)=> {
                      return (
                        <DataBlock key={index}>

                          <div>id: {data.id};</div>
                          <div>Text: {data.text};</div>
                          <Image bg={data.img}/>
                          <Button onClick={()=> this.props.removeData(key, data.id, this.props.auth)}>Удалить</Button>
                        </DataBlock>
                      )
                    })
                  }
                </DataContent>
              }
            </Fragment>
          }
        </Fragment>

        <Fragment>
          {
            key === "orders" &&
              <Fragment>
                {
                  isLoaded &&
                  <DataContent>
                    {
                      data.map((data, index)=> {
                        console.log(data, 1111);
                        return (
                          <DataBlock key={index}>
                            <div>ID: {data.id}</div>

                            {
                              data.inputs.map(({name, value, validation})=> {
                                if(validation === "FILE") {
                                  return <a href={value} download="filename.jpg">Скачать файл</a>
                                } else {
                                  return <div>{name}: {value};</div>
                                }
                              })
                            }

                            {
                              data.gds.data !== undefined &&
                              <div>Выбрал товар: {data.gds.data.map(({name}) => name+" " )}</div>
                            }

                            <Button onClick={()=> this.props.removeData(key, data.id, this.props.auth)}>Удалить</Button>
                          </DataBlock>
                        )
                      })
                    }
                  </DataContent>
                }
              </Fragment>
            }
        </Fragment>

      </Container>
    );
  }

}

const mapStateToProps = store => {
  return {
    data: store.getData,
    auth: store.doAuth,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getData: (key, auth) => dispatch(getData(key, auth)),
    editData: (key, data, auth) => dispatch(editData(key, data, auth)),
    addData: (key, data, auth) => dispatch(addData(key, data, auth)),
    removeData: (key, data, auth) => dispatch(removeData(key, data, auth)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataEditor);
const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

const Container = styled.div`
    animation: ${fade} 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    flex-direction: column;
  `;

const Content = styled.div `
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const Button = styled.button `
  height: 30px;
  margin-right: 10px;
  font-size: 16px;
`;

const DataContent = styled.div `
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const DataBlock = styled.div `
  
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
`;

const Image = styled.div `
  
  
  height: 400px;
  width: 400px;
  background-image: ${({bg}) => `url("${bg}")`};
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
`;
