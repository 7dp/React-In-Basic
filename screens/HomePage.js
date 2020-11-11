import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

class HomePage extends Component {
    render() {
        return(
            <View
            style = {{
                padding: 20,
                flex: 1,
                // backgroundColor: 'orange'
            }}
            >
                <Text
                    style = {{
                        alignSelf: 'flex-start',
                        // backgroundColor: 'yellow',
                        color: 'black' ,
                        fontSize: 23,
                        fontWeight: 'bold',
                        marginTop: 20
                    }}
                >
                    Home
                </Text>

                <View
                    style = {{
                        // backgroundColor: 'cyan',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        alignSelf: 'flex-end',
                    }}
                >
                    <TouchableOpacity
                        activeOpacity = {0.7}
                        style = {{ 
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            backgroundColor: 'white',
                            borderRadius: 8,
                            elevation: 6,
                            height: 40,
                            justifyContent: 'center',
                            padding: 10,
                            shadowColor: 'gray',
                            shadowOffset: {
                                height: 1,
                                width: 0
                            },
                            shadowOpacity: 0.1,
                            width: Dimensions.get('screen').width / 3
                        }}
                        onPress = {
                            () => this.logout()
                        }
                    >
                        <Text
                            style = {{
                                color: 'black',
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    logout() {
        AsyncStorage.removeItem("key_user")
        this.props.navigation.navigate("BasicLogin")
    }

}

export default HomePage