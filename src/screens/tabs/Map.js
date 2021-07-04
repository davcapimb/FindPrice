import React, {Component} from 'react';
import {StyleSheet, View, Alert, BackHandler} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {showAlert} from '../../Utils'; // remove PROVIDER_GOOGLE import if not using Google Maps

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class Map extends Component {
    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        datetime: new Date(),
        markers: [],
        products: [],
    };


    setRegion(region) {
        this.setState({region});
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
                            Alert.alert('', 'Please enable the location permissions');
                            break;
                        default:
                            Alert.alert('', 'Error while detecting your location');
                    }
                },
            );
        } catch (e) {
            alert(e.message || '');
        }
    };


    componentDidMount() {

        this.setState({region: this.getCurrentPosition()});
        let prods = [];
        axios.get('api/v1/prodFilt')
            .then(response => {
                response.data.map((option) => {
                    prods[option.id] = option.product_name;
                    // prods.push(
                    //     {
                    //         id:option.id,
                    //         name:option.product_name
                    //
                    //     }
                    // );
                });
                this.setState({products: prods});
            })
            .catch(error => {
                    console.log('error');
                    // for (const keys of Object.keys(error.response.data)){
                    //       showAlert(keys, error.response.data[keys].toString());
                    // }
                },
            );

    }

    getProdScan() {
        let marks = [];
        let dt = new Date();
        this.setState({datetime: dt});
        axios.get('api/v1/prodScan?filter={' +
            '"lat":"' + this.state.region.latitude + '",' +
            '"long":"' + this.state.region.longitude + '",' +
            '"id":"*",' +
            '"dt":"' + this.state.datetime.toISOString() + '"' +
            '}')
            .then(response => {
                response.data.map((option, key) => {
                    marks.push(
                        {
                            id: option.product,
                            key: option.id,
                            coordinate: {
                                latitude: parseFloat(option.lat),
                                longitude: parseFloat(option.long),
                            },
                            price: option.price,
                            prod_name: this.state.products[option.product],
                        },
                    );

                });
                this.setState({markers: marks});
            })
            .catch(error => {
                    console.log(error);
                    // for (const keys of Object.keys(error.response.data)){
                    //     showAlert(keys, error.response.data[keys].toString());

                },
            );
    }

    onRegionChange(region) {
        this.setState({region});
        this.getProdScan();
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
                            key={marker.key}
                            coordinate={marker.coordinate}
                            title={marker.prod_name}
                            description={'€' + marker.price}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
export default Map;
