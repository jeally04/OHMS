import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MainTabParamList } from './types';
import DashboardScreen from '../screens/DashboardScreen';
import ReportsScreen   from '../screens/ReportsScreen';
import SettingsScreen  from '../screens/SettingsScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabName = 'Dashboard' | 'Reports' | 'Settings';

function TabIcon({ name, focused }: { name: TabName; focused: boolean }) {
  const { theme: C } = useTheme();
  const color = focused ? C.primary : C.textMuted;

  const icons: Record<TabName, { active: React.ComponentProps<typeof Ionicons>['name']; inactive: React.ComponentProps<typeof Ionicons>['name'] }> = {
    Dashboard: { active: 'home',       inactive: 'home-outline'      },
    Reports:   { active: 'bar-chart',  inactive: 'bar-chart-outline' },
    Settings:  { active: 'settings',   inactive: 'settings-outline'  },
  };

  const iconName = focused ? icons[name].active : icons[name].inactive;

  return (
    <View style={{
      width: 36, height: 28, alignItems: 'center', justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: focused ? C.primary + '18' : 'transparent',
    }}>
      <Ionicons name={iconName} size={20} color={color} />
    </View>
  );
}

export default function MainNavigator() {
  const { theme: C, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name as TabName} focused={focused} />
        ),
        tabBarActiveTintColor:   C.primary,
        tabBarInactiveTintColor: C.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginBottom: 2,
        },
        tabBarStyle: {
          backgroundColor: C.surface,
          borderTopColor:  C.border,
          borderTopWidth:  1,
          paddingTop:      6,
          height:          64,
        },
        headerStyle: {
          backgroundColor: isDark ? '#0d2d1a' : '#1b4332',
          shadowColor:     'transparent',
          elevation:       0,
        },
        headerTintColor:   '#ffffff',
        headerTitleStyle: {
          fontWeight:    '700',
          fontSize:      17,
          letterSpacing: 0.3,
        },
        headerRight: () => (
          <MaterialCommunityIcons
            name="mushroom-outline"
            size={22}
            color="rgba(255,255,255,0.8)"
            style={{ marginRight: 16 }}
          />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Farm Dashboard' }} />
      <Tab.Screen name="Reports"   component={ReportsScreen}   options={{ title: 'Data Reports'   }} />
      <Tab.Screen name="Settings"  component={SettingsScreen}  options={{ title: 'Settings'        }} />
    </Tab.Navigator>
  );
}
