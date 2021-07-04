import React, {Component} from 'react';
import {FlatList, ImageBackground, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {showAlert} from '../../Utils';
import {images, styleCategory} from './styles';
import {SearchBar} from 'react-native-elements';
import styles from '../Home/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CategoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            search: '',
            matches: [],

        };
    }

    componentDidMount() {
        var categ = [];
        axios.get('categories')
            .then(response => {
                response.data.map((option, key) => {
                    categ.push(
                        {
                            id: key,
                            name: option.category,

                        },
                    );
                });

                this.setState({options: categ});
                this.setState({matches: this.state.options});
                console.log(this.state.options);
            })
            .catch(error => {
                    for (const keys of Object.keys(error.response.data)) {
                        showAlert(keys, error.response.data[keys].toString());
                    }
                },
            );

    }

    onPressCategory = item => {
        const title = item.name;
        const category = title;
        this.props.navigation.navigate('ProductsView', {category});
    };

    renderCategory = ({item}) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)" style={{borderRadius: 50}}
                            onPress={() => this.onPressCategory(item)}>
            <View style={styleCategory.categoriesItemContainer}>
                <ImageBackground style={styleCategory.categoriesPhoto} source={images[item.name].uri}>
                    <Text style={styleCategory.categoriesName}>{item.name}</Text>
                </ImageBackground>

            </View>
        </TouchableHighlight>
    );
    updateSearch = (search) => {
        let match = [];
        let substring;
        this.setState({search});
        this.state.options.map((option) => {
            substring = option.name.substring(0, search.length);

            if (substring === search.toLowerCase()) {
                match.push(option);
                console.log(match);
            }

        });
        this.setState({matches: match});
    };

    render() {
        const {search} = this.state;
        return (
            <View style={styleCategory.container}>
                <View style={styleCategory.headerContainer}>
                    <TouchableOpacity style={styles.bottomView}>
                        <MaterialCommunityIcons name="home" color={'#EDEDED'} size={40}
                                                onPress={() => this.props.navigation.goBack('Draw')}/>
                    </TouchableOpacity>
                    <SearchBar
                        containerStyle={{
                            backgroundColor: 'transparent',
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                            width: '85%',


                        }}
                        inputContainerStyle={{
                            backgroundColor: '#EDEDED',
                        }}
                        inputStyle={{
                            backgroundColor: '#EDEDED',
                            borderRadius: 10,
                            color: 'black',
                        }}

                        clearIcon
                        round
                        searchIcon

                        placeholder="Search..."
                        onChangeText={this.updateSearch}
                        value={search}

                    />
                </View>
                <FlatList
                    data={this.state.matches}
                    renderItem={this.renderCategory}
                    keyExtractor={item => `${item.id}`}
                />

            </View>
        );
    }
}




