import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet,Button,Animated } from 'react-native';
import auth from '@react-native-firebase/auth';
import Loginscreen from './screens/LoginScreen';
import Registerscreen from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/HomeScreen';
import Createnotes from './screens/CreateNotes';


const Stack = createNativeStackNavigator();
const App=()=>{
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
     // Handle user state changes
   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) setInitializing(false);
   }
   
    
   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);

  if (initializing) return null;
  return(
    <NavigationContainer>
      {!user?( 
      <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen name="Register" component={Registerscreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Loginscreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Homescreen} options={{ title: 'Your Notes', headerStyle: {
              backgroundColor: 'dodgerblue'
           },headerTintColor:"#fff"  }} />
          <Stack.Screen name="Create" component={Createnotes} options={{ title: 'Make Note', headerStyle: {
              backgroundColor: 'dodgerblue'
           },headerTintColor:"#fff"  }} />
      </Stack.Navigator>
      ):(
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Homescreen} options={{ title: 'Your Notes', headerStyle: {
              backgroundColor: 'dodgerblue'
           },headerTintColor:"#fff" }}/>
           <Stack.Screen name="Create" component={Createnotes} options={{ title: 'Make Note', headerStyle: {
              backgroundColor: 'dodgerblue'
           },headerTintColor:"#fff"  }} />
        <Stack.Screen name="Register" component={Registerscreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Loginscreen} options={{headerShown: false}}/>

      </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({})

export default App;
