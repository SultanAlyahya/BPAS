import React from 'react';
import {AsyncStorage} from 'react-native';

export const saveUserdata = async(loginData)=>{
    await AsyncStorage.setItem('login',JSON.stringify(loginData));
}

export const retrieveData = async()=>{
    try{
        const loginData = await AsyncStorage.getItem('login')
        const dataToJson = JSON.parse(loginData)
        return dataToJson
    }catch(error){
    return 'non'
    }
    
}

export const saveData =async(token, type)=>{
    console.log('type',type)
    try {
        const data = await AsyncStorage.setItem('login', JSON.stringify({token,type}));
      } catch (error) {
        return false
      }
      return true
}

export const logout=async()=>{
    try{
        await AsyncStorage.removeItem('login')
        return true
    }catch(error){
        console.log(error)
        return false
    }
}