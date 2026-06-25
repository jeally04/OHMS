import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const { theme: C } = useTheme();

  const [email,       setEmail]     = useState('');
  const [password,    setPassword]  = useState('');
  const [loading,     setLoading]   = useState(false);
  const [showPass,    setShowPass]  = useState(false);
  const [focusedField, setFocused]  = useState<'email' | 'pass' | null>(null);

  const s = useMemo(() => makeStyles(C), [C]);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    const ok = await login(email.trim(), password);
    setLoading(false);
    if (!ok) {
      Alert.alert('Login Failed', 'Invalid credentials.\n\nDemo: admin@ohms.com / password');
    }
  }

  function borderColor(field: 'email' | 'pass') {
    return focusedField === field ? C.primary : C.border;
  }

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Branding */}
        <View style={s.brand}>
          <View style={s.iconWrap}>
            <MaterialCommunityIcons name="mushroom" size={44} color="#ffffff" />
          </View>
          <Text style={s.logo}>OHMS</Text>
          <Text style={s.logoSub}>Mushroom Farm Management</Text>
        </View>

        {/* Card */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Welcome Back</Text>
          <Text style={s.cardSub}>Sign in to monitor your grow room</Text>

          {/* Email */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Email Address</Text>
            <View style={[s.inputRow, { borderColor: borderColor('email') }]}>
              <Ionicons name="mail-outline" size={18} color={C.textMuted} style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="admin@ohms.com"
                placeholderTextColor={C.textFaint}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Password */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Password</Text>
            <View style={[s.inputRow, { borderColor: borderColor('pass') }]}>
              <Ionicons name="lock-closed-outline" size={18} color={C.textMuted} style={s.inputIcon} />
              <TextInput
                style={[s.input, { flex: 1 }]}
                placeholder="Enter password"
                placeholderTextColor={C.textFaint}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused(null)}
              />
              <TouchableOpacity onPress={() => setShowPass(v => !v)} style={s.eyeBtn}>
                <Ionicons
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={C.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign in */}
          <TouchableOpacity
            style={[s.btn, loading && s.btnLoading]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={s.btnText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
          </TouchableOpacity>

          {/* Demo hint */}
          <View style={s.hint}>
            <Text style={s.hintText}>Demo — admin@ohms.com / password</Text>
          </View>
        </View>

        <Text style={s.footer}>ESP32-Powered Farm Monitoring  •  v1.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function makeStyles(C: ReturnType<typeof useTheme>['theme']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: C.bg,
    },
    scroll: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      paddingBottom: 40,
    },
    brand: {
      alignItems: 'center',
      marginBottom: 28,
    },
    iconWrap: {
      width: 84,
      height: 84,
      borderRadius: 42,
      backgroundColor: C.primaryBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      elevation: 10,
    },
    logo: {
      fontSize: 26,
      fontWeight: '800',
      color: C.primary,
      letterSpacing: 8,
    },
    logoSub: {
      fontSize: 12,
      color: C.textMuted,
      marginTop: 4,
      letterSpacing: 0.3,
    },
    card: {
      width: '100%',
      maxWidth: 420,
      backgroundColor: C.surface,
      borderRadius: 24,
      padding: 28,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 24,
      elevation: 6,
      borderWidth: 1,
      borderColor: C.border,
    },
    cardTitle: {
      fontSize: 19,
      fontWeight: '700',
      color: C.text,
      marginBottom: 4,
    },
    cardSub: {
      fontSize: 13,
      color: C.textMuted,
      marginBottom: 24,
    },
    fieldGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 11,
      fontWeight: '700',
      color: C.textSub,
      marginBottom: 6,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderRadius: 12,
      backgroundColor: C.surfaceAlt,
      paddingHorizontal: 14,
    },
    inputIcon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      paddingVertical: 13,
      fontSize: 14,
      color: C.text,
    },
    eyeBtn: {
      padding: 6,
    },
    btn: {
      backgroundColor: C.primary,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 8,
      shadowColor: C.primary,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      elevation: 5,
    },
    btnLoading: {
      opacity: 0.65,
    },
    btnText: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 14,
      letterSpacing: 0.5,
    },
    hint: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: C.surfaceAlt,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: C.border,
    },
    hintText: {
      fontSize: 12,
      color: C.textMuted,
      textAlign: 'center',
    },
    footer: {
      marginTop: 28,
      fontSize: 12,
      color: C.textFaint,
      textAlign: 'center',
    },
  });
}
