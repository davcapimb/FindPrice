import React, {Component} from 'react';
import axios from 'axios';
import {Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Icon, Button} from 'react-native-elements';
import {showAlert} from '../../Utils';
import {styleAddProduct, styleScan} from './styles';

class AddProduct extends Component {
    state = {
        product_name: '',
        category: '',
        description: '',
        options: [],
    };

    componentDidMount() {
        var categ = [];
        axios.get('categories')
            .then(response => {
                response.data.map((option, key) => {
                    categ.push(option.category);
                });
                this.setState({options: categ});
            })
            .catch(error => {
                    for (const keys of Object.keys(error.response.data)) {
                        showAlert(keys, error.response.data[keys].toString());
                    }
                },
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
            description: this.state.description,
        };
        axios.post('api/v1/products/', payload)
            .then(response => {
                this.descInput.clear();
                this.prodInput.clear();
                ToastAndroid.show('New product added!', ToastAndroid.LONG);
                this.props.navigation.navigate({name:'Tab', key:'AddProduct'});
            })
            .catch(error => {
                    for (const keys of Object.keys(error.response.data)){
                        showAlert(keys, error.response.data[keys].toString());
                }
                    },
            );
    }


    render() {
        return (
            <View style={styleScan.container}>
                <Text style={styleScan.logo}>Add Product</Text>

                    <View style={styleScan.inputView}>
                        <TextInput
                            style={styleScan.inputText}
                            placeholder="Product Name"
                            autoCorrect={false}
                            autoCapitalize="none"
                            ref={input => {
                                this.prodInput = input;
                            }}
                            onChangeText={this.onProductNameChange.bind(this)}
                        />
                    </View>

                    <View style={styleScan.inputView}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Description"
                            style={styleScan.inputText}
                            ref={input => {
                                this.descInput = input;
                            }}
                            onChangeText={this.onDescriptionChange.bind(this)}
                        />
                    </View>

                        <View style={styleScan.dropdownViewStyle}>

                            <ModalDropdown
                                defaultValue="Select a category"

                                onSelect={(index, value) => {
                                    this.setState({selected: value});
                                }}
                                options={this.state.options}
                                onSelect={this.onCategoryChange.bind(this)}
                                dropdownTextStyle={styleScan.dropdownTextStyle}
                                textStyle={styleScan.textStyle}
                                dropdownStyle={styleScan.dropdownStyle}
                                style={styleScan.styledrop}
                            />

                        </View>
                    <TouchableOpacity style={styleScan.loginBtn} onPress={() => this.handleAddProduct()}>
                        <Text style={styleScan.buttonText}>Add Product</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

export default AddProduct;



