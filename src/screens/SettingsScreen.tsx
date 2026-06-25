import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { C } from '../theme/colors';

// ── Small increment/decrement control ─────────────────────────────────────────
function Stepper({
  value,
  unit,
  step = 1,
  onDecrement,
  onIncrement,
  color = C.green800,
}: {
  value: number;
  unit: string;
  step?: number;
  onDecrement: () => void;
  onIncrement: () => void;
  color?: string;
}) {
  return (
    <View style={sp.row}>
      <TouchableOpacity style={sp.btn} onPress={onDecrement} activeOpacity={0.75}>
        <Text style={sp.btnText}>−</Text>
      </TouchableOpacity>
      <Text style={[sp.value, { color }]}>
        {value}
        <Text style={sp.unit}>{unit}</Text>
      </Text>
      <TouchableOpacity style={sp.btn} onPress={onIncrement} activeOpacity={0.75}>
        <Text style={sp.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const sp = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.creamMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: C.textSub,
    lineHeight: 22,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 54,
    textAlign: 'center',
  },
  unit: {
    fontSize: 12,
    fontWeight: '500',
    color: C.textMuted,
  },
});

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return <Text style={sh.text}>{title}</Text>;
}

const sh = StyleSheet.create({
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 2,
  },
});

// ── Setting row (navigation-style) ────────────────────────────────────────────
function NavRow({
  icon,
  label,
  value,
  danger,
  onPress,
}: {
  icon: string;
  label: string;
  value?: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={nr.row}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <Text style={nr.icon}>{icon}</Text>
      <Text style={[nr.label, danger && nr.danger]}>{label}</Text>
      <View style={nr.right}>
        {value ? <Text style={nr.value}>{value}</Text> : null}
        {onPress ? <Text style={nr.chevron}>›</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const nr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.divider,
  },
  icon: {
    fontSize: 18,
    width: 32,
    textAlign: 'center',
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },
  danger: {
    color: C.error,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontSize: 14,
    color: C.textMuted,
  },
  chevron: {
    fontSize: 20,
    color: C.creamDark,
    lineHeight: 22,
  },
});

// ── Toggle row ────────────────────────────────────────────────────────────────
function ToggleRow({
  icon,
  label,
  value,
  onToggle,
  color = C.green700,
}: {
  icon: string;
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
  color?: string;
}) {
  return (
    <View style={tr.row}>
      <Text style={tr.icon}>{icon}</Text>
      <Text style={tr.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#d1d5db', true: color }}
        thumbColor="#ffffff"
      />
    </View>
  );
}

const tr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.divider,
  },
  icon: {
    fontSize: 18,
    width: 32,
    textAlign: 'center',
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },
});

// ── Card wrapper ──────────────────────────────────────────────────────────────
function Card({ children }: { children: React.ReactNode }) {
  return <View style={crd.card}>{children}</View>;
}

const crd = StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
});

// ── Threshold row (stepper inside card) ──────────────────────────────────────
function ThresholdRow({
  icon,
  label,
  value,
  unit,
  color,
  onDecrement,
  onIncrement,
}: {
  icon: string;
  label: string;
  value: number;
  unit: string;
  color: string;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <View style={thr.row}>
      <Text style={thr.icon}>{icon}</Text>
      <Text style={thr.label}>{label}</Text>
      <Stepper
        value={value}
        unit={unit}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        color={color}
      />
    </View>
  );
}

