import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_MARGIN = 5;

export const RecipeCard = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccccc',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: RECIPE_ITEM_MARGIN,
        marginRight: RECIPE_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
        height: RECIPE_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,


    },
    photo: {
        marginTop: '10%',
        marginBottom: '5%',
        width: '50%',
        height: '70%',
        resizeMode: 'cover',
        aspectRatio: 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    title: {
        flex: 1,
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2d333b',
        marginTop: -8,
        marginRight: 5,
        marginLeft: 5,
    },
    category: {
        marginTop: 5,
        marginBottom: 5,
    },
});
