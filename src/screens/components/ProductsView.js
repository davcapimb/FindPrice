// import React, { Component } from 'react';
// import {View, Text, Image, Platform, StatusBar, TouchableHighlight, FlatList} from 'react-native';
// import CompleteFlatList from 'react-native-complete-flatlist';
// import {styleCategory} from './styles';

//
// const data = [
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
//   { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
//   { name: 'Ali', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Abu', status: 'Active', time: '8:11 PM', date: '1 Jan 2018' },
//   { name: 'Fitri', status: 'Active', time: '8:20 PM', date: '1 Jan 2018' },
//   { name: 'Armi', status: 'Active', time: '8:33 PM', date: '1 Jan 2018' },
//   { name: 'Eidit', status: 'Active', time: '9:10 PM', date: '1 Jan 2018' },
//   { name: 'Hamdan', status: 'Active', time: '10:10 PM', date: '1 Jan 2018' },
//   {
//     name: 'Muhyiddeen',
//     status: 'Blocked',
//     time: '10:10 PM',
//     date: '9 Feb 2018',
//   },
// ];
//
// export default class ListView extends Component {
//   cell = ({data,index}) => {
//     const item = data.cleanData ? data.cleanData : data
//
//     console.log(data.cleanData)
//     console.log('data.cleanData will be not null if search bar is not empty and prop highlightColor is not empty. caution, data without search is not same like data with search due to implement the highlight component. data.cleanData is equal to data')
//
//     console.log('this is index number : '+index)
//
//     console.log(item+' this is original data')
//
//     return <Text>{data.name}</Text>;
//   }
//
//   render() {
//     return (
//       <CompleteFlatList
//       searchKey={['name', 'status', 'time', 'date']}
//       pullToRefreshCallback={() => {
//         alert('refreshing');
//       }}
//       data={data}
//       renderSeparator={null}
//       renderItem={this.cell}
//     />
//     );
//   }
// }

import React, {Component} from "react";
import {Alert, Button, FlatList, Image, TouchableHighlight, Text, View} from "react-native";
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from "../../Utils";
import MapView from 'react-native-maps';
import {ProductCard} from './styles';

export default class ProductsView extends Component {
    constructor(props) {
    super(props);
    this.state={
        products:[],
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
              console.log(this.state.products)
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

  render() {
    return (
      <View>
        <FlatList
          data={this.state.products}
          renderItem={this.renderProduct}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}



