import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const GREEN900 = '#1b4332';
const GREEN500 = '#52b788';
const GREEN300 = '#95d5b2';

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.85)).current;
  const dot1    = useRef(new Animated.Value(0.3)).current;
  const dot2    = useRef(new Animated.Value(0.3)).current;
  const dot3    = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 50, useNativeDriver: true }),
    ]).start();

    const pulse = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1,   duration: 400, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ])
      ).start();

    pulse(dot1, 0);
    pulse(dot2, 200);
    pulse(dot3, 400);
  }, []);

  return (
    <View style={s.container}>
      <Animated.View style={[s.content, { opacity, transform: [{ scale }] }]}>
        <View style={s.iconRing}>
          <MaterialCommunityIcons name="mushroom" size={52} color="#ffffff" />
        </View>

        <Text style={s.logo}>OHMS</Text>
        <Text style={s.fullName}>Optimal Harvest Management System</Text>

        <View style={s.divider} />

        <Text style={s.subtitle}>Mushroom Farm Monitor</Text>
        <Text style={s.device}>Powered by ESP32</Text>
      </Animated.View>

      <View style={s.loaderRow}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View key={i} style={[s.dot, { opacity: dot }]} />
        ))}
      </View>
      <Text style={s.loadingText}>Connecting to device...</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREEN900,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  content: {
    alignItems: 'center',
  },
  iconRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 12,
  },
  fullName: {
    fontSize: 12,
    color: GREEN300,
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: GREEN500,
    borderRadius: 1,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  device: {
    fontSize: 12,
    color: GREEN500,
    marginTop: 6,
  },
  loaderRow: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 72,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN500,
  },
  loadingText: {
    position: 'absolute',
    bottom: 48,
    fontSize: 12,
    color: GREEN500,
    letterSpacing: 0.5,
  },
});
