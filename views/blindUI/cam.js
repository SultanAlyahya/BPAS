import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Platform, } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs'
import { fetch } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as jpeg from 'jpeg-js'
import Constants from 'expo-constants'
import styles from './style'

import {isModelReady, getReady} from './ObjectRecognition'




export default class cam extends React.Component{
 
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    isTfReady: false,
    isModelReady: isModelReady,
    predictions: null,
  }

  async componentDidMount() {
    
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate('objectP', {imagePath:photo.uri})}
      //classifyImage({uri:photo.uri})

    }
  

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
  }

  // imageToTensor(rawImageData) {
  //   const TO_UINT8ARRAY = true
  //   const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
  //   // Drop the alpha channel info for mobilenet
  //   const buffer = new Uint8Array(width * height * 3)
  //   let offset = 0 // offset into original data
  //   for (let i = 0; i < buffer.length; i += 3) {
  //     buffer[i] = data[offset]
  //     buffer[i + 1] = data[offset + 1]
  //     buffer[i + 2] = data[offset + 2]

  //     offset += 4
  //   }

  //   return tf.tensor3d(buffer, [height, width, 3])
  // }

  // classifyImage = async () => {
  //   try {
  //     const imageAssetPath = Image.resolveAssetSource(this.state.image)
  //     const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
  //     const rawImageData = await response.arrayBuffer()
  //     const imageTensor = this.imageToTensor(rawImageData)
  //     const predictions = await this.model.classify(imageTensor)
  //     this.setState({ predictions })
  //     console.log(predictions)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // selectImage = async () => {
  //   try {
  //     // let response = await ImagePicker.launchImageLibraryAsync({
  //     //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     //   allowsEditing: true,
  //     //   aspect: [4, 3]
  //     // })

  //     // if (!response.cancelled) {
  //     //   const source = { uri: response.uri }
  //     //   console.log(source)
  //     //   this.setState({ image: source })
  //     //   this.classifyImage()
  //     // }
  //     // console.log(this.state.imageURI)
  //     // const source = { uri: this.state.imageURI }
  //     // console.log(source)
  //     // this.setState({ image: source })
  //     this.classifyImage()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // renderPrediction = prediction => {
  //   return (
  //     <Text key={prediction.className} style={styles.text}>
  //       {prediction.className}
  //     </Text>
  //   )
  // }

  laod=async()=>{
    try{
    const ready = await getReady()
        console.log(ready)
    }catch(error){
        console.log(error)
    }
      }
  

  render(){
   
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera style={{ height:'100%', width:'100%' }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
              <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent'                 
                  }}
                  onPress={()=>this.pickImage()}>
                  <Ionicons
                      name="ios-photos"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.takePicture()}
                  >
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.handleCameraType()}
                  >
                  <MaterialCommunityIcons
                      name="camera-switch"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
              </View>
            </Camera>
        </View>
      );
    }
  }
  
}
  


