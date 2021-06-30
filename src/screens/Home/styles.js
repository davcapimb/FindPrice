import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  mainView:{
      height:"100%",
      width: "100%",
      backgroundColor:"#2d333b",
  },

    imageInCard:{
      alignItems: 'center',
    },
  bottomView:{
      flex:1,
      height: 40,
      width: 40,
      marginRight:'5%'

  },
  logoView:{
    alignItems: 'center',

  },
  listView:{

  },
  logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#rgb(213,133,0)",
        marginBottom: 40,
        alignItems: 'center',
    },
});

export default styles;
