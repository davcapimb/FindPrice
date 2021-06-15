import React, {Component} from "react";
import Login from "./Login";

class Logout extends Component {
    componentDidMount() {
        this.props.auth(false);
        this.props.navigation.navigate('Login')
    }
    render() {
        return null;
    }
}
export default Logout;
