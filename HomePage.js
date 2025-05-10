import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';

export default function HomePage({ navigation }) {
  const { profile, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {profile?.email || 'user'}!</Text>
      <Button title="Go to For You" onPress={() => navigation.navigate('HomeScreen')} />
      <View style={{ height: 20 }} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#061e45',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16
  }
});
