import React, {Component} from "react";
import {Alert, Button, FlatList, Image, SafeAreaView, StyleSheet, Text} from "react-native";
import axios from "axios";
import {BackHandler} from "react-native";
const showAlert = (err, msg) =>
    Alert.alert(
        "Error " + err,
        msg,
        [
            {
                text: "Cancel",
                style: "cancel",
            },
        ],
    );

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
                BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);


            })
            .catch(error => {
                    showAlert(JSON.stringify(Object.keys(error.response.data)).split('["').pop().split('"]')[0], JSON.stringify(Object.values(error.response.data)).split('["').pop().split('.')[0]);
                }
            );
    }



  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Home');
    return true;
  };


    render() {
        const {data} = this.state;
        if (this.props.isAuthenticated) {
            const mytext = "ciao sono pepps";
            return (

                <SafeAreaView style={styles.center}>
                    <Image
                        style={styles.pizzaImage}
                        source={{
                            uri: "https://bit.ly/book-pizza",
                        }}
                    />
                    <Text style={styles.baseText}>FindPrice App</Text>
                    <Text style={styles.newText}>{mytext}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <Text style={styles.itemText}>
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
                <Text style={styles.newText}>No auth</Text>
            );
        }

    }
}

export default ListView;


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
    baseText: {
        color: "navy",
        fontSize: 30,
        fontStyle: "italic",
    },
    newText: {
        color: "red",
    },
    pizzaImage: {
        width: 200,
        height: 200,
    },
    itemText: {
        color: "green",
        fontSize: 20,
    }
});
