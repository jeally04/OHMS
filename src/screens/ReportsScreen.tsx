import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const REPORTS = [
  { id: '1', title: 'Monthly Summary', date: 'Jun 2026', status: 'Ready' },
  { id: '2', title: 'User Activity', date: 'Jun 2026', status: 'Ready' },
  { id: '3', title: 'System Audit', date: 'May 2026', status: 'Pending' },
  { id: '4', title: 'Error Logs', date: 'May 2026', status: 'Ready' },
  { id: '5', title: 'Performance Report', date: 'Apr 2026', status: 'Pending' },
];

const STATUS_COLORS: Record<string, string> = {
  Ready: '#10b981',
  Pending: '#f59e0b',
};

export default function ReportsScreen() {
  const [filter, setFilter] = useState<'All' | 'Ready' | 'Pending'>('All');

  const filtered = filter === 'All' ? REPORTS : REPORTS.filter(r => r.status === filter);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.filters}>
        {(['All', 'Ready', 'Pending'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.map(report => (
        <View key={report.id} style={styles.row}>
          <View style={styles.rowInfo}>
            <Text style={styles.rowTitle}>{report.title}</Text>
            <Text style={styles.rowDate}>{report.date}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: STATUS_COLORS[report.status] + '20' }]}>
            <Text style={[styles.badgeText, { color: STATUS_COLORS[report.status] }]}>
              {report.status}
            </Text>
          </View>
        </View>
      ))}
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
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  filterBtnActive: {
    backgroundColor: '#1e40af',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  row: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  rowInfo: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  rowDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
