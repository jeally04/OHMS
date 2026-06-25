import React, { useState } from 'react';
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
import { useAuth } from '../context/AuthContext';
import { C } from '../theme/colors';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [loading, setLoading]       = useState(false);
  const [showPass, setShowPass]     = useState(false);
  const [focusedField, setFocused]  = useState<'email' | 'pass' | null>(null);

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

  function inputBorder(field: 'email' | 'pass') {
    return focusedField === field ? C.green700 : C.border;
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
        {/* Top branding */}
        <View style={s.brand}>
          <View style={s.iconWrap}>
            <Text style={s.icon}>🍄</Text>
          </View>
          <Text style={s.logo}>OHMS</Text>
          <Text style={s.logoSub}>Mushroom Farm Management</Text>
        </View>

        {/* Login card */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Welcome Back</Text>
          <Text style={s.cardSub}>Sign in to monitor your grow room</Text>

          {/* Email */}
          <View style={s.fieldGroup}>
            <Text style={s.label}>Email Address</Text>
            <View style={[s.inputRow, { borderColor: inputBorder('email') }]}>
              <Text style={s.inputIcon}>✉️</Text>
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
            <View style={[s.inputRow, { borderColor: inputBorder('pass') }]}>
              <Text style={s.inputIcon}>🔒</Text>
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
                <Text style={s.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign in button */}
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
            <Text style={s.hintText}>
              Demo — admin@ohms.com / password
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={s.footer}>ESP32-Powered Farm Monitoring  •  v1.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.cream,
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
    backgroundColor: C.green900,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: C.green900,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 10,
  },
  icon: {
    fontSize: 44,
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: C.green900,
    letterSpacing: 8,
  },
  logoSub: {
    fontSize: 13,
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
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: C.text,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 14,
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
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: C.text,
  },
  eyeBtn: {
    padding: 6,
  },
  eyeIcon: {
    fontSize: 16,
  },
  btn: {
    backgroundColor: C.green800,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: C.green800,
    shadowOpacity: 0.35,
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
    fontSize: 16,
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
