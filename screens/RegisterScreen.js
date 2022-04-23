import React,{useRef,useEffect,useState} from 'react';
import {View, StyleSheet,Text, KeyboardAvoidingView, Dimensions,Animated, TextInput,ScrollView,Button,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
  

const Registerscreen = ({navigation}) => {
    const[email,onChangeEmail]=useState('');
    const[password,onChangePassword]=useState('');
    const[error,setError]=useState(false);
    const[errMsg,setErrorMessage]=useState('');
    let createUser=()=>{
             auth()
           .createUserWithEmailAndPassword(email,password)
           .then((user) => {
            console.log(user);
             console.log(user.user)
             console.log(user.user.uid);
             firestore().collection('Users')
             .add({
                 name:'xy',
                 email:user.user.email,
                 user_id:user.user.uid,
                 taskList:[]
             }).then((docRef)=>{
                console.log('User account created & signed in!');
                firestore().collection('Users').where('user_id','==',user.user.uid).get().then((querySnapshot)=>{
                    querySnapshot.forEach(documentSnapshot => {
                        //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        firestore().collection('User').doc(documentSnapshot.id).update({
                            user_id:documentSnapshot.id
                        }).then(ref=>{
                            console.log("TasK Done")
                            navigation.navigate('Home');
                        }).catch(err=>{
                            console.log("error at update")
                        })
                      }).catch(err=>{
                          console.log("error at where")
                      })
                })
                
             });
             
           })
           .catch(error => {
             if (error.code === 'auth/email-already-in-use') {
               console.log('That email address is already in use!');
               setErrorMessage('That email address is already in use!');
             }
        
          if (error.code === 'auth/invalid-email') {
               console.log('That email address is invalid!');
               setErrorMessage('That email address is invalid!');
             }
             setError(true);
             //console.error(error);
           });
           }
        
           let logOff=()=>{
             auth()
           .signOut()
           .then(() => console.log('User signed out!'));
           }
        
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
                <Text style={styles.head}>Create</Text>
                <Text style={styles.head}>New Account.</Text>
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
                {error && <Text style={{color:"red"}}>{errMsg}</Text>}
                <Button title='Register' height={60} onPress={createUser}/>
                </View>
                </View>
                <Text style={{color:"#fff",
                marginHorizontal:Dimensions.get('window').width/3.5,
                fontSize:12,fontWeight:'bold'}}
                onPress={()=>navigation.navigate('Login')}
                >Already have an account?Login</Text>
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

export default Registerscreen;

