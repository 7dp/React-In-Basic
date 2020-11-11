import React from 'react'
import AsyncStorage  from '@react-native-async-storage/async-storage' //'@react-native-community/async-storage'
import { PickerIOSComponent } from 'react-native'

class UserSession {

    KEY_IS_LOGGED_IN = "key_is_logged_in"
    KEY_USERNAME = 'key_username'
    KEY_PASSWORD = 'key_password'
    KEY_USER = 'key_user'
    
    login = async (username, password) => {
        try {
            await AsyncStorage.setItem(this.KEY_IS_LOGGED_IN, true)
            await AsyncStorage.setItem(this.KEY_USERNAME, username)
            await AsyncStorage.setItem(this.KEY_PASSWORD, password)
            alert('Success storing data')
        } catch (e) {
            alert('Failed to save data')
        }
    }

    isLoggedIn = async () => {
        try {
            const condition = await AsyncStorage.getItem(this.KEY_IS_LOGGED_IN)
            if (condition !== null) {
                setCondition(condition)
            }
        } catch (e) {
            alert('failed fetch data')
        }
    }

}
