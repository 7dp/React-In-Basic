import React, {Component} from 'react'
import { Text, View, TextInput, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage  from '@react-native-async-storage/async-storage'

import * as cons from '../utils/Cons'
// import * as session from '../utils/UserSession'

class BasicLogin extends Component {

    constructor() {
        super()
        
        this.state = {
            email: '',
            password: '',
            isLoading: false
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
                        alignSelf: 'flex-start',
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
                        padding: 8
                    }}
                    onChangeText = {(email) => {
                        this.setState({ email })
                    }}
                    value = {this.state.email}
                    placeholder = "Email"
                    underlineColorAndroid = 'gray'
                    keyboardType = 'email-address'
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
                    disabled = {this.isInvalidData() || this.isLoading()}
                    style = {{
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: this.isInvalidData() || this.isLoading() ? 'gray' : 'blue',
                        borderRadius: 8,
                        height: 40,
                        justifyContent: 'center',
                        marginTop: 44,
                        width: Dimensions.get('screen').width / 3,
                    }}
                    onPress = {
                        () => {this.login()}
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
                        () => this.openRegister()
                    }
                >
                    <Text
                        style = {{
                            color: 'blue',
                            fontSize: 14
                        }}
                    >
                        Didn't have an account? Register
                    </Text>
                    
                </TouchableOpacity>

            </View>
        )
    }

     componentDidMount() {
        // if (this.isLoggedIn()) {
        //     console.log('User already logged in, directing...')
        //     this.props.navigation.replace("HomePage")
        // }
    }

    isInvalidData() {
        const { email, password } = this.state
        return email.trim() == '' ||  password == '' || password.length <= 5
    }

    isLoading() {
        return this.state.isLoading
    }

    openRegister() {
        this.props.navigation.replace("BasicRegister")
    }

    login() {
        const { email, password } = this.state;
        this.setState({isLoading: true})

        this.fetchLogin(email, password)
    } 

    async fetchLogin(email, password) {
        await fetch(cons.BASE_URL + cons.Path.LOGIN, {
            method: 'POST',
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },    
            body: JSON.stringify({
                "email": 'Madara@gmail.com',
                "password": '123456'
            })
        })
        .then((response) => response.json())
        .then((json) => {
            const apiStatus = json.api_status
            const apiMsg = json.api_message
            console.log("api status:", apiStatus)

            if (apiStatus == 1) {
                const data = json.data
                this.saveUserSession(data)

                this.setState({
                    email: '',
                    password: ''
                })   
                

            } else {
                if (apiMsg == 'The email field is required.') {
                    apiMsg = 'Email address is not valid'
                }
                alert(apiMsg)
            }
            this.setState({ isLoading: false})
        })
        .catch((error) => { 
            console.error('catch scope: error', error)
            this.setState({ isLoading: false})
            alert("There is a problem with your internet connection")
        })
    }

    async saveUserSession(user) {
        // console.log('user id:', user.id)

        try {
            await AsyncStorage.setItem(cons.KEY_USER, JSON.stringify(user))
            console.log("Success storing data")
            this.props.navigation.replace("HomeActivity")
        } catch (e) {
            console.log("Failed storing data:", e)
        }
    }

    async isLoggedIn() {
        const a = await JSON.parse(AsyncStorage.getItem(cons.KEY_USER))
        alert(a.isLoggedIn)
        return a.isLoggedIn
    }

}

export default BasicLogin
