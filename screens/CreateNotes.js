import React,{useState,useEffect} from 'react';
import {View, StyleSheet,TextInput,Text, Dimensions, KeyboardAvoidingView, ScrollView,Keyboard} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Createnotes = ({navigation}) => {
    const [text,onChangeText]=useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [user_id,setUserId]=useState('');
     // Handle user state changes
   function onAuthStateChanged(user) {
     setUser(user);
     //console.log(user.uid);
     //setUserId(user.uid);
     if (initializing) setInitializing(false);
   }
    let createTask=async()=>{
        await firestore().collection('Tasks').add({
            task_content:text,
            date:Date.now(),
            last_edited:Date.now()
        }).then(async(task)=>{
            console.log(task.id)
            const user=await firestore().collection("Users").doc('AvyLjSubOsHSYw7cjqOM').get().update({
              taskList:firestore.FieldValue.arrayUnion(task.id)
            }).then(()=>{
              console.log("added");
            }).catch(err=>{
              console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(() => {
        const subscriber=auth().onAuthStateChanged(onAuthStateChanged);
         const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      subscriber
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
    }, []);
    if(initializing){
        return null;
    }
    return (
        <View style={{flex:1,padding:10,backgroundColor:"#c7c7c1",justifyContent:"center"}}>
            
            <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
                    style={styles.input}
                    multiline={true}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Write your notes here!"
                    focusable={true}
                    placeholderTextColor="#c7c7c1"
                />  
                {text!='' && <View style={createStyles(isKeyboardVisible).floatButton}>
                <Text style={{color:"#fff",fontSize:16}} onPress={createTask}>Create</Text>
                </View>}
                </ScrollView>
                </KeyboardAvoidingView>
                
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        width:Dimensions.get('window').width/1.03,
        lineHeight:20,
        fontSize:16,
        height:Dimensions.get('window').height/1.5,
        backgroundColor:"#fff"
    },
    
})

const createStyles = (profile) => StyleSheet.create({
    floatButton:{
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom:profile?160:30,
        //  bottom: 0,
        backgroundColor:"dodgerblue",
        borderRadius:50
    }
});
export default Createnotes;
