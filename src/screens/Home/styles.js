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


  },
  logoView:{
    alignItems: 'center',

  },
  listView:{

  },
  logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#bb9d84",
        marginBottom: 40,
        alignItems: 'center',
    },
});

export default styles;
