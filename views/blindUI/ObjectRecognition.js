import {Image,} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import { fetch } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as jpeg from 'jpeg-js'

//==================================================

export var isModelReady = false

//==================================================

export async function getReady(){
  //console.log('in')
  await tf.ready()
  this.model = await mobilenet.load()
  isModelReady=true
  console.log('ready')
  return true
  
}

//==================================================

function imageToTensor(rawImageData) {
  const TO_UINT8ARRAY = true
  const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
  // Drop the alpha channel info for mobilenet
  const buffer = new Uint8Array(width * height * 3)
  let offset = 0 // offset into original data
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset]
    buffer[i + 1] = data[offset + 1]
    buffer[i + 2] = data[offset + 2]
  
    offset += 4
  }
  
  return tf.tensor3d(buffer, [height, width, 3])
}

//==================================================
  
export async function classifyImage(image){
  try {
    const imageAssetPath = Image.resolveAssetSource(image)
    const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
    const rawImageData = await response.arrayBuffer()
    const imageTensor = imageToTensor(rawImageData)
    const predictions = await this.model.classify(imageTensor)
    //state.predictions={ predictions }
    console.log(predictions)
    return predictions
  }catch (error) {
    console.log(error)
  }
}

//==================================================
  
selectImage = async () => {
  try {   
    this.classifyImage()
  } catch (error) {
    console.log(error)
  }
}

