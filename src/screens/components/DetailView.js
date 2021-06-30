import React, {Component} from "react";
import {Alert, Animated, Easing, FlatList, Image, TouchableHighlight, Text, View, ImageBackground} from 'react-native';
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from '../../Utils';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {images, ProductCard, styleCategory} from './styles';
import {getCurrentTimestamp} from "react-native/Libraries/Utilities/createPerformanceLogger";
import Geolocation from 'react-native-geolocation-service';
import {styleDetail} from './styles';

const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = 0.5;

export default class ProductsView extends Component {
    constructor(props) {
        super(props);
        this.state={
            scans:[],
            name:'',
            description:'',
            datetime:new Date(),
            region:{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0,
              longitudeDelta: 0,
            },
            markers:[],


        }
        this.animationValue = new Animated.Value(0)
    }
    setRegion(region) {
        this.setState({ region:region});
        this.getProdScan();
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
        let dt = new Date();
        this.setState({datetime:dt});
        this.getCurrentPosition();
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

  getProdScan = (toEnd) =>{
        let scs;
        if(toEnd){
            scs = this.state.scans;
        }
        else {
            scs = [];
        }

        axios.get("api/v1/prodScan?filter={" +
            "\"lat\":\""+this.state.region.latitude+"\"," +
            "\"long\":\""+this.state.region.longitude+"\"," +
            "\"id\":\""+ this.props.route.params.id + "\"," +
            "\"dt\":\""+ this.state.datetime.toISOString() +"\"" +
            "}")
            .then(response => {
                response.data.map((option, key) => {
                    scs.push(
                        {
                            id:option.product,
                            key:option.id,
                            scan_time:option.scan_time,
                            price: option.price,
                            coordinate:{
                                latitude:parseFloat(option.lat),
                                longitude:parseFloat(option.long)
                            }
                        }
                    );

                })
                this.setState({scans: scs})
            })
            .catch(error => {
                console.log(error)
                // for (const keys of Object.keys(error.response.data)){
                //     showAlert(keys, error.response.data[keys].toString());

            }
            );
  }

   onPressScan (item){

        let marks=  [];
        marks.push(
            {
                id:item.key,
                coordinate: item.coordinate,
                price: item.price,
            }
        );
        const region = {
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA/500,
            longitudeDelta: LONGITUDE_DELTA/500,
        };
        this.onRegionChange(region);
        this.setState({markers:marks});
  };

  renderScan = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressScan(item)}>
      <View style={ProductCard.container}>
        {/*<Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />*/}
          <Text style={ProductCard.title}>{item.scan_time}</Text>
          <Text style={ProductCard.title}>{item.price}</Text>

      </View>
    </TouchableHighlight>
  );

   onRegionChange(region) {
        this.setState({ region });
        let dt = new Date();
        let empty = [];
        this.setState({datetime: dt, scans: empty});
        this.getProdScan(false);
   }

   async onEndReached(){
       let data = this.state.scans;
       if(data.length >= 10) {
           await this.setState({datetime:new Date(data[data.length-1].scan_time)});
           this.getProdScan(true)
       }

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
                  renderItem={this.renderScan}
                  keyExtractor={item => `${item.scan_time}`}
                  onEndReached={this.onEndReached.bind(this)}
              />
          </View>
          <View style={styleDetail.bottomMapContainer}>
              <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  showsUserLocation
                  style={styleDetail.map}
                  region={this.state.region}
                  onRegionChangeComplete={this.onRegionChange.bind(this)}
              >
                  {this.state.markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      coordinate={marker.coordinate}

                      //title={"ciao"}
                      description={marker.price}
                    >
                        <Image
                            style={{
                                width:36,
                                height:36

                            }}
                            source={images['Marker'].uri}
                        />
                    </Marker>
                  ))}
              </MapView>
          </View>
      </View>
    );
  }
}
