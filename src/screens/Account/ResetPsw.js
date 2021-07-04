import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {showAlert} from '../../Utils';
import {styleLogin, styleRegister} from './styles';

class ResetPsw extends Component {
    state = {
        email: '',
    };

    onEmailChange(text) {
        this.setState({email: text});
    }

    handleSendMail() {
        const payload = {email: this.state.email};
        axios.post('api/v1/users/reset_password/', payload)
            .then(response => {
                this.props.navigation.navigate('Login');

            })
            .catch(error => {
                    for (const keys of Object.keys(error.response.data)) {
                        showAlert(keys, error.response.data[keys].toString());
                    }
                },
            );
    }

    render() {
        return (
            <View style={styleRegister.container}>
                <Text style={styleLogin.logo}>Reset Password</Text>

                <View style={styleLogin.inputView}>
                    <TextInput
                        style={styleLogin.inputText}
                        autoCapitalize="none"
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        clearButtonMode="while-editing"
                        onChangeText={this.onEmailChange.bind(this)}
                    />
                </View>
                <TouchableOpacity style={styleLogin.loginBtn} onPress={() => this.handleSendMail()}>
                    <Text style={styleLogin.loginText}>Send Email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styleLogin.forgot}>Login</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default ResetPsw;

