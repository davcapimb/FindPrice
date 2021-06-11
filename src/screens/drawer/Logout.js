import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import Login from "./Login";
import { StackActions } from '@react-navigation/native';
class Logout extends Component {
    componentDidMount() {
        this.props.auth(false);
        this.props.navigation.navigate('Login')
        // this.props.navigation.dispatch(StackActions.popToTop());


    }


    render() {
        return (
            null
        );
    }

}


export default Logout;
