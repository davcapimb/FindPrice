import React, {Component} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {Image, PermissionsAndroid, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import Geolocation from 'react-native-geolocation-service';
import RNMlKit from 'react-native-firebase-mlkit';
import {showAlert} from '../../Utils';
import {images, styleScan} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Scan extends Component {
    state = {
        product: '',
        lat: '',
        long: '',
        price: '',
        prod_ids: [],
        options: [],
        image: '',
        result: [],
    };

    componentDidMount() {

        var prods = [];
        var prod_name = [];
        var errorMsg = '';

        axios.get('api/v1/products/')
            .then(response => {
                response.data.map((option, key) => {
                    prods.push(option);
                    prod_name.push(option.product_name);
                });
                this.setState({prod_ids: prods});
                this.setState({options: prod_name});
            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                },
            );
        (async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'FindPrice Camera Permission',
                        message:
                            'FindPrice needs access to your camera.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'FindPrice Location Permission',
                        message:
                            'FindPrice needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );

                if (granted) {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            this.setState({lat: position.coords.latitude, long: position.coords.longitude});
                        },
                        (error) => {
                            errorMsg = 'Permission to access location was denied';
                            showAlert('position', errorMsg);
                            console.log(error.code, error.message);
                        },
                        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
                    );
                }
            } catch (err) {
                console.warn(err);
            }
        })();
    };

    reloadProducts() {
        var prods = [];
        var prod_name = [];
        axios.get('api/v1/products/')
            .then(response => {
                response.data.map((option, key) => {
                    prods.push(option);
                    prod_name.push(option.product_name);
                });
                this.setState({prod_ids: prods});
                this.setState({options: prod_name});
            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                },
            );
    }

    onTakePhoto = () => {
        launchCamera({mediaType: 'image'}, async (media) => {
                if (!media.didCancel) {
                    this.setState({image: media.assets[0].uri});
                    try {
                        ToastAndroid.show('Processing the image...', ToastAndroid.LONG);
                        const priceRecognized = await RNMlKit.cloudTextRecognition(media.assets[0].uri);
                        this.setState({result: priceRecognized});
                        await this.onTakePrice();
                    } catch (e) {
                        ToastAndroid.show('Error! Try with a better photo', ToastAndroid.SHORT);
                    }

                }
            },
        );
    };

    // onSelectImage = () => {
    //     launchImageLibrary({mediaType: 'image'}, async (media) => {
    //             if (!media.didCancel) {
    //                 this.setState({image: media.assets[0].uri});
    //                 const priceRecognized = await RNMlKit.cloudTextRecognition(media.assets[0].uri);
    //
    //                 this.setState({result: priceRecognized});
    //                 await this.onTakePrice();
    //             }
    //         },
    //     );
    // };

    onTakePrice() {
        const reg1 = /[\$\£\€]+\s*\d+(?:[\.\,]\d{1,2})/;
        const reg2 = /[\$\£\€]*\s*\d+(?:[\.\,]\d{1,2})/;
        const reg3 = /\d+/;
        var current_price = '';
        var temp = '';
        this.state.result.map((box) => {
            temp = box.blockText.match(reg1);
            if (temp != undefined) {
                current_price = box.blockText.match(reg1);

            }
        });
        if (current_price === '') {
            this.state.result.map((box) => {
                temp = box.blockText.match(reg2);
                if (temp != undefined) {
                    current_price = box.blockText.match(reg2);
                }
            });
        }
        if (current_price === '') {
            this.state.result.map((box) => {
                temp = box.blockText.match(reg3);
                if (temp != undefined) {
                    current_price = box.blockText.match(reg3);
                }
            });
        }

        if (current_price[0].includes(',')) {
            current_price[0] = current_price[0].replace(/,/g, '.');
        }


        this.setState({price: current_price[0]});
        this.priceInput.setNativeProps({text: current_price[0]});
        return (current_price);
    }

    onProductChange(text) {
        this.setState({product: this.state.prod_ids[text].id});
    }

    onPriceChange(text) {
        this.setState({price: text});
    }


    handleScan() {
        const payload = {
            product: this.state.product,
            price: this.state.price,
            lat: this.state.lat,
            long: this.state.long,
        };
        axios.post('api/v1/scans/', payload)
            .then(response => {
                ToastAndroid.show('New scan added!', ToastAndroid.SHORT);
                this.priceInput.clear();
                this.props.navigation.navigate('Draw');

            })
            .catch(error => {
                    for (const keys of Object.keys(error.response.data)) {
                        showAlert(keys, error.response.data[keys].toString());
                    }
                },
            );
    }


    render() {

        return (
            <View style={styleScan.container}>
                <Text style={styleScan.logo}>Add Scan</Text>
                <View style={styleScan.dropdownViewStyle}>
                    <ModalDropdown
                        placeholder="Select a product"

                        onSelect={(index, value) => {
                            this.setState({selected: value});
                        }}
                        options={this.state.options}
                        onSelect={this.onProductChange.bind(this)}
                        dropdownTextStyle={styleScan.dropdownTextStyle}
                        textStyle={styleScan.textStyle}
                        dropdownStyle={styleScan.dropdownStyle}
                        style={styleScan.styledrop}
                    />
                    <TouchableOpacity style={styleScan.button} onPress={() => this.reloadProducts()}>
                        <MaterialCommunityIcons name="reload" color={'#474747FF'} size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={styleScan.inputView}>
                    <TextInput
                        style={styleScan.inputText}
                        placeholder="Price"
                        placeholderTextColor="#003f5c"
                        ref={input => {
                            this.priceInput = input;
                        }}
                        onChangeText={this.onPriceChange.bind(this)}
                    />
                    <TouchableOpacity style={styleScan.button} onPress={() => this.onTakePhoto()}>
                        <Image style={styleScan.icon} source={images['ScanTAB'].uri}/>
                    </TouchableOpacity>


                </View>

                <TouchableOpacity style={styleScan.loginBtn} onPress={() => this.handleScan()}>
                    <Text style={styleScan.loginText}>Add scan</Text>
                </TouchableOpacity>


                {/*<TouchableOpacity style={styleScan.loginBtn} onPress={() => this.onSelectImage()}>*/}
                {/*    <Text style={styleScan.buttonText}>Take Image</Text>*/}
                {/*</TouchableOpacity>*/}

            </View>
        );
    }
}






