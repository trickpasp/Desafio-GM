
import React, { Component } from 'react';
import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View, Drawer } from 'native-base';
import Tab1 from '../components/Tab1';
import Sidemenu from './Sidemenu';

export default class Home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isSearch: false,
       search: '',
       numberTab: 0
    };
  };  

  openDrawer = () => { this.drawer._root.open() };
  
  closeDrawer = () => { this.drawer._root.close() };

  render() {
    const { isSearch, numberTab } = this.state;
    return (
      <Drawer 
        ref={(ref) => { this.drawer = ref; }} 
        content={<Sidemenu />} 
        onClose={() => this.closeDrawer()} > 
        <Container >
          <View style={{
            backgroundColor:"#14257b",
            height: Constants.statusBarHeight
          }} />
          <Header androidStatusBarColor="#000000" iosBarStyle="light-content" hasTabs style={{ backgroundColor: '#5067FF' }}>
            
            <Left style={{flex: 1}}>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body style={{ flex: 3, justifyContent: 'center',alignItems:"center"}}>
              <Title >Banco de Horas</Title>
            </Body>
            <Right style={{flex: 1}} />
          </Header>
          <Tab1 />
        </Container>
      </Drawer>
  );
  }
}