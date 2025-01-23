import React from 'react';
import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock data for features
const features = [
  { id: '1', title: 'Create Posts anonymously', icon: 'pencil-outline' },
  { id: '2', title: 'Discover campus Trends ', icon: 'trending-up' },
  
  { id: '3', title: 'Write comment anonymously', icon: 'message-text-outline' },
  { id: '4', title: 'Track your post', icon: 'account-circle-outline' },
  { id: '5', title: 'Posts are only visible withn 5km radius ', icon: 'map-marker-outline' },
  { id: '6', title: ' choose a location from the map & travel', icon: 'map' },
  // Add more features as needed
];

export default function FeatureListing() {
    const router = useRouter();

    const redirect = () => {
        router.back();
    };

    // Render each feature as a list item
    const renderFeature = ({ item }:any ) => (
        <View style={styles.featureItem}>
            <MaterialCommunityIcons name={item.icon} size={24} color="#0BDA51" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container} className='pt-8'>
          <View className='flex flex-row'>
            <Pressable onPress={redirect} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={30} color="#0BDA51" />
            </Pressable>

            <Text className="pt-3 "style={styles.title}>Gab Features</Text>
            </View>
            <FlatList
                data={features}
                renderItem={renderFeature}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.featuresList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        marginLeft: 12,
        marginTop: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 12,
        marginBottom: 16,
    },
    featuresList: {
        paddingHorizontal: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    featureIcon: {
        marginRight: 12,
    },
    featureTitle: {
        fontSize: 16,
        color: '#333',
    },
});
