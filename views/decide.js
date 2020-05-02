import React from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './styles'
import {retrieveData} from './db/Userdb'
import SplashScreen from 'react-native-splash-screen'


import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
//import PushNotificationAndroid from 'react-native-push-notification'

export default class decide extends React.Component{
  constructor(props){
    super(props);
    this.state={
      inCall:false,
      data:''
    }
  }
    componentDidMount= async()=>{
      //SplashScreen.show()
      this.setState({inCall:false})
      try{
        const data = await retrieveData()
        console.log('data',data)
        await this.notification()

        if(data){
          console.log('data')
          if(data.type=="volunteer"){
            await this.navigateToVolunteer(data.token)
          }else{
            console.log('user')
            await this.navigateToUser(data.token)
          }
        }else{
          SplashScreen.hide()
        }

      }catch(error){
        console.log(error)
      }
    }


    navigateToVolunteer=async(token)=>{
      try{
        const res = await fetch('https://assistance-system-back-end.herokuapp.com/volunteer/loginByToken', {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                token:token
              }
        })
        const resJ = await res.json()
        //SplashScreen.hide()
        this.props.navigation.navigate('tabNavigaitonP',{ 
          token: token,
          name: resJ.name,
          call: resJ.call,
          rating: resJ.rating,
          numberOfBlindPeople: resJ.numberOfBlindPeople,
          numberOfCalls: resJ.numberOfCalls,
          numberOfActiveVolunteers: resJ.numberOfActiveVolunteers,
          numberOfVolunteers: resJ.numberOfVolunteers
            
        })
      }catch(error){
          SplashScreen.hide()
      }
    }

    navigateToUser=async(token)=>{
      try{
        const res = await fetch('https://assistance-system-back-end.herokuapp.com/User/loginByToken', {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                token:token
              }
        })
          if(res.status == 200){
          this.props.navigation.navigate('blindHomePageP',{ 
            token: token,
          })
        }else{
          SplashScreen.hide()
        }
      }catch(error){
          SplashScreen.hide()
      }
    }

    notification=async()=>{
      
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        // onRegister: function(token) {
        //   console.log("TOKEN:", token);
        // },    

        onNotification: async(notification)=> {
          try{
            const data = await retrieveData()
            console.log("NOTIFICATION:")
            console.log("NOTIFICATION:", notification)
                     
            this.callAlert(data, notification)

          }catch(error){
            console.log(error)
          }
                     
                  
          // required on iOS only 
          //notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        // Android only
        senderID: "411311542797",
        // iOS only
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        popInitialNotification: true,
        requestPermissions: true
            
      })
    }

    acceptCall =async(data, notification)=>{
      PushNotification.cancelAllLocalNotifications()
      PushNotification.localNotification({id:notification.id})
      const res = await fetch('https://assistance-system-back-end.herokuapp.com/volunteer/joinRoom', {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
          'token':data.token
        },
        body: JSON.stringify({
          room:notification.room
        }),
      })
              
      const resJ = await res.json()
      console.log('call ', resJ)
      if(resJ.available){
        this.props.navigation.navigate('callP',{
          room:notification.room,
          id:'4ed3c1e0fb52417994f45aeeb720db46'
        })
      }else{
        alert('someone get the call good luck next time')
      }
    }

    callAlert=(data, notification)=>{
      Alert.alert(
        "You recieved a call",
        "Do you want to answer the call",
        [
          {
            text: "Accept",
            onPress: () => this.acceptCall(data, notification),
            style: "cancel"
          },
          { text: "Reject", onPress: () => PushNotification.cancelAllLocalNotifications()}
        ],
        { cancelable: false }
      );
    }

    render(){
        return(
            <View style={styles.container}>
            
                <TouchableOpacity style={styles.blinde} onPress={()=> this.props.navigation.navigate('createAccountBP')}>
                    <Text style={styles.text}>كفيف</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.volunteer} onPress={()=> this.props.navigation.navigate('loginP')}>
                    <Text style={styles.text}>متطوع</Text>
                </TouchableOpacity>
            
            </View>
        )
    }
}

