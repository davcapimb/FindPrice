import React, {Component, useState} from "react";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import axios from "axios";
import ModalDropdown from "react-native-modal-dropdown";
import Geolocation from 'react-native-geolocation-service';
import RNMlKit from 'react-native-firebase-mlkit';
import {showAlert} from "../../Utils";

export default class Scan extends Component {
    state = {
        product: '',
        lat: '',
        long: '',
        price: '',
        prod_ids: [],
        options: [],
        image:'',
        result:[],
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

        (async () => {
              try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Cool Photo App Camera Permission",
                        message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                    );

                    if (granted) {
                        Geolocation.getCurrentPosition(
                            (position) => {
                            console.log(position);
                            this.setState({lat: position.coords.latitude, long: position.coords.longitude});
                            },
                        (error) => {
                          // See error code charts below.
                            errorMsg = 'Permission to access location was denied';
                            showAlert("position", errorMsg);
                            console.log(error.code, error.message);
                            },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                        );
                    }
              } catch (err) {
                  console.warn(err);
              }
        })();
    };


    onTakePhoto= () => {
        launchCamera({mediaType: 'image'}, async (media) => {
            if (!media.didCancel) {
                this.setState({image:media.assets[0].uri})
                const priceRecognized = await RNMlKit.cloudTextRecognition(media.assets[0].uri);
                console.log('priceRecognized: ', priceRecognized);
                this.setState({result: priceRecognized})
            }
        }
        );
    }

      onSelectImage= () => {
        launchImageLibrary({mediaType: 'image'}, async (media) => {
            if (!media.didCancel) {
                this.setState({image:media.assets[0].uri})
                const priceRecognized = await RNMlKit.cloudTextRecognition(media.assets[0].uri);
                console.log('priceRecognized: ', priceRecognized);
                this.setState({result: priceRecognized})
                await this.onTakePrice();
            }
        }
        );
    }

    onTakePrice(){
        const reg1 = /[\$\£\€]+\s*\d+(?:[\.\,]\d{1,2})/;
        const reg2 = /[\$\£\€]*\s*\d+(?:[\.\,]\d{1,2})/;
        var current_price="";
        var temp='';
        this.state.result.map((box)=>{
                temp=box.blockText.match(reg1);
                if(temp!=undefined) {
                    current_price=box.blockText.match(reg1)
                    console.log(current_price);

                }
            })
        if (current_price===''){
            this.state.result.map((box)=>{
                temp=box.blockText.match(reg2);
                if(temp!=undefined){
                    current_price=box.blockText.match(reg2);
                    console.log(current_price);
                }
            })
        }
        console.log('current price', current_price);
        current_price[0] = current_price[0].replace(/,/g,'.');
        current_price[0] = current_price[0].replace(/[\$\£\€]/g,'');
        this.setState({price:current_price[0]})
        this.priceInput.setNativeProps({text: current_price[0]})
        return (current_price)
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
                        dropdownTextStyle={styles.dropdownTextStyle}
                        textStyle={styles.textStyle}
                        dropdownStyle={styles.dropdownStyle}
                        style={styles.styledrop}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Price"
                        placeholderTextColor="#003f5c"
                        ref={input => {
                            this.priceInput = input
                        }}
                        onChangeText={this.onPriceChange.bind(this)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText} onPress={() => this.handleScan()}>Add scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.onTakePhoto()}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => this.onSelectImage()}>
                    <Text style={styles.buttonText}>Take Image</Text>
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
    },
    image: {
        height: 300,
        width: 300,
        marginTop: 30,
        borderRadius: 10,
    },
    dropdownTextStyle: {
        backgroundColor: '#fff',
        fontSize: 18,
        color: '#000000'
    },
    textStyle: {
        fontSize: 18,
        color: '#8D918D',
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    dropdownStyle: {
        flex: 1,
        width: '90%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3'
    },
    styledrop: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
});



