/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, StyleSheet, NativeModules, Text, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';


const { Agora } = NativeModules;                  //Define Agora object as a native module

const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Adaptative,
} = Agora;                                        //Set defaults for Stream

export default class call extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerIds: [],                                //Array for storing connected peers
      uid: Math.floor(Math.random() * 100),       //Generate a UID for local user
      appid: this.props.navigation.state.params.id,                    //Enter the App ID generated from the Agora Website
      channelName: this.props.navigation.state.params.room,        //Channel Name for the current session
      vidMute: true,                             //State variable for Video Mute
      audMute: false,                             //State variable for Audio Mute
      joinSucceed: false,                         //State variable for storing success
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
  componentDidMount() {
    console.log('roomV',this.state.channelName)
    RtcEngine.on('userJoined', (data) => {
      const { peerIds } = this.state;             //Get currrent peer IDs
      if (peerIds.indexOf(data.uid) === -1) {     //If new user has joined
        this.setState({
          peerIds: [...peerIds, data.uid],        //add peer ID to state array
        });
      }
    });
    RtcEngine.on('userOffline', (data) => {       //If user leaves
      this.endCall()
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
        {
        
             this.state.peerIds.length > 0
              ? <View style={{ height: dimensions.height - 50 }}>
                <AgoraView style={{ flex: 1 }}
                  remoteUid={this.state.peerIds[0]} mode={1} />
              </View>
              : 
                <View style={styles.renderView}>
                  <Text style={styles.renderText}>connecting...</Text>

                  <View style={styles.render}>
                    <ActivityIndicator size="large" color="#000000" />
                  </View>
                </View>
        }

        <TouchableOpacity onPress={()=>this.endCall()}
          style={styles.endCallButton}>
            <Text style={styles.endText}>اققل المكالمه</Text>
        </TouchableOpacity>
        
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
  endCallButton:{
    height:'15%',
    backgroundColor:'#000000',
    width:'98%',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:0,
    margin:'1%',
    borderRadius:10
    
  },
  renderView:{
    height:'85%',
    backgroundColor:'#ffffff',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  renderText:{
    fontSize:40
  },
  endText:{
    fontSize:40,
    color:'#dddddd'
  },
  upView:{
    width:'100%',
    height:'85%'
  }
});