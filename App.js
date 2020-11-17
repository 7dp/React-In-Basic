import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Login from './screens/toi/Login'
import Home from './screens/toi/Home'
import Detail from './screens/toi/Detail'
import BasicLogin from './screens/BasicLogin'
import BasicRegister from './screens/BasicRegister'
import HomeActivity from './screens/HomeActivity'
import EditActivity from './screens/EditActivity'
import { Alert, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

class App extends React.Component {
  render() {
    
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName = {"BasicLogin"}
        >
          <Stack.Screen 
            name = "BasicRegister" 
            component = {BasicRegister} 
          />
          <Stack.Screen 
            name = "BasicLogin" 
            component = {BasicLogin}
          />

          <Stack.Screen 
            name = "HomeActivity" 
            component = {HomeActivity}
            options = {({route, navigation}) => ({
              headerRight: (props) => (

                <TouchableOpacity
                  onPress = {() => this.showAlert(navigation)}
                  style = {{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingEnd: 20,
                  }}
                >
                  <Text
                    style = {{
                      color: 'dodgerblue',
                      fontSize: 17
                    }}
                  >
                    Logout
                  </Text>

                </TouchableOpacity>
              )
            })}
          >
          </Stack.Screen>

          <Stack.Screen 
            name = "EditActivity" 
            component = {EditActivity} 
          />

        </Stack.Navigator>
        
      </NavigationContainer>
    )
  }

  showAlert(navigation) {
    Alert.alert(
      'Logout',
      'Are you sure want to logout?',
      [ 
        {
          style: 'cancel',
          text: 'Cancel'
        },
        {
          onPress: () => this.logout(navigation),
          style: 'destructive',
          text: 'Logout'
        }
      ]
    )
  }

  async logout(navigation) {
    await AsyncStorage.removeItem("key_user")
    navigation.replace("BasicLogin")
  }

}

export default App