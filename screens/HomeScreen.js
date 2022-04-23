import React,{useEffect,useState} from 'react';
import {View, StyleSheet,Text,Button, TouchableOpacity, ScrollView, Dimensions, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
const Homescreen = ({navigation}) => {
    const [dataList,setDataList]=useState([]);
    let logOff=()=>{
        auth()
      .signOut()
      .then(() => {
          console.log('User signed out!')
          navigation.replace('Login');
        });
      }

    //   let getUser=async()=>{
    //     //await firestore().instance.disableNetwork();
    //     //await firestore().instance.enableNetwork();
    //     //const UserDocument=await firestore().collection("Users").doc("s5nLOCb8RLitX6lfJ6kJ").get();
    //     const UserDocument=await firestore().collection("Users").doc("s5nLOCb8RLitX6lfJ6kJ").onSnapshot(documentSnapshot => {
    //         console.log('User data: ', documentSnapshot.data());
    //         setName(documentSnapshot.data().name);
    //       });
    //     //console.log(UserDocument);
    //   }
      let getData=async()=>{
        // console.log("Hello")
        await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
        //   console.log('Total users: ', querySnapshot.size);
            let templist=[];
          querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            //console.log(documentSnapshot);
            let temp={
                "_id":documentSnapshot.id,
                ...documentSnapshot.data()
            };
            console.log(temp);
            templist.push(temp);
            
        });
        setDataList(templist);
        });
      }
      useEffect(() => {
        getData();
      },[]);

      const renderCard=({item})=>{
          return(
            // <Text>{item.name}</Text>
            <View style={{
                width:Dimensions.get('window').width/2.2,
                height:Dimensions.get('window').height/4,
                backgroundColor:"dodgerblue",
                margin:10,
                borderRadius:20,
                padding:15
            }}>
                <Text style={{color:"#fff"}}>{item.name}</Text>
            </View>
          )
      }

    return (
        <View style={{flex:1,backgroundColor:"#fff"}}>
            <TouchableOpacity style={styles.floatButton} onPress={logOff}>
                <Text style={{fontWeight:'bold',color:"#fff",fontSize:20}}>+</Text>
            </TouchableOpacity>
        <View style={{marginTop:20}}>
            {/* <Text>{name}</Text> */}
            <FlatList
            data={dataList}
            keyExtractor={item=>item._id.toString()}
            renderItem={renderCard}
            numColumns={2}
            />
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    floatButton:{
        position: 'absolute',
        elevation:5,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom:30,
        //  bottom: 0,
        backgroundColor:"black",
        borderRadius:50
    }
    
})

export default Homescreen;
