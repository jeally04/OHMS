export type Theme = {
  bg: string;
  surface: string;
  surfaceAlt: string;
  surfaceElevated: string;
  text: string;
  textSub: string;
  textMuted: string;
  textFaint: string;
  border: string;
  divider: string;
  primary: string;
  primaryLight: string;
  primaryBg: string;
  primaryForeground: string;
  temp: string;
  tempBg: string;
  humid: string;
  humidBg: string;
  fan: string;
  fanBg: string;
  humidifier: string;
  humidifierBg: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  error: string;
  errorBg: string;
};

export const lightTheme: Theme = {
  bg:              '#f2f2f7',
  surface:         '#ffffff',
  surfaceAlt:      '#f2f2f7',
  surfaceElevated: '#ffffff',

  text:      '#1c1c1e',
  textSub:   '#3c3c43',
  textMuted: '#8e8e93',
  textFaint: '#aeaeb2',

  border:  '#e5e5ea',
  divider: '#e5e5ea',

  primary:            '#2d6a4f',
  primaryLight:       '#52b788',
  primaryBg:          '#1b4332',
  primaryForeground:  '#ffffff',

  temp:   '#922206',
  tempBg: '#fef3ee',

  humid:   '#042c59',
  humidBg: '#eff6ff',

  fan:   '#8c32ccda',
  fanBg: '#f5f3ff',

  humidifier:   '#0a99b2',
  humidifierBg: '#ecfeff',

  success:   '#0c9f42',
  successBg: '#f0fdf4',
  warning:   '#f59e0b',
  warningBg: '#fffbeb',
  error:     '#7b0a0a',
  errorBg:   '#fef2f2',
};

export const darkTheme: Theme = {
  bg:              '#000000',
  surface:         '#1c1c1e',
  surfaceAlt:      '#2c2c2e',
  surfaceElevated: '#3a3a3c',

  text:      '#f5f5f7',
  textSub:   '#ebebf5',
  textMuted: '#8e8e93',
  textFaint: '#636366',

  border:  '#38383a',
  divider: '#38383a',

  primary:            '#52b788',
  primaryLight:       '#74c69d',
  primaryBg:          '#0d2d1a',
  primaryForeground:  '#ffffff',

  temp:   '#ff6b47',
  tempBg: '#2a1a10',

  humid:   '#5ba4ff',
  humidBg: '#0d1f35',

  fan:   '#a78bfa',
  fanBg: '#1e1535',

  humidifier:   '#22d3ee',
  humidifierBg: '#0a2530',

  success:   '#30d158',
  successBg: '#0d2d1a',
  warning:   '#ffd60a',
  warningBg: '#2d2000',
  error:     '#ff453a',
  errorBg:   '#2d1010',
};
