import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/colors';

// ── Mock data ─────────────────────────────────────────────────────────────────
const SENSOR = {
  temperature: 22.4,
  humidity: 87.3,
  lastUpdated: '2 mins ago',
  online: true,
};

const THRESHOLDS = {
  tempMin: 18,
  tempMax: 28,
  humidMin: 80,
  humidMax: 95,
};

const ALERTS = [
  { id: 1, type: 'warning', message: 'Humidity slightly elevated (87.3%)', time: '14 min ago' },
  { id: 2, type: 'success', message: 'Fan auto-activated — temp nominal',  time: '1 hr ago'  },
  { id: 3, type: 'success', message: 'Growing conditions stable all day',  time: '3 hrs ago' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
type ConditionStatus = 'optimal' | 'caution' | 'critical';

function getCondition(val: number, min: number, max: number): ConditionStatus {
  if (val < min || val > max) return 'critical';
  const span = max - min;
  if (val >= min + span * 0.15 && val <= max - span * 0.15) return 'optimal';
  return 'caution';
}

function conditionColor(s: ConditionStatus, C: Theme) {
  return s === 'optimal' ? C.success : s === 'caution' ? C.warning : C.error;
}
function conditionLabel(s: ConditionStatus) {
  return s === 'optimal' ? 'Optimal' : s === 'caution' ? 'Caution' : 'Critical';
}

// ── Pulse dot ─────────────────────────────────────────────────────────────────
function PulseDot({ color }: { color: string }) {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.6, duration: 800, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1,   duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View
      style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, transform: [{ scale }] }}
    />
  );
}

// ── Sensor Card ───────────────────────────────────────────────────────────────
type SensorCardProps = {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  min: number;
  max: number;
};

function SensorCard({ label, value, unit, icon, color, bg, min, max }: SensorCardProps) {
  const { theme: C } = useTheme();
  const sc = useMemo(() => makeSensorCardStyles(C), [C]);

  const status   = getCondition(value, min, max);
  const progress = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const sColor   = conditionColor(status, C);

  return (
    <View style={[sc.card]}>
      <View style={[sc.iconWrap, { backgroundColor: bg }]}>
        {icon}
      </View>
      <Text style={sc.label}>{label}</Text>
      <Text style={[sc.value, { color }]}>
        {value.toFixed(1)}
        <Text style={sc.unit}>{unit}</Text>
      </Text>
      <View style={sc.trackBg}>
        <View style={[sc.trackFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
      <View style={sc.statusRow}>
        <PulseDot color={sColor} />
        <Text style={[sc.statusText, { color: sColor }]}>{conditionLabel(status)}</Text>
        <Text style={sc.rangeHint}>{min}–{max}{unit}</Text>
      </View>
    </View>
  );
}

function makeSensorCardStyles(C: Theme) {
  return StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: C.surface,
      borderRadius: 18,
      padding: 16,
      borderTopWidth: 3,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: C.border,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    label: {
      fontSize: 11,
      color: C.textMuted,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 4,
    },
    value: {
      fontSize: 26,
      fontWeight: '800',
      marginBottom: 10,
      color: C.text,
    },
    unit: {
      fontSize: 13,
      fontWeight: '500',
    },
    trackBg: {
      height: 5,
      backgroundColor: C.divider,
      borderRadius: 3,
      marginBottom: 8,
    },
    trackFill: {
      height: 5,
      borderRadius: 3,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statusText: {
      fontSize: 11,
      fontWeight: '700',
      flex: 1,
    },
    rangeHint: {
      fontSize: 10,
      color: C.textFaint,
    },
  });
}

// ── Device Toggle Card ────────────────────────────────────────────────────────
type DeviceCardProps = {
  label: string;
  iconName: string;
  iconLib?: 'ion' | 'mci';
  isOn: boolean;
  color: string;
  bg: string;
  onToggle: () => void;
};

function DeviceCard({ label, iconName, iconLib = 'mci', isOn, color, bg, onToggle }: DeviceCardProps) {
  const { theme: C } = useTheme();
  const dc = useMemo(() => makeDeviceCardStyles(C), [C]);

  const iconColor = isOn ? color : C.textMuted;

  return (
    <View style={dc.card}>
      <View style={[dc.iconWrap, { backgroundColor: isOn ? bg : C.surfaceAlt }]}>
        {iconLib === 'mci'
          ? <MaterialCommunityIcons name={iconName as any} size={28} color={iconColor} />
          : <Ionicons name={iconName as any} size={28} color={iconColor} />}
      </View>
      <Text style={dc.label}>{label}</Text>
      <Text style={[dc.state, { color: isOn ? color : C.textMuted }]}>
        {isOn ? 'RUNNING' : 'OFF'}
      </Text>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.8}
        style={[dc.toggle, { backgroundColor: isOn ? color : C.border }]}
      >
        <View style={[dc.thumb, { alignSelf: isOn ? 'flex-end' : 'flex-start' }]} />
      </TouchableOpacity>
    </View>
  );
}

