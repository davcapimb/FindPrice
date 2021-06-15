import React, {Component} from "react";
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from "react-native";
import axios from "axios";
import {showAlert} from "../../Utils";

class Login extends Component {
    state = {
        username: "",
        password: "",
        isAuthenticated: false
    }



    onUsernameChange(text) {
        this.setState({username: text});
    }

    onPasswordChange(text) {
        this.setState({password: text});
    }

    handleLogin() {
        const payload = {username: this.state.username, password: this.state.password}
        axios.post('api/v1/token/login', payload)
            .then(response => {
                const token = response.data.auth_token;
                console.log(token);
                axios.defaults.headers.common['Authorization'] = 'Token ' + token;
                this.props.auth(true);
                // this.userInput.clear();
                this.passInput.clear();
                this.props.navigation.navigate("Draw");

            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.logo}>FindPrice</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        placeholder="Username..."
                        placeholderTextColor="#003f5c"
                        clearButtonMode="while-editing"
                        ref={input => {
                            this.userInput = input
                        }}

                        onChangeText={this.onUsernameChange.bind(this)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        ref={input => {
                            this.passInput = input
                        }}
                        onChangeText={this.onPasswordChange.bind(this)}
                    />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText} onPress={() => this.handleLogin()}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.loginText}
                          onPress={() => this.props.navigation.navigate("Register")}>Signup</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d333b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#bb9d84",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#ceecf9",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "#003f5c"
    },
    forgot: {
        color: "#ceecf9",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#bb9d84",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "#ceecf9"
    }
});



