import {StyleSheet} from 'react-native';

const styleLogin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d333b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#rgb(213,133,0)",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#EDEDED",
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
        color: "#ceecf9"
    }
});

const styleRegister = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: '#2d333b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#rgb(213,133,0)",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#EDEDED",
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
    }
});

export {styleRegister, styleLogin}
