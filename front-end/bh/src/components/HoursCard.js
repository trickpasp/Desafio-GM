import React, { Component } from 'react';
import { CardItem, Text, Body } from 'native-base';
export default class HoursCard extends Component {
  render() {
    return (
      <CardItem bordered>        
        <Body style={{flexDirection: 'row',justifyContent:"space-between", alignItems: "flex-start",}}>
          <Text>Qtd de horas: <Text>{this.props.qtdHoras}</Text></Text>
          <Text>Data: <Text>{this.props.data}</Text></Text>
        </Body>
      </CardItem>
    );
  }
}