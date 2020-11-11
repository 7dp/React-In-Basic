import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'

class AvatarItem extends Component {
    state = {  }
    render() {
        return (
            <View  
                style = {{
                    flex : 1,
                    flexDirection : 'column',
                    alignItems: 'center',
                    marginLeft: this.props.isFirstIndex ? 0 : 20
                }}
            >
                <Image
                    source = {this.props.image}
                    style = {{
                        height: 50,
                        width: 50
                    }}
                >
                </Image>

                <View
                    style = {{
                        backgroundColor: this.props.textBackgroundColor,
                        borderRadius:  8,
                        marginTop: 4,
                        padding: 2
                    }}
                >
                    <Text
                        numberOfLines  = {1}
                        style = {{
                            color: 'white',
                            fontSize: 13
                        }}
                    >2140 Ikhwan</Text>

                </View>

            </View>
        )
    }
}

export default AvatarItem
