import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Reports: undefined;
  Settings: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type DashboardScreenProps = BottomTabScreenProps<MainTabParamList, 'Dashboard'>;
export type ReportsScreenProps = BottomTabScreenProps<MainTabParamList, 'Reports'>;
export type SettingsScreenProps = BottomTabScreenProps<MainTabParamList, 'Settings'>;
