import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios'

export default function MessageItem({message, currentUser}) {
  
  const [translatedMessage, setTranslatedMessage] = useState('');

  useEffect(() => {
    if (currentUser?.userId !== message?.userId) {
      translateMessage(message.text);
    }
  }, [currentUser, message]);

  const translateMessage = async (message) => {
    try {
      const response = await axios.post('http://192.168.0.165:5000/translate', {
        src_text: message,
        // TODO: store languages as language codes in firebase then update src_lang and tgt_lang
        src_lang: 'en',
        tgt_lang: 'fr',
      });
      setTranslatedMessage(response.data.translation);
    } catch (error) {
      console.error('Error translating message:', error);
    }
  };

  if(currentUser?.userId==message?.userId){
    // my message
    return (
        <View className="flex-row justify-end mb-3 mr-3">
            <View style={{width: wp(80)}}>
                <View className="flex self-end p-3 rounded-2xl px-4 bg-white border border-neutral-200">
                    <Text style={{fontSize: hp(1.9)}}>
                        {translatedMessage || message?.text}
                    </Text>
                </View>
            </View>
        </View>
    )
  }else{
    return (
        <View style={{width: wp(80)}} className="ml-3 mb-3">
            <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
                <Text style={{fontSize: hp(1.9)}}>
                    {translatedMessage || message?.text}
                </Text>
            </View>
        </View>
    )
  }
}
