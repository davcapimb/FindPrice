import {StyleSheet, Dimensions} from 'react-native';

const styleAddProduct = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
    },
    formContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
        flex: 1,
        padding: 15
    },
    fieldStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 25
    },
    accountCreateTextStyle: {
        color: 'black'
    },
    accountCreateContainerStyle: {
        padding: 25,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        color: "black",
        alignItems: "center"
    },
    cell: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
    },
    dropdownTextStyle: {
        backgroundColor: '#fff',
        fontSize: 18,
        color: '#000000'
    },
    textStyle: {
        fontSize: 18,
        color: '#8D918D',
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    dropdownStyle: {
        flex: 1,
        width: '90%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3'
    },
    styledrop: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },

    viewStyle: {
        margin: 10,
    },

    input: {
        height: 50,
        width: '100%',
        marginTop: 8,
        borderRadius: 2,
        borderColor: '#FFFFFF',
        fontSize: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconStyle: {
        margin: 20,
        alignSelf: 'flex-end'
    },
    mapIcon: {
        margin: 10,
        alignSelf: 'center',
    },
});
const stylelist_view = StyleSheet.create({
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
const styleScan = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d333b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#rgb(213,133,0)",
        marginBottom: 40
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "80%",
        backgroundColor: "#EDEDED",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        padding: 20
    },
    icon:{
        aspectRatio: 1,
        height: '15%',
        width: '15%',

    },
    button: {
        flex:1,
        justifyContent:'flex-end',
        flexDirection: 'row',
        marginRight:0,
    },
    inputText: {
        flex:1,
        height: 50,
        color: "#000910"
    },
    forgot: {
        color: "#EDEDED",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#rgb(213,133,0)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "#EDEDED"
    },
    image: {
        height: 300,
        width: 300,
        marginTop: 30,
        borderRadius: 10,
    },
    dropdownTextStyle: {
        backgroundColor: '#fff',
        fontSize: 14,
        color: '#000000'
    },
        dropdownViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "80%",
        backgroundColor: "#EDEDED",
        borderRadius: 25,
        height: 60,
        marginBottom: 20,
        padding: 20
    },
    textStyle: {
        fontSize: 15,
        color: '#8D918D',
        alignSelf: 'flex-start',
        marginLeft: 10,

    },
    dropdownStyle: {
        flex: 1,
        color:"#rgb(213,133,0)",
        width: '60%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3'

    },
    styledrop: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
    },
});
const styleDetail = StyleSheet.create({
    topPhotoContainer:{
        // marginTop:"5%",
        width:"80%",
        height:"16%",
        marginLeft:"10%",
        borderColor:"#000000",
        borderRadius:20,
        overflow: 'hidden',
        backgroundColor:"#000000",
        marginTop:-22,
    },

    flatContainer:{
         marginTop:"3%",
        width:"90%",
        height:"30%",
        marginLeft:"5%",
        borderColor:"#000000",
        borderRadius:20,
        overflow: 'hidden'
    },

    bottomMapContainer:{
        marginTop:"5%",
        width:"80%",
        marginLeft:"10%",
        height:"40%",
        borderRadius:20,
        overflow: 'hidden',
    },
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
})
const styleProduct = StyleSheet.create({
    topPhotoContainer:{
        marginTop:"5%",
        width:"80%",
        height:"30%",
        marginLeft:"10%",
        borderColor:"#000000",
        borderRadius:20,
        overflow: 'hidden',
        backgroundColor:"#000000"
    },
})
const styleCategory = StyleSheet.create({
    container: {
        backgroundColor: '#2d333b',
        height: '100%',
    },
    categoriesItemContainer: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,
        overflow: 'hidden',
      },
    categoriesPhoto: {
        width: '100%',
        height: '100%',


        shadowColor: 'blue',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,

      },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor:'rgba(54,53,53,0.33)',
      borderRadius: 20,

  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        height: 60,
        marginBottom: 20,
        padding: 20
    },
});


// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_MARGIN = 15;

// 2 photos per width
const ProductCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "10%",
    marginRight: RECIPE_ITEM_MARGIN,
    marginTop: 10,
    width: "80%",
    height: "40%",
    borderColor: 'rgba(54,53,53,1)',
    borderWidth: 0.5,
    borderRadius: 15,
      backgroundColor: '#EDEDED'
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(54,53,53,1)',
    marginRight: 5,
    marginLeft: 5,
      marginTop:8,
      marginBottom:8,
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});

const images = {
  alimenti: {
    uri: require('../../../assets/alimenti.jpg')
  },
  giocattoli: {
    uri: require('../../../assets/giocattoli.jpg')
  },
    casa: {
    uri: require('../../../assets/casa.jpg')
  },
    undefined: {
    uri: require('../../../assets/undefined.jpg')
  },
    giardino: {
    uri: require('../../../assets/giardino.jpg')
  },
    elettronica: {
    uri: require('../../../assets/elettronica.jpg')
  },
    ScanTAB:{
      uri: require('../../../assets/ScanTAB.png')
    },
    MapTAB:{
      uri: require('../../../assets/MapTAB.png')
    },
    ProductTAB:{
      uri: require('../../../assets/ProductTAB.png')
    },
    ListView:{
      uri: require('../../../assets/ListView.png')
    },
    Marker:{
      uri: require('../../../assets/marker.png')
    }


}



export {styleAddProduct, styleScan, stylelist_view, styleCategory, ProductCard, images, styleProduct, styleDetail}
