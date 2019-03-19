import React, { Component } from 'react';
import { Constants } from 'expo';
import { Container, Header, Content, Form, Item, Input, View, Label, Button, Text, Left, Body, Right, Title, Subtitle, Icon } from 'native-base';
import { Alert, StyleSheet } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import * as emailValidator from 'email-validator';
import axios from 'axios';
import { url } from '../util/url_back';

export default class Signup extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       nome: "",
       email: "",
       senha: "",
       spinner: false
    };
  };

  componentDidMount() {
  }

  handleSignUp = async () => {
    const { nome, email, senha } = this.state;
    if (!nome && !email && !senha) {
      Alert.alert("Erro", "Preencha todos os dados");
    }else if(!nome){
      Alert.alert("Erro com nome", "Nome não pode ser vázio");
    }else if(!emailValidator.validate(email)){
      Alert.alert("Erro com email", "Email inválido");
    }else if(!senha){
      Alert.alert("Erro com senha", "Senha não pode ser vázio");
    }else {
      this.setState({spinner: true})
      try {
        await axios
                  .post(url + "/app/cadastroUsuario",
                    {
                      nome, 
                      email, 
                      senha
                    },
                    {
                      headers: {'Content-Type': 'application/json'}
                    }
                  );
        this.setState({spinner: false, type: ActionConst.REPLACE});
        Actions.replace("login", {back: false});
      } catch (error) {
        this.setState({spinner: false});
        if (error.response) {
          if (error.response.status === 500)
            Alert.alert(
              error.response.data.title,
              error.response.data.message + ' Escolha outro email!'
            );
      
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      }   
    }
  }
  

  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.spinner}
          textContent={'Carregando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{
            backgroundColor:"#14257b",
            height: Constants.statusBarHeight
          }} />
        <Header style={{ backgroundColor: '#5067FF' }}>
          <Left style={{flex: 1,}}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{flex: 3, justifyContent: 'center',alignItems:"center"}}>
            <Title>Cadastro de Usuário</Title>
            <Subtitle>Banco de Horas</Subtitle>
          </Body>
          <Right style={{flex: 1,}}/>
        </Header>
        <Content>
          <Form >
          < Item floatingLabel >
              <Label>Nome</Label>
              <Input 
                onChangeText={(nome)=> this.setState({nome})}
                onSubmitEditing={(event) => {this.email._root.focus();}}
                value={this.state.nome}
                autoFocus={true}
                returnKeyType="next"
              />
            </Item>
            <Item floatingLabel >
              <Label>Email</Label>
              <Input 
                getRef={(ref) => {this.email = ref}}
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing={() => this.senha._root.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input 
                getRef={(ref) => this.senha = ref}
                onChangeText={(senha) => this.setState({senha})}
                value={this.state.senha}
                onSubmitEditing={this.handleSignUp}
                returnKeyType="go"
                secureTextEntry
              />
            </Item> 
          </Form>
          <View style={{flex:1,flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 20,}}>
            <Button 
              style={{width: "90%",justifyContent: "center", alignItems: 'center'}}
              onPress={this.handleSignUp}
            >
              <Text>Cadastrar</Text>
            </Button>
          </View>                                
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});