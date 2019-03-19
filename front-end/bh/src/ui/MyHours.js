import React, { Component } from 'react';
import { Constants } from 'expo';
import { FlatList, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { Container, Header, Text, Card, CardItem, Body, View, Left, Right, Subtitle, Icon, Button, Title, Fab } from 'native-base';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import HoursCard from '../components/HoursCard';
import InsertUserModal from '../components/InsertHoursModal';

export default class MyHours extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       hours: [],
       visible: false,
       token: null,
       spinner: false
    };
  };

  componentDidMount = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("@bh:user"));
    const token = JSON.parse(await AsyncStorage.getItem("@bh:token"));
    this.setState({spinner: true});
    if (!user && !token) {
    this.setState({spinner: false}); 
      Alert.alert(
        "Erro ao cadastrar horário", 
        "Faça login novamente!",
        [
          {text: "Não", onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
          {text: "Login", onPress: () => Actions.login({back: true})},
        ]
        );
    }else {
      this.handleGethours(token);
      this.setState({spinner: false});
    }
  };
  
  
  handleGethours = async (token) => {
    try {
      const response = await axios.get("http://192.168.0.5:8080/app/horarios",
                                     {
                                         headers: {'Authorization': 'Bearer ' + token}
                                     })
      this.setState({hours: response.data});
    } catch (error) {
      console.log(error.message)
    }    
  };

  handlePostHours = async (qtdHoras, data, token) => {
    this.setState({spinner: true});
    try {
      const response = await axios.post("http://192.168.0.5:8080/app/horario",
                                  {
                                    qtdHoras,
                                    data
                                  },
                                  {
                                    headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"}
                                  }
                                  )
      this.handleGethours(token);
      this.setState({spinner: false});
    } catch (error) {
      this.setState({spinner: false});
      console.log(error.message)
    }    
  };

  handleRegisterHours = (qtdHoras, token) => {
    const data = new Date();
    this.handlePostHours(qtdHoras, data, token);
  }

  handleUserLogged = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("@bh:user"));
    const token = JSON.parse(await AsyncStorage.getItem("@bh:token"));
    if (!user && !token) {
      Alert.alert(
        "Erro ao cadastrar horário", 
        "Faça login novamente!",
        [
          {text: "Não", onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
          {text: "Login", onPress: () => Actions.login({back: true})},
        ]
        );
    }else {
      this.setState({visible: true, token});
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
            <Title>Meus horários</Title>
            <Subtitle>Banco de Horas</Subtitle>
          </Body>
          <Right style={{flex: 1,}}/>
        </Header>
        <View style={{flex: 1}}>
          <Card>
            <CardItem header bordered>
              <Text>Horários</Text>
            </CardItem>
          </Card>
          <FlatList 
              data={this.state.hours}
              renderItem={({ item }) => {
                console.log(item)
                return <HoursCard data={item.data} qtdHoras={item.qtdHoras}/>
              } }
              keyExtractor={item => "" + item.id}
            />
            <InsertUserModal
              visible={this.state.visible}
              onClose={() => this.setState({visible: false})}
              onRegisterHours={(qtdHoras) => this.handleRegisterHours(qtdHoras, this.state.token)}
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

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});