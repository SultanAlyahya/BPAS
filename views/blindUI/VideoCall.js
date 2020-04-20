/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, StyleSheet, NativeModules, ScrollView, Text, Dimensions, TouchableOpacity, Button } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Speech from 'expo-speech';
//import Modal from 'react-native-modal';

const { Agora } = NativeModules;                  //Define Agora object as a native module

const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Adaptative,
} = Agora;                                        //Set defaults for Stream

export default class VideoCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerIds: [],                                //Array for storing connected peers
      uid: Math.floor(Math.random() * 100),       //Generate a UID for local user
      appid: this.props.navigation.state.params.id,                    //Enter the App ID generated from the Agora Website
      channelName: this.props.navigation.state.params.room,        //Channel Name for the current session
      vidMute: false,                             //State variable for Video Mute
      audMute: false,                             //State variable for Audio Mute
      joinSucceed: false,   
      empty:true,                      //State variable for storing success
      token:this.props.navigation.state.params.token,
      isModalVisible: false,
    };
    const config = {                            //Setting config of the app
      appid: this.state.appid,                  //App ID
      channelProfile: 0,                        //Set channel profile as 0 for RTC
      videoEncoderConfig: {                     //Set Video feed encoder settings
        width: 720,
        height: 1080,
        bitrate: 1,
        frameRate: FPS30,
        orientationMode: Adaptative,
      },
      audioProfile: AudioProfileDefault,
      audioScenario: AudioScenarioDefault,
    };
    RtcEngine.init(config);                     //Initialize the RTC engine
  }
  componentDidMount=async()=> {
    
    
    RtcEngine.on('userJoined', (data) => {
      this.setState({empty:false})
      console.log("empty", this.state.empty)
      Speech.speak('someone enters the call')
      const { peerIds } = this.state;             //Get currrent peer IDs
      if (peerIds.indexOf(data.uid) === -1) {     //If new user has joined
        this.setState({
          peerIds: [...peerIds, data.uid],        //add peer ID to state array
        });
      }
    });
    RtcEngine.on('userOffline', (data) => {       //If user leaves
      this.endCall()
      this.toggleModal()
      this.setState({
        peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
      });
    });
    RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
      RtcEngine.startPreview();                                      //Start RTC preview
      this.setState({
        joinSucceed: true,                                           //Set state variable to true
      });
    });
    RtcEngine.joinChannel(this.state.channelName, this.state.uid);  //Join Channel
    RtcEngine.enableAudio();                                        //Enable the audio
    RtcEngine.switchCamera();
    //RtcEngine.destroy()

    await fetch('https://assistance-system-back-end.herokuapp.com/User/notifications', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'token':this.state.token
        },
        body: JSON.stringify({
          room:this.state.channelName
        }),
  })

  //const resJ= await res.json()
  console.log('roomB',this.state.channelName)
  }
  /**
  * @name toggleAudio
  * @description Function to toggle local user's audio
  */
  toggleAudio() {
    let mute = this.state.audMute;
    console.log('Audio toggle', mute);
    RtcEngine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }
  /**
  * @name toggleVideo
  * @description Function to toggle local user's video
  */
  toggleVideo() {
    let mute = this.state.vidMute;
    console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    RtcEngine.muteLocalVideoStream(!this.state.vidMute);
  }
  /**
  * @name endCall
  * @description Function to end the call
  */
  endCall() {
    RtcEngine.destroy();
    this.props.navigation.goBack()
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  rating = (number) =>{
    console.log(number)
    this.endCall()
  }
  
  /**
  * @name peerClick
  * @description Function to swap the main peer videostream with a different peer videostream
  */
  peerClick(data) {
    let peerIdToSwap = this.state.peerIds.indexOf(data);
    this.setState(prevState => {
      let currentPeers = [...prevState.peerIds];
      let temp = currentPeers[peerIdToSwap];
      currentPeers[peerIdToSwap] = currentPeers[0];
      currentPeers[0] = temp;
      return { peerIds: currentPeers };
    });
  }
  /**
  * @name videoView
  * @description Function to return the view for the app
  */
  videoView() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1}}>
            <Text>ارجوك قيم المتبرع من ٥ الافضل الى ١ الاسوء</Text>
            <Button title="١" onPress={()=>this.rating(1)} />
            <Button title="٢" onPress={()=>this.rating(2)} />
            <Button title="٣" onPress={()=>this.rating(3)} />
            <Button title="٤" onPress={()=>this.rating(4)} />
            <Button title="٥" onPress={()=>this.rating(5)} />
            <Button title="لا اريد التقييم" onPress={this.rating()} />
          </View>
        </Modal>
         */}
        {
          !this.state.vidMute                                              //view for local video
            ? <AgoraView style={{height:'100%',width:'100%'}} zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
            : <View />
        }
        <View style={styles.buttonBar}>
          <Icon.Button style={styles.iconStyle}
            backgroundColor="#0093E9"
            name={this.state.audMute ? 'mic-off' : 'mic'}
            onPress={() => this.toggleAudio()}
          />
          <Icon.Button style={styles.iconStyle}
            backgroundColor="#0093E9"
            name="call-end"
            onPress={() => this.endCall()}
          />
          <Icon.Button style={styles.iconStyle}
            backgroundColor="#0093E9"
            name={this.state.vidMute ? 'videocam-off' : 'videocam'}
            onPress={() => this.toggleVideo()}
          />
        </View>
      </View>
    );
  }
  render() {
    return this.videoView();
  }
}

let dimensions = {                                            //get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  buttonBar: {
    height: 50,
    backgroundColor: '#0093E9',
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  localVideoStyle: {
    width: 140,
    height: 160,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  iconStyle: {
    fontSize: 34,
    paddingTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
    borderRadius: 0,
  },
});