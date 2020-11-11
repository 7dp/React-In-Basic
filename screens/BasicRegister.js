
import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import * as cons from '../utils/Cons'

class BasicRegister extends Component {

    constructor() {
        super()
        
        this.state = {
            email: '',
            password: '',
            name: ''
        }
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
                        alignSelf: 'flex-start',
                        textAlign: 'center'
                    }}
                >
                    Register
                </Text>

                <TextInput
                    style = {{ 
                        height: 40, 
                        borderColor: 'gray', 
                        borderRadius: 8,
                        borderWidth: 1,
                        marginTop: 44,
                        padding: 8,
                    }}
                    onChangeText = {(email) => {
                        this.setState({ email })
                    }}
                    keyboardType = 'email-address'
                    value = {this.state.email}
                    placeholder = "Email"
                    underlineColorAndroid = 'gray'
                />

                <TextInput
                    style = {{ 
                        height: 40, 
                        borderColor: 'gray', 
                        borderRadius: 8,
                        borderWidth: 1,
                        marginTop: 16,
                        padding: 8
                    }}
                    onChangeText = {(name) => {
                        this.setState({ name })
                    }}
                    value = {this.state.name}
                    placeholder = "Name"
                    underlineColorAndroid = 'gray'
                />

                <TextInput
                    style = {{ 
                        height: 40, 
                        borderColor: 'gray', 
                        borderRadius: 8,
                        borderWidth: 1,
                        marginTop: 16,
                        padding: 8
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
                    disabled = {!this.isValidData()}
                    style = {{
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: this.isValidData() ? 'blue' : 'gray',
                        borderRadius: 8,
                        height: 40,
                        justifyContent: 'center',
                        marginTop: 44,
                        width: Dimensions.get('screen').width / 3,
                    }}
                    onPress = {
                        () => this.register()
                    }
                >
                    <Text
                        style = {{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >
                        Register
                    </Text>
                    
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity = {0.75}
                    style = {{
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: 8,
                        justifyContent: 'center',
                        marginTop: 20
                    }}
                    onPress = {
                        () => this.openLogin()
                    }
                >
                    <Text
                        style = {{
                            color: 'blue',
                            fontSize: 14
                        }}
                    >
                        Already have an account? Login
                    </Text>
                    
                </TouchableOpacity>

            </View>
        )
    }

    openLogin() {
        this.props.navigation.replace("BasicLogin")
    }

    register() {
        const { email, password, name } = this.state
        this.fetchRegister(email, password, name)
    } 
     
    async fetchRegister(email, password, name) {
        console.log(email, password, name)
        await fetch(cons.BASE_URL + cons.Path.REGISTER, {
            method: 'POST',
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },    
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            })
        })
        .then((response) => response.json())
        .then((json) => {
            const apiStatus = json.api_status
            let apiMsg = json.api_message
            console.log("api status:", apiStatus, " ", apiMsg)

            if (apiStatus == 1) {
                this.setState({
                    username: '',
                    password: '',
                    name: ''
                })
                this.props.navigation.replace("HomePage")
            } else {
                if (apiMsg == 'The email field is required.') {
                    apiMsg = 'Email address is not valid'
                }
                alert(apiMsg)
            }
        })
        .catch((error) => { 
            alert('catch scope: error')
            console.error(error)
        })
    }

    isValidData() {
        const { email, password, name } = this.state
        return email.trim() != '' 
                && password != ''
                && password.length >= 6
                && name.trim() != ''
    }
}

export default BasicRegister 
