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
        this.state = {
          search: '',
      };
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

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
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        {/*<Image style={styles.photo} source={{ uri: item.photo_url }} />*/}
        <Text style={styles.title}>{"Ciao"}</Text>
        <Text style={styles.category}>{"Ciao"}</Text>
      </View>
    </TouchableHighlight>
  );


  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    return (

      <View>
          <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        {/*<Image style={styles.photo} source={{ uri: item.photo_url }} />*/}
        <Text style={styles.title}>{"Ciao"}</Text>
        <Text style={styles.category}>{"Ciao"}</Text>
      </View>
    </TouchableHighlight>
        {/*<FlatList*/}
        {/*  vertical*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*  numColumns={2}*/}
        {/*  data={recipes}*/}
        {/*  renderItem={this.renderRecipes}*/}
        {/*  // keyExtractor={item => `${item.recipeId}`}*/}
        {/*/>*/}
      </View>
    );
  }
}
