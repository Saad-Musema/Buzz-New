import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

export default function InviteFriendsScreen() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCopyLink = async () => {
    const playStoreLink = "https://play.google.com/store/apps/details?id=com.bamose.gurshagab";
    await Clipboard.setStringAsync(playStoreLink);
    alert('Link copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBackPress} style={{ marginRight: 20 }}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="#0BDA51" />
        </Pressable>
        <Text style={styles.title}>Invite Friends</Text>
      </View>
      <Pressable onPress={handleCopyLink} style={styles.copyButton}>
        <Text style={styles.copyButtonText}>Copy Play Store Link</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#43c67d',
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Adjust as needed
  },
  copyButtonText: {
    color: '#fff',
  },
});
