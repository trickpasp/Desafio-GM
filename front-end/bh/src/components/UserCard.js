import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {Card, CardItem, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class UserCard extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => Actions.userDetails({user: this.props.user})}
      >
        <Card>
          <CardItem header>
            <Text>{this.props.user.nome}</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>     
    );
  }
}