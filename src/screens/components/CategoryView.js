import React, {Component} from "react";
import {Alert, Button, FlatList, Image, TouchableHighlight, Text, View} from "react-native";
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from "../../Utils";
import MapView from 'react-native-maps';
import {styleCategory} from './styles';
import {SearchBar} from 'react-native-elements';
export default class CategoryView extends Component {
    constructor(props) {
    super(props);
    this.state={
        options:[],
        search: '',
        matches:[]
    }
  }

      componentDidMount() {
        var categ = [];
        axios.get('categories')
            .then(response => {
                response.data.map((option, key) => {
                    categ.push(
                        {
                            id:key,
                            name:option.category
                        }
                    );
                })
                this.setState({options: categ});
                this.setState({matches:this.state.options});
                console.log(this.state.options);
            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );

    }

    onPressCategory = item => {
    const title = item.name;
    const category = title;
    this.props.navigation.navigate('ProductsView',{category});
  };

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
      <View style={styleCategory.categoriesItemContainer}>
        {/*<Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />*/}
        <Text style={styleCategory.categoriesName}>{item.name}</Text>

      </View>
    </TouchableHighlight>
  );
  updateSearch = (search) => {
      let match=[];
      let substring;
      this.setState({ search });
      this.state.options.map((option)=>{
          substring = option.name.substring(0,search.length);

          if (substring === search.toLowerCase()){
              match.push(option);
              console.log(match);
          }

      })
      this.setState({matches:match});
  };

  render() {
    const { search } = this.state;
    return (
      <View>
          <SearchBar
            containerStyle={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',


            }}
            inputContainerStyle={{
              backgroundColor: '#EDEDED'
            }}
            inputStyle={{
              backgroundColor: '#EDEDED',
              borderRadius: 10,
              color: 'black'
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
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}


// {
//     "navigation": {
//         "addListener": [Function addListener], "canGoBack":
//         [Function canGoBack], "dangerouslyGetParent":
//         [Function dangerouslyGetParent], "dangerouslyGetState":
//         [Function anonymous], "dispatch": [Function dispatch],
//         "goBack": [Function anonymous], "isFocused":
//          [Function isFocused], "navigate": [Function anonymous],
//         "pop": [Function anonymous], "popToTop": [Function anonymous],
//         "push": [Function anonymous], "removeListener": [Function removeListener],
//         "replace": [Function anonymous], "reset": [Function anonymous],
//         "setOptions": [Function setOptions], "setParams": [Function anonymous]
//     },
//     // "route": {"key": "ProductsView-Edv5cbjvdE89wn_BYEghs", "name": "ProductsView",
//     // "params": {"category": "giocattoli"}}}

