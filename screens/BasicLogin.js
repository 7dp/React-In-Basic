import React, {Component} from 'react'
import { Text, View, TextInput, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HomePage from './HomePage'
import UserSession from '../utils/UserSession'
import AsyncStorage from '@react-native-async-storage/async-storage'

class BasicLogin extends Component {

    constructor() {
        super()
        
        this.state = {
            username: "",
            password: ""
            // user: UserSession()
        }
        AsyncStorage.getItem("key_user", (error, result) => {
            console.log(result)
            if (result) {
                alert("Sudah ada gan")
                this.props.navigation.navigate("HomePage")
            }
        })
    }
    
    render() {
        return(
            <View
                style = {{
                    justifyContent: 'center',
                    // alignItems: 'center',
                    padding: 20,
                    flex: 1
                }}
            >
                <Text
                    style = {{
                        color: 'black',
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >
                    Login
                </Text>

                <TextInput
                    style = {{ 
                        height: 40, 
                        borderColor: 'gray', 
                        borderRadius: 8,
                        borderWidth: 1,
                        marginTop: 44,
                        padding: 8,
                        placeholderTextColor: 'gray'
                    }}
                    onChangeText = {(username) => {
                        this.setState({ username })
                    }}
                    value = {this.state.username}
                    placeholder = "Username"
                    underlineColorAndroid = 'gray'
                />

                <TextInput
                    style = {{ 
                        height: 40, 
                        borderColor: 'gray', 
                        borderRadius: 8,
                        borderWidth: 1,
                        marginTop: 16,
                        padding: 8,
                        placeholderTextColor: 'gray'
                    }}
                    onChangeText = {(password) => {
                        this.setState({ password })
                    }}
                    value = {this.state.password}
                    placeholder = "Password"
                    underlineColorAndroid = 'gray'
                    secureTextEntry = {true}
                />

                <TouchableOpacity
                    activeOpacity = {0.5}
                    disabled = {this.isInvalidData()}
                    style = {{
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: this.isInvalidData() ? 'gray' : 'blue',
                        borderRadius: 8,
                        height: 40,
                        justifyContent: 'center',
                        marginTop: 44,
                        width: Dimensions.get('screen').width / 3,
                    }}
                    onPress = {
                        () => this.login() //.bind(this)
                    }
                >
                    <Text
                        style = {{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >
                        Login
                    </Text>
                    
                </TouchableOpacity>

            </View>
        )
    }

    isInvalidData() {
        const { username, password } = this.state
        return username.trim() == '' ||  password == ''
    }

    login() {
        let { username, password } = this.state
        let user = {
            username: username,
            password: password
        }
        AsyncStorage.setItem("key_user", JSON.stringify(user))
        this.props.navigation.navigate("HomePage")
        this.state.username = ''
        this.state.password = ''
    } 
}

export default BasicLogin
