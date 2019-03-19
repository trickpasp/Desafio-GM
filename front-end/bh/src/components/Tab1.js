import React, { Component } from 'react';
import { FlatList, Alert, AsyncStorage } from 'react-native';
import { Container, Content, View, Button, Icon, Fab  } from 'native-base';
import axios from 'axios'

import UserCard from './UserCard';
import { Actions } from 'react-native-router-flux';
import { url } from '../util/url_back';

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: null,
      active: false
    };
  };

  componentDidMount = async () => {    
    try {
      const user = JSON.parse( await AsyncStorage.getItem("@bh:user"));
      const token = JSON.parse( await AsyncStorage.getItem("@bh:token"))
      if (!user && !token) {
        this.handleGetUsers();
      }else {
        this.setState({user, appearLogged: true});
        this.handleGetUsersLogged(token)
        
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  handleGetUsers = async () => {
    try {
      const response = await axios.get("http://192.168.0.5:8080/app/usuarios")
      this.setState({users: response.data});
    } catch (error) {
      console.log(error.message)
    }    
  };

  handleGetUsersLogged = async (token) => {
    try {
      const response = await axios
                                .get(url + "/app/usuarios", 
                                  {
                                    headers: {'Authorization': 'Bearer ' + token}
                                  }
                                )
      this.setState({users: response.data});
    } catch (error) {
      console.log(error.message)
    }    
  };

  handleUserLogged = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("@bh:user"));
    if (!user) {
      Alert.alert(
        "Erro ao cadastrar usuário", 
        "Você precisa está logado!",
        [
          {text: "Não", onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
          {text: 'CADASTRE-SE', onPress: () => Actions.signup()},
          {text: "Login", onPress: () => Actions.login({back: true})},
        ]
        );
    }else {
      Actions.signup()
    }
  }

  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          <FlatList 
            data={this.state.users}
            renderItem={({ item }) => <UserCard user={item}/> }
            keyExtractor={item => "" + item.id}
          />
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.handleUserLogged()}>
            <Icon name="account-plus" type="MaterialCommunityIcons"/>
          </Fab>
        </View>
      </Container>
    );
  }
}
