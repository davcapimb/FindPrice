import React, {Component} from "react";
import {Alert, Button, FlatList, Image, TouchableHighlight, Text, View} from "react-native";
import axios from "axios";
import {BackHandler} from "react-native";
import {showAlert} from "../../Utils";
import MapView from 'react-native-maps';
import {stylelist_view} from './styles';
class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        axios.get('api/v1/products')
            .then(response => {
                this.setState({data: response.data});


            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );
    }





    render() {
        const {data} = this.state;
        if (this.props.isAuthenticated) {
            const mytext = "ciao sono pepps";
            return (

                <SafeAreaView style={stylelist_view.center}>
                    <Image
                        style={stylelist_view.pizzaImage}
                        source={{
                            uri: "https://bit.ly/book-pizza",
                        }}
                    />

                    <Text style={stylelist_view.baseText}>FindPrice App</Text>
                    <Text style={stylelist_view.newText}>{mytext}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <Text style={stylelist_view.itemText}>
                                {item.product_name}, {item.category}
                            </Text>
                        )}
                    />
                    <Button
                        title="list Item, Click for Details"
                        onPress={() => this.props.navigation.navigate("AddProduct")}
                    />
                </SafeAreaView>
            );
        } else {
            return (
                <Text style={stylelist_view.newText}>No auth</Text>
            );
        }

    }
}

export default ListView;


