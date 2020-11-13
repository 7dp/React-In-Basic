
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../utils/styles'

class NoteItem extends Component {
    render() {
        return(
            <TouchableOpacity 
                activeOpacity = {0.6}
                style = {{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    height: 100,
                    elevation: 6,
                    marginBottom: 12,
                    shadowColor: 'gray',
                    shadowOffset: {
                        height: 2,
                        width: 0
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 5
                }}
            >
                <View 
                    style = {styles.listItemContainer}>

                    <Text 
                        numberOfLines = {3}
                        style = {{
                            color: 'black',
                            fontSize: 17,
                            fontWeight: '500'
                        }}
                    >
                        {this.props.item.note}
                    </Text>

                    <Text 
                        style = {{
                            color: 'darkgray',
                            fontSize: 13,
                            marginTop: 8
                        }}
                    >
                        {this.props.item.created_at}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default NoteItem