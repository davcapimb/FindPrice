import {StyleSheet} from 'react-native';

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


const styledetail_view = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
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
        fontSize: 50,
        color: "#bb9d84",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#ceecf9",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "#003f5c"
    },
    forgot: {
        color: "#ceecf9",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#bb9d84",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "#ceecf9"
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
        width: "80%",
        backgroundColor: "#ceecf9",
        borderRadius: 30,
        height: 60,
        marginBottom: 20,
        justifyContent: "center",
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
        color:"#bb9d84",
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

export {styleAddProduct, styleScan, stylelist_view, styledetail_view}