import { useShop } from '@/context/ShopContext';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName:
    | 'text'
    | 'background'
    | 'tint'
    | 'icon'
    | 'tabIconDefault'
    | 'tabIconSelected'
) {
  const { isDark } = useShop();

  const custom = isDark ? props.dark : props.light;

  if (custom) {
    return custom;
  }

  const theme = isDark
    ? {
        text: '#F8F7FC',
        background: '#09070F',
        tint: '#A78BFA',
        icon: '#C4BFCE',
        tabIconDefault: '#918A9F',
        tabIconSelected: '#A78BFA',
      }
    : {
        text: '#171322',
        background: '#F7F5FC',
        tint: '#7C3AED',
        icon: '#5D586A',
        tabIconDefault: '#858091',
        tabIconSelected: '#7C3AED',
      };

  return theme[colorName];
}
