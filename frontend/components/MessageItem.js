import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useAuth } from '../context/authContext'
import axios from 'axios'
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from 'firebase/firestore'

export default function MessageItem({message, currentUser}) {
  
  const [translatedMessage, setTranslatedMessage] = useState('');
  const { user } = useAuth();
  const [languageCode, setLanguageCode] = useState('');

  useEffect(() => {
    getLanguageCode();
    if (currentUser?.userId !== message?.userId) {
      translateMessage(message.text);
    }
  }, [currentUser, message]);

  const translateMessage = async (message) => {
    try {
      const response = await axios.post('http://192.168.0.165:5000/translate', {
        src_text: message,
        // TODO: store languages as language codes in firebase then update src_lang and tgt_lang
        src_lang: user.language,
        tgt_lang: languageCode,
      });
      setTranslatedMessage(response.data.translation);
    } catch (error) {
      console.error('Error translating message:', error);
    }
  };

  // Function to fetch user data from Firestore
  const getLanguageCode = async () => {
    const docRef = doc(db, 'users', message?.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setLanguageCode(data.language);
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
