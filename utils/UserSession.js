
import AsyncStorage  from '@react-native-async-storage/async-storage'

class UserSession {

    KEY_IS_LOGGED_IN = "key_is_logged_in"
    KEY_USER_ID = 'key_user_id'
    KEY_EMAIL = 'key_email'
    KEY_PASSWORD = 'key_password'
    KEY_NAME = 'key_name'
    KEY_USER = 'key_user'

    //
    // WOII there is no key except KEY_USER !!!
    //
    
     async login(user){
        try {
            await AsyncStorage.setItem(this.KEY_USER, user)
            // await AsyncStorage.setItem(this.KEY_IS_LOGGED_IN, true)
            // await AsyncStorage.setItem(this.KEY_EMAIL, email)
            // await AsyncStorage.setItem(this.KEY_PASSWORD, password)
            // await AsyncStorage.setItem(this.KEY_NAME, name)
            console.log("Success storing data")
        } catch (e) {
            console.log("Failed storing data")
        }
    }

    async register(user) {
        try {
            await AsyncStorage.setItem(this.KEY_USER, user)
            // await AsyncStorage.setItem(this.KEY_IS_LOGGED_IN, true)
            // await AsyncStorage.setItem(this.KEY_EMAIL, email)
            // await AsyncStorage.setItem(this.KEY_PASSWORD, password)
            // await AsyncStorage.setItem(this.KEY_NAME, name)
            console.log("Success storing data")
        } catch (e) {
            console.log("Failed storing data")
        }
    }

    async isLoggedIn() {
        try {
            const condition = await JSON.parse(AsyncStorage.getItem(this.KEY_USER))
            console.log("isLoggedIn:", condition)
            if (condition == true) {
                return true
            } 
            return false
        } catch (e) {
            console.log("Failed check isLoggedIn data:", e)
        }
    }

    async getUserId() {
        const id = await JSON.parse(AsyncStorage.getItem(this.KEY_USER))
        console.log('id:', id)
        return id
    }

}
