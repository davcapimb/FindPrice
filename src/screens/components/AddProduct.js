import React, {Component} from 'react';
import axios from 'axios';
import {Text, TextInput, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Icon, Button} from 'react-native-elements';
import {showAlert} from '../../Utils';
import {styleAddProduct} from './styles';

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
                this.props.navigation.navigate('AddProduct');
            })
            .catch(error => {
                    for (const keys of Object.keys(error.response.data)){
                        showAlert(keys, error.response.data[keys].toString());
                }
                    },
            );
    }

    render() {
        const {
            formContainerStyle,
            textInputStyle,
            buttonContainerStyle,
        } = styleAddProduct;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={formContainerStyle}>
                    <View style={styleAddProduct.input}>
                        <TextInput
                            placeholder="Product Name"
                            autoCorrect={false}
                            autoCapitalize="none"
                            style={textInputStyle}
                            ref={input => {
                                this.prodInput = input;
                            }}
                            onChangeText={this.onProductNameChange.bind(this)}
                        />
                    </View>

                    <View style={styleAddProduct.input}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Description"
                            style={textInputStyle}
                            ref={input => {
                                this.descInput = input;
                            }}
                            onChangeText={this.onDescriptionChange.bind(this)}
                        />
                    </View>
                    <View style={styleAddProduct.viewStyle}>
                        <View style={styleAddProduct.input}>

                            {/*<Image*/}
                            {/*    style={style.mapIcon}*/}
                            {/*    source={require('../assets/list.png')}*/}
                            {/*/>*/}

                            <ModalDropdown
                                defaultValue="Select a category"

                                onSelect={(index, value) => {
                                    this.setState({selected: value});
                                }}
                                options={this.state.options}
                                onSelect={this.onCategoryChange.bind(this)}
                                dropdownTextStyle={styleAddProduct.dropdownTextStyle}
                                textStyle={styleAddProduct.textStyle}
                                dropdownStyle={styleAddProduct.dropdownStyle}
                                style={styleAddProduct.styledrop}
                            />
                            <Icon name="label"/>
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
                        <Button title="Add Product" onPress={() => this.handleAddProduct()}/>
                    </View>

                </View>
            </View>
        );
    }
}

export default AddProduct;



