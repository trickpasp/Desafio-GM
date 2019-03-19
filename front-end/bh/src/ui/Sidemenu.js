import React, { Component } from 'react';
import { Constants } from 'expo';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {Card, CardItem, Text, Body } from 'native-base';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Sidemenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      appearLogged: false
    };
  }

  componentDidMount = async () => {    
    try {
      const user = JSON.parse( await AsyncStorage.getItem("@bh:user"));
      if (!user) {
        this.setState({user: {nome: 'anonymous', email: 'anonymous@mail.com'}});
      }else {
        this.setState({user, appearLogged: true});

      }
    } catch (error) {
      console.log(error)
    }
  };

  handleLogout = async () => {
    await AsyncStorage.removeItem("@bh:user");
    await AsyncStorage.removeItem("@bh:token");
    this.setState({user: null, appearLogged: false});
    Actions.reset("home");
  }
  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.viewOptionPerfil}>
            <TouchableOpacity
              style={styles.navSectionPerfilStyle}
              onPress={() => Actions.clients()}>
              <Card style={styles.navItemPerfilStyle}>
                <CardItem header bordered>
                  <Text style={{}}>{(this.state.user != null)? this.state.user.nome: null}</Text>
                </CardItem>
                <CardItem bordered>        
                  <Body style={{flexDirection: 'row',justifyContent:"space-between", alignItems: "flex-start",}}>
                    <Text>{(this.state.user != null)? this.state.user.email: null}</Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
          </View>
          {
            (!this.state.appearLogged)
            ?<View style={styles.viewOption}>
              <TouchableOpacity
                style={styles.navSectionStyle}
                onPress={() => Actions.login({back: true})}>
                <Text style={styles.navItemStyle}>Login</Text>
              </TouchableOpacity>
            </View>
            : null
          } 
          {
            (!this.state.appearLogged)
            ? <View style={styles.viewOption}>
              <TouchableOpacity
                style={styles.navSectionStyle}
                onPress={() => Actions.signup()}>
                <Text style={styles.navItemStyle}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
            : null
          }         
          
          
          {
            (this.state.appearLogged)
            ? <View style={styles.viewOption}>
              <TouchableOpacity
                style={styles.navSectionStyle}
                onPress={() => Actions.myhours()}>
                <Text style={styles.navItemStyle}>Meus Horários</Text>
              </TouchableOpacity>
            </View>
            : null
          }
          
          {
            (this.state.appearLogged)
              ? <View style={styles.viewOption}>
              <TouchableOpacity
                style={styles.navSectionStyle}
                onPress={() => this.handleLogout()}>
                <Text style={styles.navItemStyle}>Sair</Text>
              </TouchableOpacity>
            </View>
            : null
          }
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
  viewOption: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemStyle: {
    padding: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  navSectionStyle: {
    backgroundColor: '#5067FF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  viewOptionPerfil: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navSectionPerfilStyle: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  navItemPerfilStyle: {
    width: '100%',
  },
})