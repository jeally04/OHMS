import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

type SettingRowProps = {
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
};

function SettingRow({ label, value, onPress, danger }: SettingRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} disabled={!onPress}>
      <Text style={[styles.rowLabel, danger && styles.danger]}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { logout } = useAuth();

  function handleLogout() {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={styles.name}>Admin User</Text>
        <Text style={styles.email}>admin@ohms.com</Text>
      </View>

      <Text style={styles.section}>Account</Text>
      <View style={styles.group}>
        <SettingRow label="Profile" onPress={() => {}} />
        <SettingRow label="Change Password" onPress={() => {}} />
        <SettingRow label="Notifications" onPress={() => {}} />
      </View>

      <Text style={styles.section}>App</Text>
      <View style={styles.group}>
        <SettingRow label="Language" value="English" />
        <SettingRow label="Theme" value="Light" />
        <SettingRow label="Version" value="1.0.0" />
      </View>

      <Text style={styles.section}>Session</Text>
      <View style={styles.group}>
        <SettingRow label="Sign Out" onPress={handleLogout} danger />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  email: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  section: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  group: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f3f4f6',
  },
  rowLabel: {
    fontSize: 15,
    color: '#111827',
  },
  rowValue: {
    fontSize: 14,
    color: '#9ca3af',
  },
  chevron: {
    fontSize: 20,
    color: '#d1d5db',
  },
  danger: {
    color: '#ef4444',
  },
});
