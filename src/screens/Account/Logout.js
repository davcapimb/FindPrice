import React, {Component} from "react";
import Login from "./Login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

class Logout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        ToastAndroid.show('Bye bye, see you soon!', ToastAndroid.SHORT);
        (async ()=>{ await AsyncStorage.clear();
                     this.props.navigation.navigate('Login');})()

        return null;
    }
}
export default Logout;
