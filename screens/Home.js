
import React, { Component, useReducer } from 'react'
import { ActivityIndicator, Dimensions, SafeAreaView, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage'
import NoteItem from '../components/NoteItem'
import * as session from '../utils/UserSession'
import * as cons from '../utils/Cons'

/* 
{
    "api_status": 1,
    "api_message": "Data ditemukan",
    "data": [
        {
            "id": 2,
            "note": "Hashiramaaaa!!!",
            "created_at": "2020-11-12 10:06:19"
        }
    ]
}
*/

class Home extends Component {

    state = {
        datas: [],
        isLoading: true
    }

    render() {

        if (!this.state.isLoading) {
            return (
                <SafeAreaView
                    style = {{
                        flex: 1
                    }}
                >
                    <FlatList
                        data = {this.state.datas}
                        keyExtractor = {(item) => item.id.toString()}
                        extraData
                        renderItem = {
                            ({item, index}) => (
                                <NoteItem
                                    item = {item}
                                />
                            )
                        }
                        style = {{
                            paddingHorizontal: 16,
                            paddingTop: 20
                        }}
                    >

                    </FlatList>

                </SafeAreaView>
            )
        } else {
            return(
                <ActivityIndicator/>
            )
        }
    }

    // item(data) {
    //     return <NoteItem 
    //                 {...data.item}
    //             /> 
    // }

    async componentDidMount() {
        await this.fetchList()
    }

    async fetchList() {
        const url = `${cons.BASE_URL}${cons.Path.NOTES}?${cons.Param.userId}=${encodeURIComponent('19')}`

        const fullURL = await this.getFullURl()
        console.log('full url:', fullURL)

        await fetch(url, {
            // TODO : Try without this block
            method: 'GET',
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            const apiStatus = json.api_status
            const apiMsg = json.api_message

            if (apiStatus == 1) {
                const list = json.data
                console.log('list:', list)

                this.setState({
                    datas: list,
                    isLoading: false
                })
                return
            }
            alert(apiMsg)
        })
        .catch((error) => {
            console.error('catch scope: error', error)
        })
    }
     
    async getFullURl() {
        const user = await JSON.parse(AsyncStorage.getItem(cons.KEY_USER))
        return `${cons.BASE_URL}${cons.Path.NOTES}?${cons.Param.userId}=${encodeURIComponent(user.id)}`
    }

    async logout() {
        await AsyncStorage.removeItem("key_user")
        this.props.navigation.replace("BasicLogin")
    }

}

export default Home