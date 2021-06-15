import React, {Component} from "react";
import {StyleSheet, View, Text, TextInput, Button} from "react-native";
import axios from "axios";
import {showAlert} from "../../Utils";

class Register extends Component {
    state = {
        email: "",
        username: "",
        password: ""
    }

    onUsernameChange(text) {
        this.setState({username: text});
    }

    onPasswordChange(text) {
        this.setState({password: text});
    }

    onEmailChange(text) {
        this.setState({email: text});
    }

    handleRegister() {
        const payload = {email: this.state.email, username: this.state.username, password: this.state.password};
        axios.post('api/v1/users/', payload)
            .then(response => {

                this.props.navigation.navigate("Login");

            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);

                }
            );
    }

    render() {
        const {
            formContainerStyle,
            fieldStyle,
            textInputStyle,
            buttonContainerStyle,
            accountCreateContainerStyle,
            accountCreateTextStyle
        } = style;


        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={formContainerStyle}>
                    <View style={fieldStyle}>
                        <TextInput
                            placeholder="username"
                            autoCorrect={false}
                            autoCapitalize="none"
                            style={textInputStyle}
                            onChangeText={this.onUsernameChange.bind(this)}
                        />
                    </View>
                    <View style={fieldStyle}>
                        <TextInput
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="password"
                            style={textInputStyle}
                            onChangeText={this.onPasswordChange.bind(this)}
                        />
                    </View>
                    <View style={fieldStyle}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="email"
                            style={textInputStyle}
                            onChangeText={this.onEmailChange.bind(this)}
                        />
                    </View>
                </View>
                <View style={buttonContainerStyle}>
                    <Button title='Register' onPress={() => this.handleRegister()}/>
                </View>
                <View style={accountCreateContainerStyle}>
                    <Text style={accountCreateTextStyle}>
                        Already have an account?
                        <Text style={{color: 'blue'}} onPress={() => this.props.navigation.navigate("Login")}>
                            {' Login'}
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
}

export default Register;
const style = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
    },
    formContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
        flex: 1,
        padding: 15
    },
    fieldStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 25
    },
    accountCreateTextStyle: {
        color: 'black'
    },
    accountCreateContainerStyle: {
        padding: 25,
        alignItems: 'center'
    }

});
