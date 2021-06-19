import React, {Component} from "react";
import {View, Text, Button} from "react-native";
import {styledetail_view} from './styles';
class DetailView extends Component {
    render() {
        return (
            <View style={styledetail_view.center}>
                <Text style={styledetail_view.title}>Detail View</Text>
                <Button
                    title="Click for Tabs"
                    onPress={() => this.props.navigation.navigate("Tabs")}
                />
            </View>
        );
    }
}


export default DetailView;
