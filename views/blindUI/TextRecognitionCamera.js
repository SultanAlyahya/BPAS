import React from 'react';
import { Text, View, TouchableOpacity, Button} from 'react-native';
import { Camera } from 'expo-camera';
import styles from './style'



export default class TextRecognitionCamera extends React.Component{
 
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    text: "تغيير النص الى العربية",
    language: "en",
  }

  async componentDidMount() {
    
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    // Camera Permission
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' });
  }

  takePicture=async()=>{
    try{
      const photo= await this.camera.takePictureAsync({quality:0.25})
      this.props.navigation.navigate('textPageP',{imageURI: photo.uri, language: this.state.language})
    }catch(error){
      console.log(error.message)
    }
  }

  changeLanguage=()=>{
    if(this.state.language==='en'){
      this.setState({language:'ar'})
      this.setState({text:"تغيير النص الى النجليزية"})
    }else{
      this.setState({language:'en'})
      this.setState({text:"تغيير النص الى العربية"})
    }
  }
  render(){
  //the ref method is used to make it able to use the camera methods from this.camera
  return (
    <View style={{flex:1}}>
      <Camera style={styles.Camera} type={this.state.cameraType} ref={ref => {this.camera = ref}}>
      
        <View style={styles.container}>
          <TouchableOpacity style={styles.CameraButton} onPress={()=>  this.takePicture()}>
          <Text style={styles.CameraText}>قم بالضغط على الشاشة لقراءة النص</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity style={this.state.language === 'en'? styles.languageAR: styles.languageEN}
      onPress={()=> this.changeLanguage()}>
          <Text style={styles.languageText}>{this.state.text}</Text>
      </TouchableOpacity>
      </View>
  );
  }
}

