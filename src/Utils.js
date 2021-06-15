import {Alert} from "react-native";

export const showAlert = (err, msg) =>
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