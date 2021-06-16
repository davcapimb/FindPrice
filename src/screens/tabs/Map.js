import React, {Component} from "react";
import {StyleSheet, View, Alert, BackHandler} from "react-native";
import MapView, { PROVIDER_GOOGLE , Marker} from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import axios from "axios";
import {showAlert} from "../../Utils"; // remove PROVIDER_GOOGLE import if not using Google Maps

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class Map extends Component {
    state = {
        region:{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
        markers:[],
    }

    setRegion(region) {
        this.setState({ region });
    }

    getCurrentPosition() {
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
        this.setState({region:this.getCurrentPosition()})
        let marks = [];
        let mark = {};
        axios.get('api/v1/scans')
            .then(response => {
                response.data.map((product,key) => {
                    mark = {
                        id: key,
                        coordinate:{
                            latitude:parseFloat(product.lat),
                            longitude:parseFloat(product.long)
                        }
                    }
                    marks.push(mark)
                })
                console.log(marks)
                this.setState({markers: marks});
            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );

    }

    onRegionChange(region) {
      this.setState({ region });
    }

    render() {
        return (
          <View style={styles.container}>
              <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  showsUserLocation
                  style={styles.map}
                  region={this.state.region}
                  onRegionChangeComplete={this.onRegionChange.bind(this)}
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
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
    },
    container: {
   ...StyleSheet.absoluteFillObject,
   height: 650,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});
export default Map;
