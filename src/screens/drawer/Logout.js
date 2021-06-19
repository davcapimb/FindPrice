import React, {Component} from "react";
import Login from "./Login";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Logout extends Component {

    render() {
        AsyncStorage.clear()
        this.props.navigation.navigate('Login')
        return null;
    }
}
export default Logout;
