import React, { Component } from 'react';
import { Constants } from 'expo';
import { Container, Header, Content, Form, Item, Input, View, Label, Button, Text, Left, Body, Right, Title, Subtitle, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import * as emailValidator from 'email-validator';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       email: "",
       senha: "",
       spinner: false
    };
  };

  handleLogIn = async () => {
    const { email, senha } = this.state;
    if (!email && !senha) {
      Alert.alert("Erro", "Preencha todos os dados");
    }else if(!emailValidator.validate(email)){
      Alert.alert("Erro com email", "Email inválido");
    }else if(!senha){
      Alert.alert("Erro com email", "Email inválido");
    }else {
      this.setState({spinner: true})
      try {
        const response = await axios
                          .post(
                            "http://192.168.0.5:8080/login",
                            { 
                              email, 
                              senha
                            },
                            {
                              headers: {'Content-Type': 'application/json'}
                            }
                          );
        const {accessToken, usuario} = response.data;
        await AsyncStorage.setItem("@bh:user", JSON.stringify(usuario));
        await AsyncStorage.setItem("@bh:token", JSON.stringify(accessToken));
        this.setState({spinner: false});
        Actions.reset("home");
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
        {
              (this.props.back)
              ?<Left style={{flex: 1,}}>
                <Button transparent onPress={() => Actions.pop()}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              : <Left style={{flex: 1}} />
            }          
          <Body style={{flex: 3, justifyContent: 'center',alignItems:"center"}}>
            <Title>Login</Title>
            <Subtitle>Banco de Horas</Subtitle>
          </Body>
          <Right style={{flex: 1,}}/>
        </Header>
        <Content>
          <Form >
            <Item floatingLabel >
              <Label>Email</Label>
              <Input 
                getRef={(ref) => {this.email2 = ref}}
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing={() => this.senha1._root.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input getRef={(ref) => this.senha1 = ref}
                onChangeText={(senha) => this.setState({senha})}
                value={this.state.senha}
                onSubmitEditing={this.handleSignUp}
                returnKeyType="go"
                secureTextEntry
              />
            </Item> 
          </Form>
          <View style={{flex:1,flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 20,}}>
            <Button style={{width: "90%",justifyContent: "center", alignItems: 'center'}}
              onPress={() => this.handleLogIn()}
            >
              <Text>Login</Text>
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