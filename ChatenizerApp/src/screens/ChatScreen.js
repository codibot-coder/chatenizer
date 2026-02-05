import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';

// Datos de ejemplo para mensajes
const sampleMessages = [
  {
    id: '1',
    text: 'Hola, ¿cómo estás?',
    sender: 'other',
    time: '10:30 AM',
  },
  {
    id: '2',
    text: 'Bien, gracias. ¿Y tú?',
    sender: 'me',
    time: '10:31 AM',
  },
  {
    id: '3',
    text: 'Muy bien también. ¿Tienes planes para el fin de semana?',
    sender: 'other',
    time: '10:32 AM',
  },
  {
    id: '4',
    text: 'Sí, voy a visitar a mi familia.',
    sender: 'me',
    time: '10:33 AM',
  },
  {
    id: '5',
    text: '¡Qué bien! Que te diviertas.',
    sender: 'other',
    time: '10:34 AM',
  },
];

const ChatScreen = ({ route, navigation }) => {
  const { chat } = route.params || {};
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: (messages.length + 1).toString(),
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'me' ? styles.myMessageText : styles.otherMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{chat?.name || 'Chat'}</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;