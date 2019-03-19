import React, { Component } from 'react';
import { Constants } from 'expo';
import { FlatList, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { Container, Header, Text, Card, CardItem, Body, View, Left, Right, Subtitle, Icon, Button, Title, Fab } from 'native-base';
import HoursCard from './HoursCard';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import InsertUserModal from './InsertHoursModal';
import Spinner from 'react-native-loading-spinner-overlay';
import { url } from '../util/url_back';

export default class UserDetails extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       user: {},
       hours: [],
       visible: false,
       token: null,
       spinner: false
    };
  };

  componentDidMount = () => {
    if(this.props.user){
        this.setState({user: this.props.user});
        this.handleGethours(this.props.user.id);
    }
  };
  
  
  handleGethours = async (id) => {
    try {
      const response = await axios.get(url + "/app/horarios/" +id)
      this.setState({hours: response.data});
    } catch (error) {
      console.log(error.message)
    }    
  };

  handlePostHours = async (qtdHoras, data, token) => {
    this.setState({spinner: true});
    try {
      const response = await axios.post( url + "/app/horario/"+this.state.user.id,
                                  {
                                    qtdHoras,
                                    data
                                  },
                                  {
                                    headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"}
                                  }
                                  )
      this.handleGethours(this.state.user.id);
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
        "Você precisa está logado!",
        [
          {text: "Não", onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
          {text: 'CADASTRE-SE', onPress: () => Actions.signup()},
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
            <Title>Detalhes de Usuário</Title>
            <Subtitle>Banco de Horas</Subtitle>
          </Body>
          <Right style={{flex: 1,}}/>
        </Header>
        <View style={{flex: 1}}>
          <Card>
            <CardItem header bordered>
                <Text>Perfil</Text>
              </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={{fontWeight: "bold"}}>id: <Text style={{fontWeight: "normal"}}>{this.state.user.id}</Text></Text>
                <Text style={{fontWeight: "bold"}}>nome: <Text style={{fontWeight: "normal"}}>{this.state.user.nome}</Text></Text>
                <Text style={{fontWeight: "bold"}}>email: <Text style={{fontWeight: "normal"}}>{this.state.user.email}</Text></Text>
              </Body>
            </CardItem>
          </Card>
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
              <Icon name="clock" type="MaterialCommunityIcons"/>
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