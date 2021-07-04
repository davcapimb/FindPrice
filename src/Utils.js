import {Alert} from 'react-native';

const showAlert = (err, msg) =>
    Alert.alert(
        'Error ' + err,
        msg,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ],
    );


export {showAlert};
