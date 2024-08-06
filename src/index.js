import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const YOUR_CHATGPT_API_KEY = 'http://localhost:8000/shoes/43';
  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
      const messageText = userMessage.text.toLowerCase();
      const keywords = ['i', 'am', 'looking', 'for'];
      if (!keywords.some(keyword => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "....",
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
      console.log("if condition over");
      const response = await axios.get('https://run.mocky.io/v3/e87072c0-933e-42e1-b6a1-37fdcae2b876');
      let arrbrands=['adidas','hush puppies','nike','ndure','reebok']
       let arrcolors=['orange','blue','black','white','brown','pink','green','grey','red','aqua']
      let shoes = response.data.shoes
      let photo
      /** Returns users preferred color from input, else returns empty string */ 
      function getColor(input){
         let tokens = input.split(' ')
         let user_color = ''
         for (let i= 0; i < arrcolors.length; i++) {
          let found = tokens.includes(arrcolors[i]) 
          if (found==true) {
              user_color = arrcolors[i]
              break
          }
         }
         return user_color
       }
       /** Returns users preferred brand from input, else returns empty string */ 
       function getBrand(input){
        let tokens = input.split(' ')
        let user_brand = '' 
        for (let i= 0; i < arrbrands.length; i++) {
            let found = tokens.includes(arrbrands[i])
            if (found==true) {
                user_brand = arrbrands[i]
                break
            }
        }
        return user_brand
    }
       let usercol=getColor(messageText)
       let userb=getBrand(messageText)
       let matching_shoes_first = [];
       let matching_shoes_others = [];
       for (let index = 0; index < shoes.length; index++){
        if (shoes[index].brand==userb&&shoes[index].color == usercol) {
          matching_shoes_first.push(shoes[index])
         }
         if (shoes[index].brand==userb||shoes[index].color == usercol) {
          matching_shoes_others.push(shoes[index])
         }
       }
       let matching_shoes =  matching_shoes_first.concat(matching_shoes_others)
       matching_shoes = Array.from(new Set(matching_shoes.map(shoe => JSON.stringify(shoe)))).map(shoe => JSON.parse(shoe))
       if (matching_shoes.length==0) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "shoe not available",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'chatbot',
             avatar: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg'
          }
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
      }
      matching_shoes.forEach(shoe => {
      const botMessage = {
        _id: new Date().getTime() + 1,
        text:`Shoe brand is ${shoe.brand} and color is ${shoe.color}`,
        createdAt: new Date(),
        image: shoe.picture,
        user: {
          _id: 2,
          name: 'chatbot',
           avatar: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg'
        }
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
       });
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
