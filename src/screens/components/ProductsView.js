import React, {Component} from "react";
import {Alert, Button, FlatList, Image, TouchableHighlight, Text, View} from "react-native";
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from "../../Utils";
import MapView from 'react-native-maps';
import {ProductCard} from './styles';
import {SearchBar} from 'react-native-elements';

export default class ProductsView extends Component {
    constructor(props) {
    super(props);
    this.state={
        products:[],
        search: '',
        matches:[]
    }
  }

    componentDidMount() {
      var prods = [];
      console.log(this.props.route.params.category);
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
                  for (const keys of Object.keys(error.response.data)){
                        showAlert(keys, error.response.data[keys].toString());
                }
              }
          );
  }

  onPressProduct = item => {
    const id = item.id;
    this.props.navigation.navigate('DetailView', { id });
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
                <FlatList
                  data={this.state.matches}
                  renderItem={this.renderProduct}
                  keyExtractor={item => `${item.id}`}
                />
            </View>
    );
  }
}



