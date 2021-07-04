import React, {Component} from 'react';
import {Alert, FlatList, ImageBackground, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {images, ProductCard, styleCategory, styleProduct} from './styles';
import {SearchBar} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import styles from '../Home/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
export default class ProductsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: '',
            matches: [],

        };
    }

    setRegion(region) {
        this.setState({region});
    }


    componentDidMount() {
        var prods = [];
        axios.get('api/v1/prodFilt?cat=' + this.props.route.params.category)
            .then(response => {
                response.data.map((option) => {
                    prods.push(
                        {
                            id: option.id,
                            name: option.product_name,

                        },
                    );
                });
                this.setState({products: prods});
                this.setState({matches: this.state.products});

            })
            .catch(error => {
                    console.log('error');

                },
            );
    }

    onPressProduct = item => {
        const id = item.id;
        const category = this.props.route.params.category;
        this.props.navigation.navigate('DetailView', {id, category});
    };

    renderProduct = ({item}) => (


        <TouchableHighlight style={ProductCard.container} underlayColor="rgba(73,182,77,1,0.9)"
                            onPress={() => this.onPressProduct(item)}>
            <Text style={ProductCard.title}>{item.name}</Text>
        </TouchableHighlight>
    );

    updateSearch = (search) => {
        let match = [];
        let substring;
        this.setState({search});
        this.state.products.map((option) => {
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
                                                onPress={() => this.props.navigation.goBack('Draw')}
                        />
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
                <View style={styleProduct.topPhotoContainer}>
                    <ImageBackground style={styleCategory.categoriesPhoto}
                                     source={images[this.props.route.params.category].uri}>
                        <Text style={styleCategory.categoriesName}>{this.props.route.params.category}</Text>
                    </ImageBackground>

                </View>
                <FlatList
                    data={this.state.matches}
                    renderItem={this.renderProduct}
                    keyExtractor={item => `${item.id}`}
                />

            </View>
        );
    }
}



