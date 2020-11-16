import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './screens/toi/Login'
import Home from './screens/toi/Home'
import Detail from './screens/toi/Detail'
import BasicLogin from './screens/BasicLogin'
import BasicRegister from './screens/BasicRegister'
import HomeActivity from './screens/HomeActivity'
import EditActivity from './screens/EditActivity'

const stack = createStackNavigator()

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator
          initialRouteName = {"BasicLogin"}
          screenOptions = {{
            headerShown : true
          }}
        >
          <stack.Screen name = "BasicRegister" component = {BasicRegister} />
          <stack.Screen name = "BasicLogin" component = {BasicLogin} />
          {/* <stack.Screen name = "Home" component = {Home} /> */}
          <stack.Screen name = "HomeActivity" component = {HomeActivity} />
          {/* <stack.Screen name = "Login" component = {Login} /> */}
          {/* <stack.Screen name = "Detail" component = {Detail} /> */}
          <stack.Screen name = "EditActivity" component = {EditActivity} />

        </stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App