import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/colors';

// ── Stepper ───────────────────────────────────────────────────────────────────
function Stepper({
  value, unit, onDecrement, onIncrement, color,
}: {
  value: number; unit: string;
  onDecrement: () => void; onIncrement: () => void;
  color: string;
}) {
  const { theme: C } = useTheme();
  const sp = useMemo(() => makeStepperStyles(C), [C]);
  return (
    <View style={sp.row}>
      <TouchableOpacity style={sp.btn} onPress={onDecrement} activeOpacity={0.75}>
        <Ionicons name="remove" size={18} color={C.textSub} />
      </TouchableOpacity>
      <Text style={[sp.value, { color }]}>
        {value}<Text style={sp.unit}>{unit}</Text>
      </Text>
      <TouchableOpacity style={sp.btn} onPress={onIncrement} activeOpacity={0.75}>
        <Ionicons name="add" size={18} color={C.textSub} />
      </TouchableOpacity>
    </View>
  );
}

function makeStepperStyles(C: Theme) {
  return StyleSheet.create({
    row:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
    btn:   { width: 32, height: 32, borderRadius: 10, backgroundColor: C.surfaceAlt, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
    value: { fontSize: 14, fontWeight: '700', minWidth: 54, textAlign: 'center' },
    unit:  { fontSize: 12, fontWeight: '500', color: '#8e8e93' },
  });
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  const { theme: C } = useTheme();
  return (
    <Text style={{
      fontSize: 11, fontWeight: '700', color: C.textMuted,
      textTransform: 'uppercase', letterSpacing: 1.2,
      marginTop: 24, marginBottom: 8, paddingHorizontal: 2,
    }}>
      {title}
    </Text>
  );
}

// ── Card wrapper ──────────────────────────────────────────────────────────────
function Card({ children }: { children: React.ReactNode }) {
  const { theme: C } = useTheme();
  return (
    <View style={{
      backgroundColor: C.surface, borderRadius: 16, overflow: 'hidden',
      shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 3 },
      shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: C.border,
    }}>
      {children}
    </View>
  );
}

// ── Nav Row ───────────────────────────────────────────────────────────────────
function NavRow({
  iconName, label, value, danger, onPress,
}: {
  iconName: string; label: string; value?: string; danger?: boolean; onPress?: () => void;
}) {
  const { theme: C } = useTheme();
  const nr = useMemo(() => makeNavRowStyles(C), [C]);
  const iconColor = danger ? C.error : C.textMuted;

  return (
    <TouchableOpacity style={nr.row} onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <View style={[nr.iconWrap, { backgroundColor: danger ? C.errorBg : C.surfaceAlt }]}>
        <Ionicons name={iconName as any} size={18} color={iconColor} />
      </View>
      <Text style={[nr.label, danger && { color: C.error }, { fontSize: 14 }]}>{label}</Text>
      <View style={nr.right}>
        {value ? <Text style={nr.value}>{value}</Text> : null}
        {onPress ? <Ionicons name="chevron-forward" size={16} color={C.textFaint} /> : null}
      </View>
    </TouchableOpacity>
  );
}

function makeNavRowStyles(C: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row', alignItems: 'center', padding: 14,
      borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.divider,
    },
    iconWrap: { width: 32, height: 32, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    label:    { flex: 1, fontSize: 14, color: '#1c1c1e', fontWeight: '500' },
    right:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
    value:    { fontSize: 13, color: '#8e8e93' },
  });
}

// ── Toggle Row ────────────────────────────────────────────────────────────────
function ToggleRow({
  iconName, label, value, onToggle, color, iconBg,
}: {
  iconName: string; label: string; value: boolean;
  onToggle: (v: boolean) => void; color: string; iconBg: string;
}) {
  const { theme: C } = useTheme();
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', padding: 14,
      borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.divider,
    }}>
      <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: iconBg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
        <Ionicons name={iconName as any} size={18} color={color} />
      </View>
      <Text style={{ flex: 1, fontSize: 14, color: C.text, fontWeight: '500' }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: C.border, true: color }}
        thumbColor="#ffffff"
      />
    </View>
  );
}

