import React,{useRef,useEffect,useState} from 'react';
import {View, StyleSheet,Text, KeyboardAvoidingView, Dimensions,Animated, TextInput,ScrollView,Button,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2500,
          useNativeDriver:false
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
  

const Loginscreen = ({navigation}) => {
    const[email,onChangeEmail]=useState('');
    const[password,onChangePassword]=useState('');
    return (
        <View style={{backgroundColor:"black"}}>
        <ScrollView>
            <View style={styles.container}>
            <FadeInView
                style={{
                  position: 'absolute',
                  left: '15%',
                  top: '40%',
                }}>
                <Text style={styles.heading}>Keep your notes!</Text>
              </FadeInView>
            </View>
            
            <KeyboardAvoidingView>
            <View  style={styles.bottomTab}>
                <Text style={styles.head}>Welcome</Text>
                <Text style={styles.head}>Back.</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    placeholderTextColor="#fff"
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                />
                <View style={{width:Dimensions.get('window').width/2,
                height:60,borderRadius:20,
                justifyContent:"center",
                alignContent:"center",
                marginHorizontal:Dimensions.get('window').width/4.5,
                marginTop:30}}>
                <Button title='Login' height={60}/>
                </View>
                </View>
                <Text style={{color:"#fff",marginHorizontal:Dimensions.get('window').width/3.8,
                fontSize:12,
                fontWeight:'bold'}}
                onPress={()=>navigation.navigate('Register')}
                >Don't have an account?Register</Text>
                </KeyboardAvoidingView>
          </ScrollView>  

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        width:"100%",
        height:Dimensions.get('window').height/2.5,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
    bottomTab:{
        backgroundColor:"black",
        width: '100%',
        justifyContent: 'center',
        padding: 20,
    },
    heading:{
        fontSize:40,
        color:"black",
        fontWeight:"bold"
    },
    head:{
        color:"#fff",
        marginHorizontal:10,
        marginBottom:5,
        fontSize:30,
        fontWeight:"bold"
    },
    input: {
        height: 60,
        marginVertical: 15,
        marginHorizontal:12,
        borderWidth: 2,
        padding: 8,
        color:"#fff",
        borderColor:"#fff",
        borderTopRightRadius:20,
        borderBottomLeftRadius:20,
      }

})

export default Loginscreen;
