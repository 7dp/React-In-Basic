
import React, { Component, useReducer } from 'react'
import { ActivityIndicator, Alert, Dimensions, SafeAreaView, Text, View, Button } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage'
import NoteItem from '../components/NoteItem'
import * as session from '../utils/UserSession'
import * as cons from '../utils/Cons'
import { NavigationContainer } from '@react-navigation/native'


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

class HomeActivity extends Component {

    // static navigationOptions = {
    //     // headerTitle: <LogoTitle />,
    //     headerRight: (
    //         <Button
    //             onPress={() => alert('This is a button!')}
    //             title="Info"
    //             color= 'blue'
    //         />
    //     ),
    // };

    state = {
        datas: [],
        isLoading: true
    }

    render() {

        // <NavigationContainer
        // >
        //     <stack.Navigator
        //         initialRouteName = {'HomeActivity'}
        //         screenOptions = {{
        //             headerRight: (props) => (
        //                 <View
        //                     style = {{
        //                         backgroundColor: 'crimson',
        //                         height: 35,
        //                         width: 35
        //                     }}
        //                 >

        //                 </View>   
        //             )
        //         }}
        //     >

        //     </stack.Navigator>

        // </NavigationContainer>

        if (!this.state.isLoading) {
            return (
                <SafeAreaView
                    style = {{
                        flex: 1
                    }}
                >
                    <FlatList
                        data = {this.state.datas}
                        extraData
                        keyExtractor = {(item) => item.id.toString()}
                        ref = "mainFlatList"
                        renderItem = {
                            ({item, index}) => (
                                <NoteItem
                                    item = {item}
                                    onClick = {
                                        () => this.onItemClick(item)
                                    }
                                    onLongClick = {
                                        () => this.onLongItemClick(item)
                                    }
                                />
                            )
                        }
                        style = {{
                            paddingHorizontal: 16,
                            flex: 1,
                        }}
                    >

                    </FlatList>

                    <TouchableOpacity
                        activeOpacity = {0.1}
                        onPress = {
                            () => this.goToEdit()
                        }
                        style = {{
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'blue',
                            borderRadius: 24,
                            marginBottom: 20,
                            marginTop: 20,
                            justifyContent: 'center',
                            height: 44,
                            shadowColor: 'gray',
                            shadowOffset: {
                                height: 2,
                                width: 0
                            },
                            shadowOpacity: 0.75,
                            shadowRadius: 2,
                            width: Dimensions.get('screen').width / 2
                        }}
                    >

                        <Text
                            style = {{
                                color: 'white',
                                fontSize: 18,
                                fontWeight: '700'
                            }}
                        >
                            NEW NOTE
                        </Text>

                    </TouchableOpacity>

                </SafeAreaView>
            )
        } else {
            return(
                <ActivityIndicator
                    style = {{
                        backgroundColor: 'white',
                        flex: 1
                    }}
                />
            )
        }
    }

    async componentDidMount() {
        await this.fetch(0, false)
    }

    goToEdit() {
        this.props.navigation.navigate("EditActivity", {
            item: {},
            refresh: () => this.fetch()
        })
    }

    async fetch(noteId, isDelete) {
        this.setState({
            isLoading: true
        })
        const user = JSON.parse(await AsyncStorage.getItem(cons.KEY_USER))
        const url = this.getFullURL(user.id, isDelete)
        const fetchConfig = this.getFetchConfig(user.id, noteId, isDelete)

        fetch(url, fetchConfig)
        .then((response) => response.json())
        .then((json) => {
            const apiStatus = json.api_status
            const apiMessage = json.api_message

            console.log('api status:', apiStatus)
            console.log('api msg:', apiMessage)

            if (apiStatus == 1) {
                if (isDelete) {
                    this.fetch(0, false)
                } else {
                    const list = json.data
                    this.setState({
                        datas: list
                    })
                }
                this.setState({
                    isLoading: false
                })
                this.refs.mainFlatList.scrollToOffset({x: 0, y: 0, animated: false})
                return
            }
            alert(apiMessage)
        })
        .catch((error) => {
            console.error('catch scope: error', error)
        })
    }
    
    getFullURL(userId, isDelete) {
        let url = ''
        if (isDelete) {
            url = `${cons.BASE_URL}${cons.Path.DELETE}`
        } else {
            url = `${cons.BASE_URL}${cons.Path.NOTES}?${cons.Param.userId}=${userId}`
        }
        return url
    }

    getFetchConfig(userId, noteId, isDelete) {
        console.log('userId:', userId)
        console.log('noteId:', noteId)
        console.log('isdelete:', isDelete)
        return isDelete ? 
        {
            method: 'POST',
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "note_id" : noteId,
                "user_id" : userId,
            })
        } : {
            // TODO : Try without this block
            method: 'GET',
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            }
        }
    }
    
    onItemClick(item) {
        this.props.navigation.navigate("EditActivity", {
            item: item,
            refresh: () => this.fetch(item.id, false)
        })
    }
    
    onLongItemClick(item) {
        Alert.alert(
            'Delete Note',
            'Are you sure to delete this note?', 
            [
                {
                    style: 'cancel',
                    text: 'Cancel',
                },
                {
                    onPress: () => this.fetch(item.id, true),
                    style: 'destructive',
                    text: 'Delete',
                }
            ],
            {
                cancelable: true
            }
            );
        }

}

export default HomeActivity
