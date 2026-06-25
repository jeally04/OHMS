import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function SplashScreen() {
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem('userToken');
      setTimeout(() => {
        navigation.replace(token ? 'Main' : 'Auth');
      }, 2000);
    }
    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>OHMS</Text>
      <Text style={styles.tagline}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#bfdbfe',
    marginTop: 12,
  },
});