const thr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.divider,
  },
  icon: {
    fontSize: 18,
    width: 32,
    textAlign: 'center',
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },
});

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const { logout } = useAuth();

  // Device thresholds
  const [tempMin, setTempMin] = useState(18);
  const [tempMax, setTempMax] = useState(28);
  const [humMin,  setHumMin]  = useState(80);
  const [humMax,  setHumMax]  = useState(95);

  // Auto-control & alerts
  const [autoControl,   setAutoControl]   = useState(false);
  const [pushAlerts,    setPushAlerts]    = useState(true);
  const [emailAlerts,   setEmailAlerts]   = useState(false);

  function handleLogout() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  }

  function saveThresholds() {
    if (tempMin >= tempMax) {
      Alert.alert('Invalid Range', 'Temperature min must be less than max.');
      return;
    }
    if (humMin >= humMax) {
      Alert.alert('Invalid Range', 'Humidity min must be less than max.');
      return;
    }
    Alert.alert('Saved', `Thresholds updated:\nTemp ${tempMin}–${tempMax}°C  |  Humidity ${humMin}–${humMax}%`);
  }

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile section */}
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

      {/* Device thresholds */}
      <SectionHeader title="Device Thresholds" />
      <Card>
        <ThresholdRow
          icon="🌡️"
          label="Temp Min"
          value={tempMin}
          unit="°C"
          color={C.temp}
          onDecrement={() => setTempMin(v => Math.max(0, v - 1))}
          onIncrement={() => setTempMin(v => Math.min(tempMax - 1, v + 1))}
        />
        <ThresholdRow
          icon="🌡️"
          label="Temp Max"
          value={tempMax}
          unit="°C"
          color={C.temp}
          onDecrement={() => setTempMax(v => Math.max(tempMin + 1, v - 1))}
          onIncrement={() => setTempMax(v => Math.min(50, v + 1))}
        />
        <ThresholdRow
          icon="💧"
          label="Humidity Min"
          value={humMin}
          unit="%"
          color={C.humid}
          onDecrement={() => setHumMin(v => Math.max(0, v - 1))}
          onIncrement={() => setHumMin(v => Math.min(humMax - 1, v + 1))}
        />
        <ThresholdRow
          icon="💧"
          label="Humidity Max"
          value={humMax}
          unit="%"
          color={C.humid}
          onDecrement={() => setHumMax(v => Math.max(humMin + 1, v - 1))}
          onIncrement={() => setHumMax(v => Math.min(100, v + 1))}
        />
        <TouchableOpacity style={s.saveBtn} onPress={saveThresholds} activeOpacity={0.8}>
          <Text style={s.saveBtnText}>Save Thresholds</Text>
        </TouchableOpacity>
      </Card>

      {/* Auto-control */}
      <SectionHeader title="Automation" />
      <Card>
        <ToggleRow
          icon="⚡"
          label="Auto-Control Devices"
          value={autoControl}
          onToggle={setAutoControl}
          color={C.green700}
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
        <ToggleRow
          icon="🔔"
          label="Push Alerts"
          value={pushAlerts}
          onToggle={setPushAlerts}
          color={C.warning}
        />
        <ToggleRow
          icon="✉️"
          label="Email Alerts"
          value={emailAlerts}
          onToggle={setEmailAlerts}
          color={C.warning}
        />
      </Card>

      {/* Farm info */}
      <SectionHeader title="Farm Info" />
      <Card>
        <NavRow icon="🌿" label="Farm Name"    value="My Mushroom Farm" />
        <NavRow icon="📍" label="Grow Room"    value="Room 1" />
        <NavRow icon="🔌" label="Device ID"    value="ESP32-OHMS-01" />
        <NavRow icon="🕐" label="Last Sync"    value="2 mins ago" />
      </Card>

      {/* Account */}
      <SectionHeader title="Account" />
      <Card>
        <NavRow icon="👤" label="Edit Profile"      onPress={() => Alert.alert('Coming Soon')} />
        <NavRow icon="🔑" label="Change Password"   onPress={() => Alert.alert('Coming Soon')} />
      </Card>

      {/* App */}
      <SectionHeader title="App" />
      <Card>
        <NavRow icon="📱" label="Version" value="1.0.0" />
        <NavRow icon="ℹ️"  label="About"   onPress={() => Alert.alert('OHMS v1.0', 'Optimal Harvest Management System\n\nBuilt for mushroom farm monitoring with ESP32.')} />
        <NavRow icon="❓" label="Help"     onPress={() => Alert.alert('Help', 'Contact support at admin@ohms.com')} />
      </Card>

      {/* Sign out */}
      <SectionHeader title="Session" />
      <Card>
        <NavRow icon="🚪" label="Sign Out" danger onPress={handleLogout} />
      </Card>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.cream,
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
    backgroundColor: C.green800,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: C.green800,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: C.text,
  },
  profileEmail: {
    fontSize: 13,
    color: C.textMuted,
    marginTop: 2,
  },
  deviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.green100,
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
    color: C.green900,
    fontWeight: '600',
  },
  saveBtn: {
    margin: 14,
    backgroundColor: C.green800,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  autoHint: {
    margin: 12,
    marginTop: 0,
    backgroundColor: C.green50,
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.green500,
  },
  autoHintText: {
    fontSize: 12,
    color: C.green900,
    lineHeight: 18,
  },
});
