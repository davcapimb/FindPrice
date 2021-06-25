import React, {Component} from "react";
import {Alert, Button, FlatList, Image, TouchableHighlight, Text, View, ImageBackground} from 'react-native';
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from "../../Utils";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {ProductCard, styleCategory} from './styles';
import {SearchBar} from 'react-native-elements';
import {images} from './styles';
import {styleProduct} from './styles';
import Geolocation from 'react-native-geolocation-service';


const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
export default class ProductsView extends Component {
    constructor(props) {
    super(props);
    this.state={
        products:[],
        search: '',
        matches:[],
        region:{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
    }
  }

    setRegion(region) {
        this.setState({ region });
    }

    getCurrentPosition (){
        try {
          Geolocation.getCurrentPosition(
            (position) => {
              const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              };
              this.setRegion(region);
            },
            (error) => {
              switch (error.code) {
                case 1:
                    Alert.alert("", "Please enable the location permissions");
                    break;
                default:
                  Alert.alert("", "Error while detecting your location");
              }
            }
          );
        } catch(e) {
          alert(e.message || "");
        }
      };

    componentDidMount() {
      var prods = [];
       this.getCurrentPosition();
       axios.get('api/v1/prodFilt?cat='+this.props.route.params.category)
          .then(response => {
              response.data.map((option) => {
                  prods.push(
                      {
                          id:option.id,
                          name:option.product_name

                      }
                  );
              })
              this.setState({products: prods})
              this.setState({matches: this.state.products});

          })
          .catch(error => {
              console.log("error")
                  // for (const keys of Object.keys(error.response.data)){
                  //       showAlert(keys, error.response.data[keys].toString());
                // }
              }
          );
  }

  onPressProduct = item => {
    const id = item.id;
    const category = this.props.route.params.category
    this.props.navigation.navigate('DetailView', { id, category });
    console.log(this.props.route.params.category)
  };

  renderProduct = ({ item }) => (


    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressProduct(item)}>

      <View style={ProductCard.container}>

        {/*<Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />*/}
        <Text style={ProductCard.title}>{item.name}</Text>

      </View>
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

    onRegionChange(region) {
      this.setState({ region });
    }
    render() {
        const {search} = this.state;
        return (
            <View>
                <SearchBar
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent',


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
                    //lightTheme
                    round
                    searchIcon

                    placeholder="Search..."
                    onChangeText={this.updateSearch}
                    value={search}
                    // onSubmitEditing={()}
                    // autoCapitalize={}
                />
                 <View style={styleProduct.topPhotoContainer}>
                     <ImageBackground style={styleCategory.categoriesPhoto} source={images[this.props.route.params.category].uri} >
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



