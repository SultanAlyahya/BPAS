import React from 'react';
import { View, Text, StyleSheet} from 'react-native';



export default class Header extends React.Component{
    render(){
        
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
             </View>
        )
    }
}





const styles = StyleSheet.create({
    container:{
        height:200,
        width:"100%",
        justifyContent:'center',
        backgroundColor:'#ffffff',
        alignItems:'center',
    },
    text:{
        fontSize:40
    }
})