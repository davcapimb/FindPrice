import React, {Component} from 'react';
import ListView from "./src/screens/components/list_view";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import DetailView from "./src/screens/components/detail_view";
import {createDrawerNavigator, DrawerItem, DrawerItemList, DrawerView} from '@react-navigation/drawer';
import Login from "./src/screens/drawer/Login.js";
import Register from "./src/screens/drawer/Register.js";
import Logout from "./src/screens/drawer/Logout.js";
import Scan from "./src/screens/components/Scan.js";
import HomeScreen from "./src/screens/Home/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Map from "./src/screens/tabs/Map.js";
import TabTwo from "./src/screens/tabs/tab2.js";
import axios from "axios";
import {SafeAreaView} from 'react-navigation';
import {Button, TouchableOpacity, ScrollView, Text, StyleSheet} from 'react-native';
import AddProduct from "./src/screens/components/AddProduct";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default class App extends Component {
    constructor(props) {
        super(props)
        this.auth = this.auth.bind(this);

        this.state = {
            isAuthenticated: false
        }
    }



    renderTabComponents = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" >
                    {props => <ListView {...props} isAuthenticated={this.state.isAuthenticated}/>}
                </Tab.Screen>
                <Tab.Screen name="Tab 2" component={TabTwo}/>
                <Tab.Screen name="Map" component={Map}/>
            </Tab.Navigator>
        );
    }


    renderDrawerComponents = () => {
        return (
            <Drawer.Navigator drawerStyle={{
                backgroundColor: '#c6cbef',
                width: 180,
            }}>
                <Drawer.Screen name="Tab">
                    {() => this.renderTabComponents()}
                </Drawer.Screen>
                <Drawer.Screen name="Home">
                    {props => <ListView {...props} isAuthenticated={this.state.isAuthenticated}/>}
                </Drawer.Screen>
                <Drawer.Screen name="New scan" component={Scan}/>
                <Drawer.Screen name="Logout">
                    {props => <Logout {...props} auth={this.auth}/>}
                </Drawer.Screen>
                <Drawer.Screen name="HomeScreen" component={HomeScreen}/>

            </Drawer.Navigator>
        );
    }
    auth = (Auth) => {
        this.setState({isAuthenticated: Auth});
        console.log(this.state.isAuthenticated)
    };


    render() {
        axios.defaults.baseURL = 'http://192.168.1.104:8000/';
        axios.defaults.timeout = 1500;
        return (
            <NavigationContainer>

                <Stack.Navigator screenOptions={{headerShown: false}}>

                    <Stack.Screen name="Login">
                        {props => <Login {...props} auth={this.auth} />}
                    </Stack.Screen>

                    <Stack.Screen name="Home">
                        {props => <ListView {...props} isAuthenticated={this.state.isAuthenticated}/>}
                    </Stack.Screen>

                    <Stack.Screen name="Draw">
                        {() => this.renderDrawerComponents()}
                    </Stack.Screen>
                    <Stack.Screen name="AddProduct">
                        {props => <AddProduct{...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Scan">
                        {props => <Scan{...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="Register">
                        {props => <Register{...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="HomeScreen">
                        {props => <HomeScreen{...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
                <Stack.Screen name="Tab">
                        {() => this.renderTabComponents()}
                    </Stack.Screen>

            </NavigationContainer>
        );
    }
}




