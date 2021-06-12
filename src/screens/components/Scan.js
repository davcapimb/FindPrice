import React, {Component, useState} from "react";
import launchCamera from 'react-native-image-picker';
// import * as ImagePicker from "react-native-image-picker";
import {Alert, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import axios from "axios";
import ModalDropdown from "react-native-modal-dropdown";
import Geolocation from 'react-native-geolocation-service';
import RNMlKit from 'react-native-firebase-mlkit';

const showAlert = (err, msg) =>
    Alert.alert("Error " + err, msg,[{text: "Cancel",style: "cancel",},],);

// const camera = () => {
//     const [image, setImage] = useState();
//     const [result, setResult] = useState({});
//
//     const onTakePhoto = () => launchCamera({mediaType: 'image'}, onImageSelect);
//
//
//     const onImageSelect = async media => {
//         if (!media.didCancel) {
//             setImage(media.assets[0].uri);
//             // const processingResult =
//             //   await vision().cloudDocumentTextRecognizerProcessImage(media.assets[0].uri);
//             const deviceTextRecognition = await RNMlKit.cloudTextRecognition(media.assets[0].uri);
//             console.log('Text Recognition On-Device', deviceTextRecognition);
//             // console.log(processingResult);
//             setResult(deviceTextRecognition);
//         }
//     };
//     return onTakePhoto();
// }

export default class Scan extends Component {
    state = {
        product: '',
        lat: '',
        long: '',
        price: '',
        prod_ids: [],
        options: [],
        image:'',
        result:''
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

    // cameraLaunch(){
    // let options = {
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // launchCamera(options, (res) => {
    //   console.log('Response = ', res);
    //
    //   if (res.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (res.error) {
    //     console.log('ImagePicker Error: ', res.error);
    //   } else if (res.customButton) {
    //     console.log('User tapped custom button: ', res.customButton);
    //     alert(res.customButton);
    //   } else {
    //     const source = { uri: res.uri };
    //     console.log('response', JSON.stringify(res));
    //     // this.setState({
    //     //   filePath: res,
    //     //   fileData: res.data,
    //     //   fileUri: res.uri
    //     // });
    //   }
    // });
// }

    onTakePhoto() {
        launchCamera({mediaType: 'image'}, this.onImageSelect);
    }

    async onImageSelect(media){
        if (!media.didCancel) {
            this.setState({image:media.assets[0].uri})
            const priceRecognized = await RNMlKit.cloudTextRecognition(media.assets[0].uri);
            console.log('priceRecognized: ', priceRecognized);
            this.setState({result: priceRecognized})
        }
    };

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

                <TouchableOpacity style={styles.button} onPress={() => this.onTakePhoto()}>
                    <Text style={styles.buttonText}>Take Photo</Text>
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



