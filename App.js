import React, {Component} from 'react';
import CategoryView from './src/screens/components/CategoryView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailView from './src/screens/components/DetailView';
import {createDrawerNavigator, DrawerItem, DrawerItemList, DrawerView} from '@react-navigation/drawer';
import Login from './src/screens/Account/Login.js';
import Register from './src/screens/Account/Register.js';
import Logout from './src/screens/Account/Logout.js';
import Scan from './src/screens/components/Scan.js';
import HomeScreen from './src/screens/Home/HomeScreen';
import ProductsView from './src/screens/components/ProductsView';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from './src/screens/tabs/Map.js';
import TabTwo from './src/screens/tabs/tab2.js';
import axios from 'axios';
import {SafeAreaView} from 'react-navigation';
import {Button, TouchableOpacity, ScrollView, Text, StyleSheet} from 'react-native';
import AddProduct from './src/screens/components/AddProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    renderTabComponents = () => {
        return (
            <Tab.Navigator initialRouteName="Feed"
                           tabBarOptions={{
                               inactiveTintColor: '#2d333b',
                               activeTintColor: '#ceecf9',
                               style: {
                                   backgroundColor: '#bb9d84',
                               },
                           }}>
                <Tab.Screen name="HomeTAB" options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size}/>
                    ),
                }}>
                    {props => <HomeScreen {...props} />}
                </Tab.Screen>
                <Tab.Screen name="ScanTAB" options={{
                    tabBarLabel: 'Add Scan',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="pen-plus" color={color} size={size}/>
                    ),
                }}>
                    {props => <Scan {...props} />}
                </Tab.Screen>
                <Tab.Screen name="ProductTAB" options={{
                    tabBarLabel: 'Add Product',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={size}/>
                    ),
                }}>
                    {props => <AddProduct {...props} />}
                </Tab.Screen>
                <Tab.Screen name="MapTAB" options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="map-search" color={color} size={size}/>
                    ),
                }}>
                    {props => <Map {...props} />}
                </Tab.Screen>
            </Tab.Navigator>
        );
    };


    renderDrawerComponents = () => {
        return (
            <Drawer.Navigator drawerStyle={{
                backgroundColor: '#bb9d84',
                opacity:0.8,
                width: 180,
            }}>
                <Drawer.Screen name="Tab">
                    {() => this.renderTabComponents()}
                </Drawer.Screen>
                <Drawer.Screen name="ListView">
                    {props => <CategoryView {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="New scan" component={Scan}/>
                <Drawer.Screen name="Logout">
                    {props => <Logout {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="HomeScreen">
                    {props => <HomeScreen {...props} />}
                </Drawer.Screen>

            </Drawer.Navigator>
        );
    };


    render() {
        axios.defaults.baseURL = 'http://10.0.2.2:8000/';
        axios.defaults.timeout = 1500;
        return (
            <NavigationContainer>

                <Stack.Navigator screenOptions={{headerShown: false}}>

                    <Stack.Screen name="Draw">
                        {() => this.renderDrawerComponents()}
                    </Stack.Screen>

                    <Stack.Screen name="Tab">
                        {() => this.renderTabComponents()}
                    </Stack.Screen>

                    <Stack.Screen name="Login">
                        {props => <Login {...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="ListView">
                        {props => <CategoryView {...props} />}
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

                    <Stack.Screen name="ProductsView">
                        {props => <ProductsView{...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="DetailView">
                        {props => <DetailView{...props} />}
                    </Stack.Screen>

                </Stack.Navigator>


            </NavigationContainer>
        );
    }
}




