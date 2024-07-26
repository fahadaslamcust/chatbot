import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const YOUR_CHATGPT_API_KEY = 'localhost:8000/';

  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
      const messageText = userMessage.text.toLowerCase();
      const keywords = ['close', 'this', 'stop', 'exit'];

      if (!keywords.some(keyword => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "...",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'chatbot',
             avatar: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg'
          }
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return;
      }

      const response = await axios.get('http://localhost:8000/shoes/43');

      console.log(response.data);
     
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: JSON.stringify(response.data),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'chatbot',
           avatar: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg'
        }
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
      console.log(error);
    }
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 5, marginRight: 5 }}>
          <Icon name="send" size={30} color="#3b5998" />
        </View>
      </Send>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#F5F5F5',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          marginTop: 40,
          marginBottom: 5
        }}
      >
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold'
        }}
        >
          Chatbot
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{ _id: 1 }}
        renderSend={renderSend}
      />
    </View>
  );
}

export default Chatbot;
