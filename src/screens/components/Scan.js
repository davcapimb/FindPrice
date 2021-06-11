import React, {Component} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import axios from "axios";
import ModalDropdown from "react-native-modal-dropdown";


const showAlert = (err, msg) =>
    Alert.alert(
        "Error " + err,
        msg,
        [
            {
                text: "Cancel",
                style: "cancel",
            },
        ],
    );


export default class Scan extends Component {


    state = {
        product: '',
        lat: '',
        long: '',
        price: '',
        prod_ids: [],
        options: [],
    }

    componentDidMount() {
        var prods = [];
        var prod_name = [];
        var errorMsg = "";

        axios.get('api/v1/products/')
            .then(response => {
                response.data.map((option, key) => {
                    prods.push(option)
                    prod_name.push(option.product_name)
                })
                this.setState({prod_ids: prods})
                this.setState({options: prod_name})
            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );

        // (async () => {
        //     let {status} = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //         errorMsg = 'Permission to access location was denied';
        //         showAlert("position", errorMsg);
        //         return;
        //     } else {
        //         let location = await Location.getCurrentPositionAsync({});
        //         console.log(location);
        //         this.setState({lat: location.coords.latitude, long: location.coords.longitude});
        //     }
        // })();
    }


    onProductChange(text) {
        this.setState({product: this.state.prod_ids[text].id});


    }

    onPriceChange(text) {
        this.setState({price: text});
    }


    handleScan() {
        const payload = {product: this.state.product, price: this.state.price, lat: this.state.lat, long: this.state.long}
        axios.post('api/v1/scans/', payload)
            .then(response => {

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
                {/*<LOGO width="130" height="130"/>*/}
                <Text style={styles.logo}>FindPrice</Text>
                <View style={styles.inputView}>
                    <ModalDropdown
                        placeholder="Select a product"

                        onSelect={(index, value) => {
                            this.setState({selected: value})
                        }}
                        options={this.state.options}
                        onSelect={this.onProductChange.bind(this)}
                        dropdownTextStyle={{
                            backgroundColor: '#fff',
                            fontSize: 18,
                            color: '#000000'
                        }}/*Style here*/
                        textStyle={{
                            fontSize: 18,
                            color: '#8D918D',
                            alignSelf: 'flex-start',
                            marginLeft: 10
                        }}
                        dropdownStyle={{
                            flex: 1,
                            width: '90%',
                            marginVertical: 10,
                            borderWidth: 1,
                            borderColor: '#D3D3D3'
                        }}
                        style={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            justifyContent: 'center'
                        }}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Price"
                        placeholderTextColor="#003f5c"
                        ref={input => {
                            this.passInput = input
                        }}
                        onChangeText={this.onPriceChange.bind(this)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText} onPress={() => this.handleScan()}>Add scan</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


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



