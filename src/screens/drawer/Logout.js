import React, {Component} from "react";
import Login from "./Login";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Logout extends Component {
    componentDidMount() {
        AsyncStorage.clear()
        this.props.navigation.navigate('Login')
    }
    render() {
        return null;
    }
}
export default Logout;
