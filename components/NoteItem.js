
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
                    elevation: 6,
                    height: 100,
                    marginBottom: 12,
                    shadowColor: 'gray',
                    flex: 1,
                    shadowOffset: {
                        height: 2,
                        width: 0
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 5
                }}
                onLongPress = {this.props.onLongClick}
                onPress = {this.props.onClick}
            >
                <View 
                    style = {styles.listItemContainer}>

                    <Text 
                        numberOfLines = {3}
                        style = {{
                            color: 'black',
                            flex: 1, 
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
                        {
                            this.props.item.created_at
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.getDateText(new Date(this.props.item.created_at))
    }

    getDateText(dateInString) {
        const today = new Date()
        console.log('theDate:', dateInString)
        const date = Intl.DateTimeFormat('ID', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        })//.format(dateInString)
        console.log('date:', date)
    }

    isToday(day) {
        const today = new Date()
        return day.getDate() == today.getDate() 
        && day.getMonth() == today.getMonth()
        && day.getFullYear() == today.getFullYear()
    }
}

export default NoteItem