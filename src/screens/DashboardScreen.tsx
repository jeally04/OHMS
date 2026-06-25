import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

type StatCardProps = { label: string; value: string; color: string };

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcome}>Welcome back, Admin</Text>

      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.grid}>
        <StatCard label="Total Users" value="1,284" color="#1e40af" />
        <StatCard label="Active Sessions" value="42" color="#10b981" />
        <StatCard label="Pending Tasks" value="7" color="#f59e0b" />
        <StatCard label="Alerts" value="3" color="#ef4444" />
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {['User login at 10:32 AM', 'Report generated at 9:15 AM', 'Settings updated at 8:00 AM'].map(
        (item, i) => (
          <View key={i} style={styles.activityItem}>
            <View style={styles.dot} />
            <Text style={styles.activityText}>{item}</Text>
          </View>
        )
      )}
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
  },
  welcome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e40af',
    marginRight: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
  },
});
