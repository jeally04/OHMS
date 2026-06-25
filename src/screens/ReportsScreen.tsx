import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { C } from '../theme/colors';

// ── Types ─────────────────────────────────────────────────────────────────────
type Range = 'Day' | 'Week' | 'Month' | 'Year';

// ── Mock sensor data per range ─────────────────────────────────────────────────
const TEMP_DATA: Record<Range, number[]> = {
  Day: [20, 21, 21, 20, 19, 20, 22, 23, 24, 24, 23, 22,
        22, 21, 21, 22, 23, 23, 22, 22, 21, 21, 20, 20],
  Week: [21.2, 22.4, 22.1, 23.0, 21.8, 22.5, 22.4],
  Month: [21, 22, 21, 23, 22, 21, 20, 22, 23, 24, 22, 21,
          21, 22, 23, 22, 21, 22, 23, 22, 21, 21, 22, 23,
          22, 21, 20, 21, 22, 22],
  Year: [20.1, 21.3, 22.4, 22.8, 23.1, 22.4, 21.8, 22.3, 22.6, 21.9, 20.8, 20.2],
};

const HUMID_DATA: Record<Range, number[]> = {
  Day: [86, 87, 87, 86, 85, 86, 88, 90, 91, 92, 91, 89,
        88, 87, 87, 88, 90, 91, 91, 90, 89, 88, 87, 86],
  Week: [87.2, 88.4, 87.8, 89.2, 88.5, 87.9, 87.3],
  Month: [86, 87, 88, 89, 88, 87, 85, 87, 90, 92, 89, 87,
          86, 88, 90, 89, 87, 88, 90, 89, 87, 86, 88, 90,
          88, 86, 85, 87, 88, 88],
  Year: [85.2, 86.8, 88.2, 89.5, 90.1, 88.7, 87.4, 88.1, 89.3, 88.0, 86.5, 85.8],
};

const X_LABELS: Record<Range, string[]> = {
  Day:   ['12a','2','4','6','8','10','12p','2','4','6','8','10',
          '','','','','','','','','','','',''],
  Week:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  Month: Array.from({ length: 30 }, (_, i) => (i % 6 === 0 ? String(i + 1) : '')),
  Year:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
};

const DATE_LABELS: Record<Range, string> = {
  Day:   'Jun 25, 2026',
  Week:  'Jun 19 – Jun 25, 2026',
  Month: 'June 2026',
  Year:  '2026',
};

// ── Bar Chart component ────────────────────────────────────────────────────────
function BarChart({
  data,
  labels,
  color,
}: {
  data: number[];
  labels: string[];
  color: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const H = 90;

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: H, gap: 2 }}>
        {data.map((v, i) => {
          const barH = ((v - min) / span) * (H * 0.78) + H * 0.12;
          const alpha = 0.45 + (i / (data.length - 1)) * 0.55;
          return (
            <View
              key={i}
              style={{
                flex: 1,
                height: barH,
                backgroundColor: color,
                borderRadius: 4,
                opacity: alpha,
              }}
            />
          );
        })}
      </View>
      {/* X-axis labels */}
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {labels.map((l, i) => (
          <Text
            key={i}
            style={{ flex: 1, textAlign: 'center', fontSize: 9, color: C.textMuted }}
            numberOfLines={1}
          >
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
      <Text style={{ fontSize: 15, fontWeight: '800', color }}>{value}</Text>
      <Text style={{ fontSize: 10, color: C.textMuted, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </Text>
    </View>
  );
}

// ── Chart card ────────────────────────────────────────────────────────────────
function ChartCard({
  title,
  icon,
  data,
  labels,
  color,
  unit,
}: {
  title: string;
  icon: string;
  data: number[];
  labels: string[];
  color: string;
  unit: string;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const avg = data.reduce((a, b) => a + b, 0) / data.length;

  return (
    <View style={cc.card}>
      <View style={cc.header}>
        <Text style={cc.icon}>{icon}</Text>
        <Text style={cc.title}>{title}</Text>
        <View style={[cc.unitBadge, { backgroundColor: color + '18' }]}>
          <Text style={[cc.unitText, { color }]}>{unit}</Text>
        </View>
      </View>

      <BarChart data={data} labels={labels} color={color} />

      <View style={cc.statsRow}>
        <StatPill label="MIN"  value={`${min.toFixed(1)}${unit}`}  color={color} />
        <View style={cc.statDiv} />
        <StatPill label="AVG"  value={`${avg.toFixed(1)}${unit}`}  color={color} />
        <View style={cc.statDiv} />
        <StatPill label="MAX"  value={`${max.toFixed(1)}${unit}`}  color={color} />
      </View>
    </View>
  );
}

const cc = StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },
  icon: { fontSize: 20 },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
    flex: 1,
  },
  unitBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  unitText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.divider,
    paddingTop: 4,
  },
  statDiv: {
    width: 1,
    backgroundColor: C.divider,
    marginVertical: 6,
  },
});

