import React, {Component, useState} from "react";
import axios from "axios";
import {Alert,  StyleSheet, Text, TextInput, View, TouchableHighlight} from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon, Button } from 'react-native-elements'

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

class AddProduct extends Component {
    state = {
        product_name: "",
        category: "",
        description: "",
        options: [],
    }

    componentDidMount() {
        var categ = [];
        axios.get('categories')
            .then(response => {
                response.data.map((option, key) => {
                    categ.push(option.category)
                })
                this.setState({options: categ})
            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );
    }

    onProductNameChange(text) {
        this.setState({product_name: text});
    }

    onCategoryChange(text) {
        this.setState({category: this.state.options[text]});
    }

    onDescriptionChange(text) {
        this.setState({description: text});
    }


    handleAddProduct() {
        const payload = {
            product_name: this.state.product_name,
            category: this.state.category,
            description: this.state.description
        }
        axios.post('api/v1/products/', payload)
            .then(response => {
                this.props.navigation.navigate("AddProduct");
            })
            .catch(error => {
                    console.log(error.response.data)
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('{"').pop().split('":')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );
    }

    render() {
        const {
            formContainerStyle,
            fieldStyle,
            textInputStyle,
            buttonContainerStyle,
            container,
        } = style;


        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={formContainerStyle}>
                    <View style={style.input}>
                        <TextInput
                            placeholder="Product Name"
                            autoCorrect={false}
                            autoCapitalize="none"
                            style={textInputStyle}
                            onChangeText={this.onProductNameChange.bind(this)}
                        />
                    </View>

                    <View style={style.input}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Description"
                            style={textInputStyle}
                            onChangeText={this.onDescriptionChange.bind(this)}
                        />
                    </View>
                    <View style={style.viewStyle}>
                        <Text style={style.textStyle}>{'Category'}</Text>
                        <View style={style.input}>

                            {/*<Image*/}
                            {/*    style={style.mapIcon}*/}
                            {/*    source={require('../assets/list.png')}*/}
                            {/*/>*/}

                            <ModalDropdown
                                placeholder="Select a category"

                                onSelect={(index, value) => {
                                    this.setState({selected: value})
                                }}
                                options={this.state.options}
                                onSelect={this.onCategoryChange.bind(this)}
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
                            <Icon name='label' />
                        </View>
                        {/*<View style={style.container}>*/}
                        {/*    <View style={style.row}>*/}
                        {/*        <View style={style.cell}>*/}

                        {/*            <ModalDropdown style={style.dropdown_6}*/}
                        {/*                           options={this.state.options}*/}
                        {/*                           onSelect={this.onCategoryChange.bind(this)}*/}
                        {/*                           >*/}

                        {/*            </ModalDropdown>*/}
                        {/*        </View>*/}

                        {/*    </View>*/}
                    </View>
                    <View style={buttonContainerStyle}>
                        <Button title='Add Product' onPress={() => this.handleAddProduct()}/>
                    </View>

                </View>
            </View>
        );
    }
}

export default AddProduct;

const style = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
    },
    formContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
        flex: 1,
        padding: 15
    },
    fieldStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 25
    },
    accountCreateTextStyle: {
        color: 'black'
    },
    accountCreateContainerStyle: {
        padding: 25,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        color: "black",
        alignItems: "center"
    },
    cell: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
    },
    dropdown_1: {
        flex: 1,
        top: 32,
        left: 8,
    },
    dropdown_6: {
        flex: 1,
        left: 8,
    },
    dropdown_6_image: {
        width: 40,
        height: 40,
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#FFFFFF',
    // },

    viewStyle: {
        margin: 10,
    },

    input: {
        height: 50,
        width: '100%',
        marginTop: 8,
        borderRadius: 2,
        borderColor: '#FFFFFF',
        fontSize: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconStyle: {
        margin: 20,
        alignSelf: 'flex-end'
    },
    mapIcon: {
        margin: 10,
        alignSelf: 'center',
    },
});

