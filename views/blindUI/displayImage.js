import React from 'react';
import { View, Text,TouchableOpacity, Image} from 'react-native';

export default class image extends React.Component{
  constructor(props) {
    super(props);
      this.state = { 
        uri: this.props.navigation.state.params.imagePath || 'yes',
        fileName: 'hello.jpg',
        type: 'image/jpeg',
        photo:{uri:this.props.navigation.state.params.imagePath, fileName:'image.jpg', type: 'image/jpeg',}
      };
  }

  //this function is used to create a formData, from formData we can send a pic to the server 
  //the uri: is where the image saved in the cashe
  //the type is the file type the type of the file, take in your mind that our server will take any kind of files for now so for now it's opthional
  //the name is required for the server, i dont know if i need to write .jpg after the name but for now is ok with or without
  //the body value is string with 123, so for evry append elemnet will get a number as a key to make it unique
  createFormData = (photo, body) => {
    const data = new FormData();
    console.log(1)
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    console.log(2)
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    console.log(data)
    return data;
  }

  //=====================================================================================

  //this is a test function of how can we send in image to the server, and it's works well :)
  a= async()=>{
            
    const data = await fetch("http://localhost:3000/User/image", {
      method: "POST",
      body: createFormData(this.state.photo, { userId: "123" })
    })
    const dataJ = await data.json()
    const Data = await dataJ
    console.log(Data)
  }  

  render(){
    return(
      <View>
        <Image 
        style={{width: '50%', height: '50%'}}
        source={{uri:(this.props.navigation.state.params.imagePath).replace("file://","")}} />
          <TouchableOpacity onPress={()=> a()}>
            <Text>click</Text>
         </TouchableOpacity>
      </View>
    )
  }
}