// ── Download helpers ───────────────────────────────────────────────────────────
async function downloadReport(
  format: 'PDF' | 'CSV' | 'Excel',
  range: Range,
  tempData: number[],
  humidData: number[]
) {
  if (format === 'CSV') {
    // Build CSV string
    const rows = tempData.map((t, i) =>
      `${i + 1},${t.toFixed(1)},${humidData[i]?.toFixed(1) ?? ''}`
    );
    const csv = `Index,Temperature (°C),Humidity (%)\n${rows.join('\n')}`;

    try {
      // Dynamic import so the app still runs if packages aren't installed
      const FS      = await import('expo-file-system');
      const Sharing = await import('expo-sharing');
      const path    = (FS.documentDirectory ?? '') + `ohms_report_${range.toLowerCase()}.csv`;
      await FS.default.writeAsStringAsync(path, csv, { encoding: FS.EncodingType.UTF8 });
      await Sharing.default.shareAsync(path, { mimeType: 'text/csv', dialogTitle: 'Save Report CSV' });
    } catch {
      Alert.alert('CSV Export', `Preview (first 5 rows):\n\n${csv.split('\n').slice(0, 6).join('\n')}\n\n(Run npm install then restart to enable file export)`);
    }
    return;
  }

  if (format === 'PDF') {
    try {
      const Print   = await import('expo-print');
      const Sharing = await import('expo-sharing');

      const rows = tempData.map((t, i) =>
        `<tr><td>${i + 1}</td><td>${t.toFixed(1)} °C</td><td>${humidData[i]?.toFixed(1) ?? '—'} %</td></tr>`
      ).join('');

      const html = `
        <!DOCTYPE html><html><head>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #1c1c1e; }
          h1 { color: #2d6a4f; }
          h2 { color: #4b5563; font-size: 14px; margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th { background: #2d6a4f; color: white; padding: 8px 12px; text-align: left; }
          td { padding: 8px 12px; border-bottom: 1px solid #e8e0d5; }
          tr:nth-child(even) td { background: #f9f6f2; }
          .meta { color: #9ca3af; font-size: 12px; margin-bottom: 24px; }
        </style>
        </head><body>
        <h1>🍄 OHMS — Farm Report</h1>
        <p class="meta">Range: ${range}  •  Period: ${DATE_LABELS[range]}  •  Generated: ${new Date().toLocaleString()}</p>
        <table>
          <thead><tr><th>#</th><th>Temperature (°C)</th><th>Humidity (%)</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        </body></html>`;

      const { uri } = await Print.default.printToFileAsync({ html });
      await Sharing.default.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Save Report PDF' });
    } catch {
      Alert.alert('PDF Export', `PDF generation requires expo-print & expo-sharing.\n\nRun:\n  npx expo install expo-print expo-sharing\n\nthen restart the app.`);
    }
    return;
  }

  // Excel — generate TSV (opens in Excel)
  try {
    const FS      = await import('expo-file-system');
    const Sharing = await import('expo-sharing');
    const rows = tempData.map((t, i) =>
      `${i + 1}\t${t.toFixed(1)}\t${humidData[i]?.toFixed(1) ?? ''}`
    );
    const tsv  = `Index\tTemperature (°C)\tHumidity (%)\n${rows.join('\n')}`;
    const path = (FS.documentDirectory ?? '') + `ohms_report_${range.toLowerCase()}.xls`;
    await FS.default.writeAsStringAsync(path, tsv, { encoding: FS.EncodingType.UTF8 });
    await Sharing.default.shareAsync(path, { mimeType: 'application/vnd.ms-excel', dialogTitle: 'Save Report Excel' });
  } catch {
    Alert.alert('Excel Export', `Excel export requires expo-file-system & expo-sharing.\n\nRun:\n  npx expo install expo-file-system expo-sharing\n\nthen restart the app.`);
  }
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function ReportsScreen() {
  const [range, setRange] = useState<Range>('Week');

  const tempData  = TEMP_DATA[range];
  const humidData = HUMID_DATA[range];
  const labels    = X_LABELS[range];

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Range tabs */}
      <View style={s.rangePill}>
        {(['Day', 'Week', 'Month', 'Year'] as Range[]).map(r => (
          <TouchableOpacity
            key={r}
            style={[s.rangeBtn, range === r && s.rangeBtnOn]}
            onPress={() => setRange(r)}
            activeOpacity={0.75}
          >
            <Text style={[s.rangeTxt, range === r && s.rangeTxtOn]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date row */}
      <View style={s.dateRow}>
        <Text style={s.dateLabel}>📅  {DATE_LABELS[range]}</Text>
        <View style={s.liveChip}>
          <View style={s.liveDot} />
          <Text style={s.liveText}>Live Data</Text>
        </View>
      </View>

      {/* Charts */}
      <ChartCard
        title="Temperature"
        icon="🌡️"
        data={tempData}
        labels={labels}
        color={C.temp}
        unit="°C"
      />
      <ChartCard
        title="Humidity"
        icon="💧"
        data={humidData}
        labels={labels}
        color={C.humid}
        unit="%"
      />

      {/* Download */}
      <View style={s.dlCard}>
        <Text style={s.dlTitle}>Download Report</Text>
        <Text style={s.dlSub}>Export {range.toLowerCase()} data · {DATE_LABELS[range]}</Text>

        <View style={s.dlRow}>
          <TouchableOpacity
            style={[s.dlBtn, { backgroundColor: C.errorBg, borderColor: C.error }]}
            onPress={() => downloadReport('PDF', range, tempData, humidData)}
            activeOpacity={0.8}
          >
            <Text style={s.dlBtnIcon}>📄</Text>
            <Text style={[s.dlBtnLabel, { color: C.error }]}>PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.dlBtn, { backgroundColor: C.successBg, borderColor: C.success }]}
            onPress={() => downloadReport('CSV', range, tempData, humidData)}
            activeOpacity={0.8}
          >
            <Text style={s.dlBtnIcon}>📊</Text>
            <Text style={[s.dlBtnLabel, { color: C.success }]}>CSV</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.dlBtn, { backgroundColor: C.humidBg, borderColor: C.humid }]}
            onPress={() => downloadReport('Excel', range, tempData, humidData)}
            activeOpacity={0.8}
          >
            <Text style={s.dlBtnIcon}>📈</Text>
            <Text style={[s.dlBtnLabel, { color: C.humid }]}>Excel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 32 }} />
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
  },
  rangePill: {
    flexDirection: 'row',
    backgroundColor: C.creamMid,
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
  },
  rangeBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  rangeBtnOn: {
    backgroundColor: C.green800,
    shadowColor: C.green800,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  rangeTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textMuted,
  },
  rangeTxtOn: {
    color: '#ffffff',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 13,
    color: C.textSub,
    fontWeight: '500',
  },
  liveChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.green100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.success,
  },
  liveText: {
    fontSize: 11,
    color: C.green900,
    fontWeight: '700',
  },
  dlCard: {
    backgroundColor: C.surface,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  dlTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
    marginBottom: 4,
  },
  dlSub: {
    fontSize: 12,
    color: C.textMuted,
    marginBottom: 16,
  },
  dlRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dlBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  dlBtnIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  dlBtnLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
