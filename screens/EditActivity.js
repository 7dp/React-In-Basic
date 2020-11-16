
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component, useReducer } from 'react'
import { View, Dimensions, Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import * as cons from '../utils/Cons'

class EditActivity extends Component {

    constructor() {
        super()

        this.state = {
            note: '',
            isLoading: false,
            isNoteUpdate: false
            // TODO: Detect user is create new note or user update existing note
        }
    }

    render() {
        return(
            <View
                style = {{
                    flex: 1,
                    padding: 12,
                }}
            >
                <TextInput
                    multiline
                    maxLength = {255}
                    onChangeText = {(note) => {
                        this.setState({note})
                    }}
                    placeholder = "Type your note here"
                    style = {{
                        borderColor: 'lightgray',
                        borderRadius: 8,
                        borderWidth: 1,
                        paddingHorizontal: 12,
                        paddingTop: 12,
                        paddingBottom: 12,
                        flex: 1,
                        textAlign: 'left',
                        textAlignVertical: 'top',
                        fontSize: 16,
                        backgroundColor: 'white',
                    }}
                    underlineColorAndroid = 'transparent'
                    value = {this.state.note}
                />
                    
                    <View
                        style = {{
                            flexDirection: 'row',
                            height: 60,
                            alignItems: 'flex-end',
                            // justifyContent: 'center'
                            
                        }}
                    >

                        <TouchableOpacity
                            activeOpacity = {0.6}
                            onPress = {
                                // this.props.route.params.refresh(),
                                () => this.props.navigation.goBack()
                            }
                            style = {{
                                alignItems: 'center',
                                alignSelf: 'flex-start',
                                backgroundColor: 'white',
                                borderRadius: 4,
                                justifyContent: 'center',
                                height: 44,
                                marginEnd: 20,
                                shadowColor: 'gray',
                                shadowOffset: {
                                    height: 2,
                                    width: 0
                                },
                                // shadowOpacity: 0.1,
                                // shadowRadius: 2,
                                width: Dimensions.get('screen').width / 2 - 40
                            }}
                        >

                            <Text
                                style = {{
                                    color: 'blue',
                                    fontSize: 18,
                                    fontWeight: '600'
                                }}
                            >
                                CANCEL
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity = {0.6}
                            disabled = {!this.isValidData() || this.state.isLoading}
                            onPress = {
                                () => this.save()
                            }
                            style = {{
                                alignItems: 'center',
                                // alignSelf: 'flex-end',
                                backgroundColor: this.isValidData() || this.state.isLoading ? 'blue' : 'gray',
                                borderRadius: 4,
                                justifyContent: 'center',
                                height: 44,
                                shadowColor: 'gray',
                                shadowOffset: {
                                    height: 2,
                                    width: 0
                                },
                                shadowOpacity: this.isValidData() || this.state.isLoading ? 0.75 : 0,
                                shadowRadius: 2,
                                marginStart: 20,
                                width: Dimensions.get('screen').width / 2 - 40
                            }}
                        >

                            <Text
                                style = {{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: '600'
                                }}
                            >
                            SAVE   
                            </Text>

                        </TouchableOpacity>
                        
                    </View>

            </View>
        )
    }

    componentDidMount() {
        // {this.isGoingToCreateNewNote() ? 'SAVE' : 'UPDATE'}
        if (!this.isEmpty(this.props.route.params.item)) {
            this.setState({
                note: this.props.route.params.item.note
            })
        }
    }

    isValidData() {
        return this.state.note.trim() != ''
    }

    isGoingToCreateNewNote() {
        return isEmpty(this.props.route.params.item) //this.state.note.trim == ''
    }

    async save() {
        this.setState({
            isLoading: true
        })

        let noteId = 0

        if (!this.isEmpty(this.props.route.params.item)) {
            noteId = this.props.route.params.item.id
        }

        const user = JSON.parse(await AsyncStorage.getItem(cons.KEY_USER))
        
        this.fetch(
            user.id, 
            this.state.note, 
            noteId, 
            !this.isEmpty(this.props.route.params.item)
        )
    }

    async fetch(userId, note, noteId, isUpdate) {
        const url = this.getFullURL(isUpdate)
        const postConfig = this.getPostConfig(userId, note, noteId, isUpdate)

        await fetch(url, postConfig)
        .then((response) => response.json())
        .then((json) => {
            const status = json.api_status
            const message = json.api_message

            switch (status) {
                case 0:
                    alert(message)
                    break
                case 1: 
                    console.log('berhasil disimpan')
                    this.props.route.params.refresh()
                    break
            }
            this.setState({
                isLoading: false
            })
        })
        .catch((error) => {
            console.error('catch scope: error', error)
            this.setState({
                isLoading: false
            })
            throw error
        })
    }

    getPostConfig(userId, note, noteId, isUpdate) {
        console.log('isUpdate:', isUpdate)
        return isUpdate ? {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user_id": userId,
                "note": note,
                "note_id": noteId
            })
        } : {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user_id": userId,
                "note": note
            })
        }
    }

    getFullURL(isUpdate) {
        return isUpdate ? `${cons.BASE_URL}${cons.Path.UPDATE}` : `${cons.BASE_URL}${cons.Path.SAVE}`
    }

    isEmpty(object) {
        return Object.keys(object).length == 0
    }
}


export default EditActivity
