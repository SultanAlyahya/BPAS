import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';




export default class TextRecognitionCamera extends React.Component{
 
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    text: "تغيير النص الى العربية",
    language: "en",
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
    <View style={styles.container}>
      <Camera style={styles.Camera} type={this.state.cameraType} ref={ref => {this.camera = ref}}>
      
          <TouchableOpacity style={styles.CameraButton} onPress={()=>  this.takePicture()}>
          <Text style={styles.CameraText}>قم بالضغط على الشاشة لقراءة النص</Text>
          </TouchableOpacity>
      
      <TouchableOpacity style={this.state.language === 'en'? styles.languageAR: styles.languageEN}
      onPress={()=> this.changeLanguage()}>
          <Text style={styles.languageText}>{this.state.text}</Text>
      </TouchableOpacity>
      </Camera>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  languageEN:{
    height:'20%',
    width:'98%',
    backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  languageAR:{
    height:'20%',
    width:'98%',
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  languageText:{
    fontSize:30
  },
  CameraText:{
    fontSize:20,
    color:'#dddddd',
    textShadowColor:'#000000',
    textShadowOffset: {width:1, height:1},
    textShadowRadius:1,
   
  },
  CameraButton:{
    alignItems:'center',
    justifyContent:'center',
    height:'79%',
    width:'100%'
  },
  Camera:{
    height:'100%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },


})

