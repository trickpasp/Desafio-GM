import React, { Component } from 'react';
import { Root } from 'native-base';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Font, AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Home from './ui/Home';
import Login from './ui/Login';
import UserDetails from './components/UserDetails';
import Sidemenu from './ui/Sidemenu';
import Signup from './ui/Signup';
import MyHours from './ui/MyHours';

export default class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({isReady:true})
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Root>
          <Router>
            <Stack key="root">
              <Scene key="home" component={Home} hideNavBar/>
              <Scene key="login" component={Login} hideNavBar/>
              <Scene key="userDetails" component={UserDetails} hideNavBar/>
              <Scene key="sidemenu" component={Sidemenu} hideNavBar/>
              <Scene key="signup" component={Signup} hideNavBar/>
              <Scene key="myhours" component={MyHours} hideNavBar/>
            </Stack>
          </Router>
      </Root>
    );
  }
}
