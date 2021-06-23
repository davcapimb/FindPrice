import React, {Component} from "react";
import {Alert, Button, FlatList, Image, TouchableHighlight, Text, View} from "react-native";
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from "../../Utils";
import MapView from 'react-native-maps';
import {ProductCard} from './styles';
import {getCurrentTimestamp} from "react-native/Libraries/Utilities/createPerformanceLogger";

export default class ProductsView extends Component {
    constructor(props) {
        super(props);
        this.state={
            scans:[],
            name:'',
            description:'',
            datatime: ''
        }
    }

    componentDidMount() {
        this.getProdScan();
        let dt = new Date("30 July 2010 15:05 UTC");
        dt = getCurrentTimestamp()
        console.log(dt);
        document.write(dt.toISOString());
        axios.get("api/v1/prodFilt?id="+ this.props.route.params.id )
          .then(response => {
              response.data.map((option) => {
                  this.setState(
                      {
                          name:option.product_name,
                          description:option.description
                      }
                  );
              })
          })
          .catch(error => {
                  for (const keys of Object.keys(error.response.data)){
                        showAlert(keys, error.response.data[keys].toString());
                }
              }
          );
    }

  getProdScan = (datatime) =>{
        var scs = [];

        axios.get("api/v1/prodScan?filter={\"lat\":\"37.4\",\"long\":\"-122\",\"id\":\""+ this.props.route.params.id + "\"," +
            "\"dt\":\""+ datatime +"\"}")
            .then(response => {
                response.data.map((option) => {
                    scs.push(
                        {
                            id:option.product,
                            scan_time:option.scan_time,
                            price: option.price
                        }
                    );
                })
                this.setState({scans: scs})
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
          <Text style={ProductCard.title}>{item.scan_time}</Text>
          <Text style={ProductCard.title}>{item.price}</Text>

      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
          <Text>
              {this.state.name}, {this.state.description}
          </Text>
        <FlatList
          data={this.state.scans}
          renderItem={this.renderProduct}
          keyExtractor={item => `${item.scan_time}`}
        />
      </View>
    );
  }
}
