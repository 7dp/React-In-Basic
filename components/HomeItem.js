import React from 'react'
import { Dimensions, Text, TouchableOpacity, View, Image } from 'react-native'

class HomeItem extends React.Component {
    render(props) {
        return(
            <TouchableOpacity
                activeOpacity = {0.6} 
                onPress = {this.props.mencet}
                    style = {{
                        backgroundColor : 'white',
                        borderRadius : 4,
                        alignItems : 'center',
                        flexDirection : 'row',
                        marginHorizontal : 20,
                        marginBottom : 20,
                        padding : 16,
                        shadowColor : 'black',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 5
                    }} 
            >
                <Image
                    style = {{
                        backgroundColor : 'gray',
                        height : 50,
                        width : 50,
                    }}
                />

                <View
                    style = {{
                        flex : 1,
                        flexDirection : 'column',
                        marginLeft : 16
                    }}
                >
                    <Text
                        style = {{
                            color : 'black',
                            fontWeight : "bold",
                            fontSize : 20
                        }}
                    >
                        {this.props.title}
                    </Text>

                    <Text
                    numberOfLines = {1}
                        style = {{
                            color : 'gray',
                            fontSize : 15,
                            marginTop : 8
                        }}
                    >
                        Antum mengajukan CV ke akhwat
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }
}

export default HomeItem