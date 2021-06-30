import {Alert} from "react-native";
import Geolocation from 'react-native-geolocation-service';

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



export {showAlert}
