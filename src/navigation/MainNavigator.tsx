import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import DashboardScreen from '../screens/DashboardScreen';
import ReportsScreen   from '../screens/ReportsScreen';
import SettingsScreen  from '../screens/SettingsScreen';
import { C } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  Dashboard: { active: '🌿', inactive: '🌱' },
  Reports:   { active: '📊', inactive: '📉' },
  Settings:  { active: '⚙️', inactive: '🔧' },
};

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons = TAB_ICONS[name] ?? { active: '●', inactive: '○' };
  return (
    <View style={[s.iconWrap, focused && s.iconWrapActive]}>
      <Text style={[s.icon, { opacity: focused ? 1 : 0.55 }]}>
        {focused ? icons.active : icons.inactive}
      </Text>
    </View>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarActiveTintColor:   C.green800,
        tabBarInactiveTintColor: C.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginBottom: 2,
        },
        tabBarStyle: {
          backgroundColor:  C.surface,
          borderTopColor:   C.border,
          borderTopWidth:   1,
          paddingTop:       6,
          height:           64,
        },
        headerStyle: {
          backgroundColor: C.green900,
          shadowColor:     'transparent',
          elevation:       0,
        },
        headerTintColor:      '#ffffff',
        headerTitleStyle: {
          fontWeight:    '700',
          fontSize:      17,
          letterSpacing: 0.3,
        },
        headerRight: () => (
          <Text style={s.headerMush}>🍄</Text>
        ),
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Farm Dashboard' }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{ title: 'Data Reports' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  iconWrapActive: {
    backgroundColor: C.green100,
  },
  icon: {
    fontSize: 20,
  },
  headerMush: {
    fontSize: 22,
    marginRight: 16,
  },
});
