import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles'
import {retrieveData} from './db/Userdb'
import SplashScreen from 'react-native-splash-screen'

import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export default class decide extends React.Component{
  constructor(props){
    super(props);
    this.state={
      inCall:false,
      data:''
    }
  }
  
  static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        //headerShown: false
    };
    componentDidMount= async()=>{
      //SplashScreen.show()
      this.setState({inCall:false})
      try{
        const data = await retrieveData()
     
        PushNotification.configure({

                    // (optional) Called when Token is generated (iOS and Android)
                    onRegister: function(token) {
                      console.log("TOKEN:", token);
                    },
                  
                    // (required) Called when a remote or local notification is opened or received
                    onNotification: async(notification)=> {
                     try{
                      console.log("NOTIFICATION:")
                      console.log("NOTIFICATION:", notification)
                      if(!this.state.inCall){
                      console.log('data',data)
                      //if(!this.state.inCall){
                      this.setState({inCall:true})
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
                        this.setState({inCall:true})
                      this.props.navigation.navigate('callP',{
                          room:notification.room,
                          id:'4ed3c1e0fb52417994f45aeeb720db46'
                        })
                      }else{
                        alert('someone get the call good luck next time')
                      }
                      setTimeout(()=>{
                        this.setState({inCall:false})
                        console.log('time',this.state.inCall)
                      },5000)

                    }

                     }catch(error){
                      console.log(error)
                     }
                      // process the notification here
                  
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


                  if(data){
                    console.log(data)
                    if(data.type="volunteer"){
                      await this.navigateToVolunteer(data.token)
                    }else{
                      SplashScreen.hide()
                    }
                  }else{
                    SplashScreen.hide()
                  }

                }catch(error){
                  console.log(error)
                }
      }


      navigateToVolunteer=async(token)=>{
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

