import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Form, Item, Picker, Icon, Label } from 'native-base';

class InsertHoursModal extends Component {

	constructor(props) {
		super(props)
		this.state = {
            selected2: 1
        };
    }

    onValueChange2(value) {
        this.setState({
          selected2: value
        });
      }

	render() {
		return (
			<View style={styles.container}>
				<Modal
					visible={this.props.visible}
					animationType="fade"
					onRequestClose={this.props.onClose}
					transparent
				>
					<View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <View style={styles.viewTop}>
                                <Text style={styles.textTop}>Cadastro de horário</Text>
                            </View>
                            <View style={styles.viewCenter2}>
                                <View style={{height: "90%", width: '90%'}}>
                                    
                                    <ScrollView
                                        overScrollMode="never"
                                    >
                                        <Form>
                                            <Label>Selecione sua quantidade de horas</Label>
                                            <Item picker>
                                                <Picker
                                                    mode="dropdown"
                                                    style={{}}
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    placeholder="Selecione a quantidade de horas"
                                                    placeholderStyle={{ color: "#bfc6ea" }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={this.state.selected2}
                                                    onValueChange={this.onValueChange2.bind(this)}
                                                >
                                                    <Picker.Item label="1" value="1" />
                                                    <Picker.Item label="2" value="2" />
                                                    <Picker.Item label="3" value="3" />
                                                    <Picker.Item label="4" value="4" />
                                                    <Picker.Item label="5" value="5" />
                                                    <Picker.Item label="6" value="6" />
                                                    <Picker.Item label="7" value="7" />
                                                    <Picker.Item label="8" value="8" />
                                                    <Picker.Item label="9" value="9" />
                                                    <Picker.Item label="10" value="10" />
                                                    <Picker.Item label="11" value="11" />
                                                    <Picker.Item label="12" value="12" />
                                                    <Picker.Item label="13" value="13" />
                                                    <Picker.Item label="14" value="14" />
                                                </Picker>
                                            </Item>
                                            
                                        </Form> 
                                    </ScrollView>
                                                                      
                                </View>
                            </View>
                            <View style={styles.viewBottom}>
                                <TouchableOpacity
                                    style={styles.buttonCancel}
                                    onPress={() => {this.props.onClose();}}
                                >
                                    <Text style={styles.textButton}>FECHAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonRegister}
                                    onPress={() => {this.props.onRegisterHours(this.state.selected2); this.props.onClose()}}
                                >
                                    <Text style={styles.textButton}>CADASTRAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
					</View>
				</Modal>
			</View>
		)
	}
}

InsertHoursModal.propTypes = {
	visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRegisterHours: PropTypes.func.isRequired
}

export default (InsertHoursModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      modalContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerContainer: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '90%',
        height: '50%',
        borderRadius: 5,
        borderRadius: 5,
      },
      viewTop: {
        height: 75,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
      textTop: {
        fontSize: 20,
        color: '#000'
      },
      textInput: {
        fontSize: 18,
        color: '#000'
      },
      viewCenter2: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      viewBottom: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30,
      },
      buttonCancel: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5067FF',
        borderBottomLeftRadius: 5,
        borderColor: 'transparent',
        borderWidth: 0.5,
        height: 50,
      },
      buttonRegister: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5067FF',
        borderBottomRightRadius: 5,
        borderWidth: 0.5,
        borderColor: 'transparent',
        height: 50,
      },
      textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
      },
});