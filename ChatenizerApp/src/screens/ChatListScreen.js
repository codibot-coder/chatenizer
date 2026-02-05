import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

// Datos de ejemplo para la lista de chats
const sampleChats = [
  {
    id: '1',
    name: 'Juan Pérez',
    lastMessage: 'Hola, ¿cómo estás?',
    time: '10:30 AM',
    unread: 2,
    avatar: 'https://via.placeholder.com/50x50/007AFF/FFFFFF?text=JP',
  },
  {
    id: '2',
    name: 'María García',
    lastMessage: 'Nos vemos mañana',
    time: '9:15 AM',
    unread: 0,
    avatar: 'https://via.placeholder.com/50x50/FF6B6B/FFFFFF?text=MG',
  },
  {
    id: '3',
    name: 'Carlos López',
    lastMessage: 'Gracias por la ayuda',
    time: 'Yesterday',
    unread: 1,
    avatar: 'https://via.placeholder.com/50x50/4ECDC4/FFFFFF?text=CL',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    lastMessage: '¿Cuándo podemos reunirnos?',
    time: 'Yesterday',
    unread: 0,
    avatar: 'https://via.placeholder.com/50x50/45B7D1/FFFFFF?text=AM',
  },
];

const ChatListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setChats(sampleChats);
    }, 500);
  }, []);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { chat: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ChatListScreen;