import React, {Component} from "react";
import {Alert, Button, FlatList, Image, TouchableHighlight, Text, View, ImageBackground} from 'react-native';
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from "../../Utils";
import MapView from 'react-native-maps';
import {ProductCard} from './styles';
import {getCurrentTimestamp} from "react-native/Libraries/Utilities/createPerformanceLogger";
import Geolocation from 'react-native-geolocation-service';
import {styleDetail} from './styles';



export default class ProductsView extends Component {
    constructor(props) {
        super(props);
        this.state={
            scans:[],
            name:'',
            description:'',
            datetime:new Date()
        }
        this.animationValue = new Animated.Value(0)
    }

    componentDidMount() {
        let dt = new Date();
         this.getCurrentPosition();

        this.setState({datetime:dt});
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

  getProdScan = () =>{

        let scs = this.state.scans;
        axios.get("api/v1/prodScan?filter={" +
            "\"lat\":\""+this.state.region.latitude+"\"," +
            "\"long\":\""+this.state.region.longitude+"\"," +
            "\"id\":\""+ this.props.route.params.id + "\"," +
            "\"dt\":\""+ this.state.datetime.toISOString() +"\"" +
            "}")
            .then(response => {
                response.data.map((option) => {
                    scs.push(
                        {
                            id:option.product,
                            scan_time:option.scan_time,
                            price: option.price
                        }
                    );
                    this.setState({datetime:new Date(option.scan_time)})

                })
                this.setState({scans: scs})
            })
            .catch(error => {
                console.log("error")
                // for (const keys of Object.keys(error.response.data)){
                //     showAlert(keys, error.response.data[keys].toString());

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

   onRegionChange(region) {
      this.setState({ region });
      console.log(this.state.region);
      this.setState({scans:[]});
      this.getProdScan();
    }

  render() {
    return (
      <View>
          <View style={styleDetail.topPhotoContainer}>
              <ImageBackground style={styleCategory.categoriesPhoto} source={images[this.props.route.params.category].uri} >
                  <Text style={styleCategory.categoriesName}>{this.state.name}{"\n"}{this.state.description}</Text>
              </ImageBackground>
          </View>
          <View style={styleDetail.flatContainer}>
          <FlatList
              data={this.state.scans}
              renderItem={this.renderProduct}
              keyExtractor={item => `${item.scan_time}`}
            onEndReached={this.getProdScan}
          />
              </View>
          <View style={styleDetail.bottomMapContainer}>
              <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  showsUserLocation
                  style={styleDetail.map}
                  region={this.state.region}
                  // onRegionChangeComplete={this.onRegionChange.bind(this)}
              >
                  {this.state.markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      coordinate={marker.coordinate}
                      // title={"ciao"}
                      // description={"ueeee"}
                    />
                  ))}
              </MapView>
          </View>
      </View>
    );
  }
}