function makeDeviceCardStyles(C: Theme) {
  return StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: C.surface,
      borderRadius: 18,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: C.border,
    },
    iconWrap: {
      width: 52,
      height: 52,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    label: {
      fontSize: 13,
      fontWeight: '700',
      color: C.text,
      marginBottom: 4,
    },
    state: {
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1,
      marginBottom: 12,
    },
    toggle: {
      width: 52,
      height: 30,
      borderRadius: 15,
      padding: 4,
      justifyContent: 'center',
    },
    thumb: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
  });
}

// ── Condition Bar ─────────────────────────────────────────────────────────────
type ConditionBarProps = {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  color: string;
};

function ConditionBar({ label, value, unit, min, max, color }: ConditionBarProps) {
  const { theme: C } = useTheme();
  const cb = useMemo(() => makeConditionBarStyles(C), [C]);

  const status   = getCondition(value, min, max);
  const sColor   = conditionColor(status, C);
  const progress = Math.min(Math.max((value - min) / (max - min), 0), 1);

  return (
    <View style={cb.wrap}>
      <View style={cb.topRow}>
        <Text style={cb.label}>{label}</Text>
        <View style={cb.rightRow}>
          <Text style={[cb.val, { color }]}>{value.toFixed(1)}{unit}</Text>
          <View style={[cb.badge, { backgroundColor: sColor + '22' }]}>
            <Text style={[cb.badgeText, { color: sColor }]}>{conditionLabel(status)}</Text>
          </View>
        </View>
      </View>
      <View style={cb.track}>
        <View style={[cb.fill, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
      <View style={cb.rangeRow}>
        <Text style={cb.range}>{min}{unit}</Text>
        <Text style={cb.range}>{max}{unit}</Text>
      </View>
    </View>
  );
}

function makeConditionBarStyles(C: Theme) {
  return StyleSheet.create({
    wrap: {},
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    rightRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    label: { fontSize: 13, fontWeight: '600', color: C.text },
    val:   { fontSize: 13, fontWeight: '700', color: C.text },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    badgeText: { fontSize: 11, fontWeight: '700' },
    track: {
      height: 8,
      backgroundColor: C.divider,
      borderRadius: 4,
    },
    fill: {
      height: 8,
      borderRadius: 4,
    },
    rangeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    range: { fontSize: 10, color: C.textFaint },
  });
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const { theme: C } = useTheme();
  const s = useMemo(() => makeStyles(C), [C]);

  const [fan,        setFan]        = useState(true);
  const [humidifier, setHumidifier] = useState(false);

  function toggle(device: 'fan' | 'humidifier') {
    if (device === 'fan') {
      const next = !fan;
      setFan(next);
      Alert.alert(`Fan ${next ? 'Activated' : 'Deactivated'}`, `The fan has been turned ${next ? 'ON' : 'OFF'}.`);
    } else {
      const next = !humidifier;
      setHumidifier(next);
      Alert.alert(`Humidifier ${next ? 'Activated' : 'Deactivated'}`, `The humidifier has been turned ${next ? 'ON' : 'OFF'}.`);
    }
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      {/* Online banner */}
      <View style={[s.banner, { backgroundColor: SENSOR.online ? C.successBg : C.errorBg }]}>
        <View style={s.bannerLeft}>
          <PulseDot color={SENSOR.online ? C.success : C.error} />
          <Text style={[s.bannerStatus, { color: SENSOR.online ? C.success : C.error }]}>
            {SENSOR.online ? 'ESP32 Online' : 'Device Offline'}
          </Text>
        </View>
        <Text style={[s.bannerTime, { color: SENSOR.online ? C.success : C.error }]}>
          Updated {SENSOR.lastUpdated}
        </Text>
      </View>

      {/* Heading */}
      <View style={s.headingRow}>
        <View>
          <Text style={s.headingTitle}>Farm Overview</Text>
          <Text style={s.headingSub}>Monitor your mushroom grow room</Text>
        </View>
        <View style={s.headingIcon}>
          <MaterialCommunityIcons name="mushroom-outline" size={28} color={C.primary} />
        </View>
      </View>

      {/* Live Readings */}
      <Text style={s.section}>Live Readings</Text>
      <View style={s.twoCol}>
        <SensorCard
          label="Temperature"
          value={SENSOR.temperature}
          unit="°C"
          icon={<Ionicons name="thermometer" size={24} color={C.temp} />}
          color={C.temp}
          bg={C.tempBg}
          min={THRESHOLDS.tempMin}
          max={THRESHOLDS.tempMax}
        />
        <SensorCard
          label="Humidity"
          value={SENSOR.humidity}
          unit="%"
          icon={<Ionicons name="water" size={24} color={C.humid} />}
          color={C.humid}
          bg={C.humidBg}
          min={THRESHOLDS.humidMin}
          max={THRESHOLDS.humidMax}
        />
      </View>

      {/* Device Control */}
      <Text style={s.section}>Device Control</Text>
      <View style={s.twoCol}>
        <DeviceCard
          label="Fan"
          iconName="fan"
          iconLib="mci"
          isOn={fan}
          color={C.fan}
          bg={C.fanBg}
          onToggle={() => toggle('fan')}
        />
        <DeviceCard
          label="Humidifier"
          iconName="water-pump"
          iconLib="mci"
          isOn={humidifier}
          color={C.humidifier}
          bg={C.humidifierBg}
          onToggle={() => toggle('humidifier')}
        />
      </View>

      {/* Growing Conditions */}
      <Text style={s.section}>Growing Conditions</Text>
      <View style={s.card}>
        <ConditionBar
          label="Temperature"
          value={SENSOR.temperature}
          unit="°C"
          min={THRESHOLDS.tempMin}
          max={THRESHOLDS.tempMax}
          color={C.temp}
        />
        <View style={s.divider} />
        <ConditionBar
          label="Humidity"
          value={SENSOR.humidity}
          unit="%"
          min={THRESHOLDS.humidMin}
          max={THRESHOLDS.humidMax}
          color={C.humid}
        />
      </View>

      {/* Recent Alerts */}
      <Text style={s.section}>Recent Alerts</Text>
      {ALERTS.map(a => (
        <View key={a.id} style={s.alertRow}>
          <View style={[s.alertIconWrap, { backgroundColor: a.type === 'warning' ? C.warningBg : C.successBg }]}>
            <Ionicons
              name={a.type === 'warning' ? 'warning' : 'checkmark-circle'}
              size={18}
              color={a.type === 'warning' ? C.warning : C.success}
            />
          </View>
          <View style={s.alertBody}>
            <Text style={s.alertMsg}>{a.message}</Text>
            <Text style={s.alertTime}>{a.time}</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 32 }} />
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
    },
    banner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginBottom: 16,
    },
    bannerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    bannerStatus: {
      fontSize: 12,
      fontWeight: '700',
    },
    bannerTime: {
      fontSize: 11,
      fontWeight: '500',
    },
    headingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    headingTitle: {
      fontSize: 19,
      fontWeight: '800',
      color: C.text,
    },
    headingSub: {
      fontSize: 12,
      color: C.textMuted,
      marginTop: 2,
    },
    headingIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: C.primaryBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    section: {
      fontSize: 11,
      fontWeight: '700',
      color: C.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: 10,
      marginTop: 4,
    },
    twoCol: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    card: {
      backgroundColor: C.surface,
      borderRadius: 18,
      padding: 18,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: C.border,
    },
    divider: {
      height: 1,
      backgroundColor: C.divider,
      marginVertical: 14,
    },
    alertRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.surface,
      borderRadius: 14,
      padding: 14,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
      borderWidth: 1,
      borderColor: C.border,
      gap: 12,
    },
    alertIconWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertBody: {
      flex: 1,
    },
    alertMsg: {
      fontSize: 13,
      color: C.text,
      fontWeight: '500',
    },
    alertTime: {
      fontSize: 11,
      color: C.textMuted,
      marginTop: 2,
    },
  });
}
