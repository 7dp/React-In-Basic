import React from 'react'
import { TextInput } from 'react-native'
import { exp } from 'react-native/Libraries/Animated/src/Easing'

class EditText extends React.Component {

    // const [value, onChangeText] = React.useState('Useless Placeholder');
    state = {
        // onChangeText: onChangeText,
        username: "",
        password: ""
    }

    render() {
        return(
            <TextInput
                style = {{ 
                    height: 40, 
                    borderColor: 'gray', 
                    borderRadius: 8,
                    borderWidth: 1,
                    flex: 1,
                    placeholderTextColor: 'gray', 
                }}
                // onChangeText = {text => this.setState({text: text})}
                // value = {this.state.text}
                // placeholder = {this.props.placeholder}
                // value = {}
                placeholder = "Username"
                underlineColorAndroid = 'gray'
                // onChangeText = {onChangeText}
            />
        )
    }
}

export default EditText