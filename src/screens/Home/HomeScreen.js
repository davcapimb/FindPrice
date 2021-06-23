import React from 'react';
import {FlatList, ScrollView, Text, View, TouchableHighlight, Image, BackHandler, Alert} from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import MenuImage from '../../components/MenuImage/MenuImage';
// import DrawerActions from 'react-navigation';
// import { getCategoryName } from '../../data/MockDataAPI';
const DATA = [
  {
    id: "ScanTAB",
    title: "Add Scan",
  },
  {
    id: "MapTAB",
    title: "Product Map",
  },
  {
    id: "ProductTAB",
    title: "Add Product",
  },
    {
    id: "ListView",
    title: "Product List",
  },

];

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        (async ()=>{
            let token = await AsyncStorage.getItem("id_token")
            if(token){
                await AsyncStorage.setItem("id_token",token)
                axios.defaults.headers.common['Authorization'] = 'Token ' + token;
                this.props.navigation.navigate("Tab");
            }
            else{
                this.props.navigation.navigate("Login")
            }
        })()

    }
    componentDidUpdate() {
        if (!this.props.navigation.isFocused()) {
            // console.log("HomeScreen not focus", this.props.navigation.isFocused())
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        }
        else{
            // console.log("HomeScreen in focus", this.props.navigation.isFocused())
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
        )

        return true;
    }


    onPressComponent = item => {
        this.props.navigation.navigate( item.id );
    };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressComponent(item)} style={styles.container}>
      <View >
        {/*<Image style={styles.photo} source={{ uri: item.photo_url }} />*/}
        <Text style={styles.title}>{item.title}</Text>
        {/*<Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>*/}
      </View>
    </TouchableHighlight>
  );




  render() {

    return (

      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={DATA}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

