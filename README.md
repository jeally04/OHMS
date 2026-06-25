c:\OHMS\
├── App.tsx                          ← root: wraps NavigationContainer + AuthProvider
├── app.json                         ← Expo config (name, splash, icons)
├── package.json
├── tsconfig.json
├── babel.config.js
└── src/
    ├── context/
    │   └── AuthContext.tsx          ← login/logout state + AsyncStorage token
    ├── navigation/
    │   ├── types.ts                 ← all typed param lists
    │   ├── AppNavigator.tsx         ← root stack: Splash → Auth or Main
    │   ├── AuthNavigator.tsx        ← stack: Login
    │   └── MainNavigator.tsx        ← bottom tabs: Dashboard / Reports / Settings
    └── screens/
        ├── SplashScreen.tsx         ← checks token, redirects after 2s
        ├── LoginScreen.tsx          ← email + password form
        ├── DashboardScreen.tsx      ← stat cards + activity feed
        ├── ReportsScreen.tsx        ← filterable report list
        └── SettingsScreen.tsx       ← profile + grouped settings + logout