// ── Threshold Row ─────────────────────────────────────────────────────────────
function ThresholdRow({
  iconName, iconBg, label, value, unit, color, onDecrement, onIncrement,
}: {
  iconName: string; iconBg: string; label: string; value: number;
  unit: string; color: string; onDecrement: () => void; onIncrement: () => void;
}) {
  const { theme: C } = useTheme();
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', padding: 14,
      borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.divider,
    }}>
      <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: iconBg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
        <Ionicons name={iconName as any} size={18} color={color} />
      </View>
      <Text style={{ flex: 1, fontSize: 14, color: C.text, fontWeight: '500' }}>{label}</Text>
      <Stepper value={value} unit={unit} color={color} onDecrement={onDecrement} onIncrement={onIncrement} />
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const { logout } = useAuth();
  const { theme: C, isDark, toggleTheme } = useTheme();
  const s = useMemo(() => makeStyles(C), [C]);

  const [tempMin, setTempMin] = useState(18);
  const [tempMax, setTempMax] = useState(28);
  const [humMin,  setHumMin]  = useState(80);
  const [humMax,  setHumMax]  = useState(95);
  const [autoControl, setAutoControl] = useState(false);
  const [pushAlerts,  setPushAlerts]  = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);

  function handleLogout() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  }

  function saveThresholds() {
    if (tempMin >= tempMax) { Alert.alert('Invalid Range', 'Temperature min must be less than max.'); return; }
    if (humMin  >= humMax)  { Alert.alert('Invalid Range', 'Humidity min must be less than max.');    return; }
    Alert.alert('Saved', `Thresholds updated:\nTemp ${tempMin}–${tempMax}°C  |  Humidity ${humMin}–${humMax}%`);
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      {/* Profile */}
      <View style={s.profile}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>A</Text>
        </View>
        <Text style={s.profileName}>Admin User</Text>
        <Text style={s.profileEmail}>admin@ohms.com</Text>
        <View style={s.deviceChip}>
          <View style={s.onlineDot} />
          <Text style={s.deviceChipText}>ESP32-OHMS-01  •  Connected</Text>
        </View>
      </View>

      {/* Appearance */}
      <SectionHeader title="Appearance" />
      <Card>
        <ToggleRow
          iconName={isDark ? 'moon' : 'sunny'}
          iconBg={isDark ? '#1e1535' : '#fffbeb'}
          label="Dark Mode"
          value={isDark}
          onToggle={toggleTheme}
          color={isDark ? C.fan : C.warning}
        />
      </Card>

      {/* Device thresholds */}
      <SectionHeader title="Device Thresholds" />
      <Card>
        <ThresholdRow iconName="thermometer-outline" iconBg={C.tempBg} label="Temp Min"       value={tempMin} unit="°C" color={C.temp}  onDecrement={() => setTempMin(v => Math.max(0,          v - 1))} onIncrement={() => setTempMin(v => Math.min(tempMax - 1, v + 1))} />
        <ThresholdRow iconName="thermometer"         iconBg={C.tempBg} label="Temp Max"       value={tempMax} unit="°C" color={C.temp}  onDecrement={() => setTempMax(v => Math.max(tempMin + 1, v - 1))} onIncrement={() => setTempMax(v => Math.min(50,          v + 1))} />
        <ThresholdRow iconName="water-outline"       iconBg={C.humidBg} label="Humidity Min"  value={humMin}  unit="%"  color={C.humid} onDecrement={() => setHumMin(v  => Math.max(0,          v - 1))} onIncrement={() => setHumMin(v  => Math.min(humMax - 1,  v + 1))} />
        <ThresholdRow iconName="water"               iconBg={C.humidBg} label="Humidity Max"  value={humMax}  unit="%"  color={C.humid} onDecrement={() => setHumMax(v  => Math.max(humMin + 1,  v - 1))} onIncrement={() => setHumMax(v  => Math.min(100,         v + 1))} />
        <TouchableOpacity style={s.saveBtn} onPress={saveThresholds} activeOpacity={0.8}>
          <Text style={s.saveBtnText}>Save Thresholds</Text>
        </TouchableOpacity>
      </Card>

      {/* Automation */}
      <SectionHeader title="Automation" />
      <Card>
        <ToggleRow
          iconName="flash-outline"
          iconBg={C.primaryBg}
          label="Auto-Control Devices"
          value={autoControl}
          onToggle={setAutoControl}
          color={C.primary}
        />
        {autoControl && (
          <View style={s.autoHint}>
            <Text style={s.autoHintText}>
              Fan & humidifier will activate automatically when readings leave the threshold range.
            </Text>
          </View>
        )}
      </Card>

      {/* Notifications */}
      <SectionHeader title="Notifications" />
      <Card>
        <ToggleRow iconName="notifications-outline" iconBg={C.warningBg} label="Push Alerts"  value={pushAlerts}  onToggle={setPushAlerts}  color={C.warning} />
        <ToggleRow iconName="mail-outline"           iconBg={C.warningBg} label="Email Alerts" value={emailAlerts} onToggle={setEmailAlerts} color={C.warning} />
      </Card>

      {/* Farm Info */}
      <SectionHeader title="Farm Info" />
      <Card>
        <NavRow iconName="leaf-outline"           label="Farm Name" value="My Mushroom Farm" />
        <NavRow iconName="location-outline"       label="Grow Room" value="Room 1" />
        <NavRow iconName="hardware-chip-outline"  label="Device ID" value="ESP32-OHMS-01" />
        <NavRow iconName="time-outline"           label="Last Sync" value="2 mins ago" />
      </Card>

      {/* Account */}
      <SectionHeader title="Account" />
      <Card>
        <NavRow iconName="person-outline" label="Edit Profile"    onPress={() => Alert.alert('Coming Soon')} />
        <NavRow iconName="key-outline"    label="Change Password" onPress={() => Alert.alert('Coming Soon')} />
      </Card>

      {/* App */}
      <SectionHeader title="App" />
      <Card>
        <NavRow iconName="phone-portrait-outline"       label="Version" value="1.0.0" />
        <NavRow iconName="information-circle-outline"   label="About"   onPress={() => Alert.alert('OHMS v1.0', 'Optimal Harvest Management System\n\nBuilt for mushroom farm monitoring with ESP32.')} />
        <NavRow iconName="help-circle-outline"          label="Help"    onPress={() => Alert.alert('Help', 'Contact support at admin@ohms.com')} />
      </Card>

      {/* Session */}
      <SectionHeader title="Session" />
      <Card>
        <NavRow iconName="log-out-outline" label="Sign Out" danger onPress={handleLogout} />
      </Card>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function makeStyles(C: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: C.bg,
    },
    content: {
      padding: 16,
      paddingBottom: 40,
    },
    profile: {
      alignItems: 'center',
      paddingVertical: 28,
    },
    avatar: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: C.primaryBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      elevation: 8,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: '700',
      color: C.primaryLight,
    },
    profileName: {
      fontSize: 17,
      fontWeight: '700',
      color: C.text,
    },
    profileEmail: {
      fontSize: 12,
      color: C.textMuted,
      marginTop: 2,
    },
    deviceChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.successBg,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 20,
      marginTop: 10,
      gap: 6,
    },
    onlineDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: C.success,
    },
    deviceChipText: {
      fontSize: 12,
      color: C.success,
      fontWeight: '600',
    },
    saveBtn: {
      margin: 14,
      backgroundColor: C.primary,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
    },
    saveBtnText: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 13,
    },
    autoHint: {
      margin: 12,
      marginTop: 0,
      backgroundColor: C.primaryBg,
      borderRadius: 10,
      padding: 10,
      borderLeftWidth: 3,
      borderLeftColor: C.primary,
    },
    autoHintText: {
      fontSize: 12,
      color: C.primaryLight,
      lineHeight: 18,
    },
  });
}
