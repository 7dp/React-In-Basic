import React from 'react'
import { Button, Dimensions, Image, SafeAreaView, View, Text, ImageBackground } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AvatarItem from '../components/AvatarItem'
import EditText from '../components/EditText'

class Login extends React.Component {
    render() {
        return(
            <SafeAreaView
                style = {{
                    backgroundColor : 'pink',
                    flex : 1
                }}
            >

                {/* Parent View */}

                <ScrollView
                    style = {{
                        backgroundColor : 'white',
                        flex : 1
                    }}
                >
                    <ImageBackground
                        resizeMode = {'stretch'}
                        source = {require('../assets/img-rounded-bg-login.png')}
                        style = {{
                            height: Dimensions.get('screen').width,
                            width: Dimensions.get('screen').width,
                            padding: 20
                        }}
                    >
                        <Text
                            style = {{
                                color : 'white',
                                fontSize : 23,
                                fontWeight : 'bold'
                            }}
                        >
                            Aplikasi pertama di Indonesia
                        </Text>

                        <Text
                            style = {{
                                color : 'white',
                                fontSize : 16,
                                marginTop : 4,
                            }}
                        > 
                            Mencari pasangan sesuai syariat Islam
                        </Text>

                        {/* Horizontal Container */}
                        <View
                            style = {{
                                marginTop: 24,
                                flexDirection : 'row',
                                justifyContent: 'space-evenly'
                            }}
                        >
                            {/* Item (vertical)*/}

                            <AvatarItem
                                textBackgroundColor = 'cyan'
                                image = {require('../assets/avatar_ikhwan.png')}
                                isFirstIndex = {true}
                            />

                            <AvatarItem
                                textBackgroundColor = 'purple'
                                image = {require('../assets/avatar_akhwat.png')}
                            />

                            <AvatarItem
                                textBackgroundColor = 'darkgray'
                                image = {require('../assets/avatar_mitra.png')}
                            />

                            <AvatarItem
                                textBackgroundColor = 'orange'
                                image = {require('../assets/avatar_taaruf.png')}
                            />
                        </View>

                        <Text
                            style = {{
                                color : 'white',
                                fontSize : 16,
                                marginTop : 24,
                            }}
                        > 
                            Apakah antum selanjutnya?
                        </Text>

                        {/* Text Label "Buat CV atau Login"*/}
                        <View
                            style = {{
                                flexDirection: 'row',
                                marginTop: 20
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity = {0.6}
                            >
                                <Text
                                    style = {{
                                        color : 'orange',
                                        fontSize : 16
                                    }}
                                >
                                    Buat CV
                                </Text>
                            </TouchableOpacity>

                            <Text
                                style = {{
                                    color : 'white',
                                    fontSize : 16,
                                    marginHorizontal : 4
                                }}
                            >
                                atau
                            </Text>

                            <TouchableOpacity
                                activeOpacity = {0.6}
                            >
                                <Text
                                    style = {{
                                        color : 'orange',
                                        fontSize : 16
                                    }}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style = {{
                                alignItems: 'flex-start'
                            }}
                        >
                        
                            <TouchableOpacity
                                activeOpacity = {0.6}
                                style = {{
                                    backgroundColor: 'orange',
                                    paddingVertical: 3,
                                    paddingHorizontal: 8,
                                    borderRadius: 16,
                                    marginTop: 24
                                }}
                            >
                                <Text
                                    style = {{
                                        color: 'black',
                                        fontSize: 16,
                                        fontWeight: '600'
                                    }}
                                >
                                    Pelajari Cara Kerja
                                </Text>
                                
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>

                    <View
                        style = {{
                            paddingHorizontal: 20,
                            paddingTop: 20
                        }}
                    >
                        <Text
                            style = {{
                                color : 'black',
                                fontSize : 23,
                                fontWeight : 'bold'
                            }}
                        >
                            Login
                        </Text>

                        <Text
                            style = {{
                                color : 'black',
                                flex: 1,
                                fontSize : 16,
                                marginTop: 8
                            }}
                        >
                            Bismillah, mencari pasangan yang halal dengan cara taaruf
                        </Text>

                        <EditText>
                            placeholder = "No Whatsapp"
                        </EditText>
                    </View>

                </ScrollView>

            </SafeAreaView>
        )
    }
}

export default Login