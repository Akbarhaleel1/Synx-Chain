// utils/themeUtils.js
export const getBaseClasses = (darkMode) => {
  return darkMode ? {
    bg: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    headerBg: 'bg-gray-800',
    sidebarBg: 'bg-gray-800',
    text: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-gray-700',
    borderLight: 'border-gray-600',
    hover: 'hover:bg-gray-700',
    hoverLight: 'hover:bg-gray-600',
    input: 'bg-gray-700 border-gray-600 text-gray-100',
    shadow: 'shadow-lg'
  } : {
    bg: 'bg-gray-50',
    cardBg: 'bg-white',
    headerBg: 'bg-white',
    sidebarBg: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-500',
    textMuted: 'text-gray-400',
    border: 'border-gray-200',
    borderLight: 'border-gray-100',
    hover: 'hover:bg-gray-50',
    hoverLight: 'hover:bg-gray-100',
    input: 'bg-white border-gray-300 text-gray-900',
    shadow: 'shadow-sm'
  };
};