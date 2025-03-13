import { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 3,
      defaultBg: '#f0f0f0',
      colorPrimary: '#001529',
      primaryShadow: 'none',
    },
    Input: {
      borderRadius: 3,
      paddingBlock: 10,
      paddingInline: 8,
      fontFamily: 'var(--font-sfpro)',
    },
    DatePicker: {
      borderRadius: 3,
      paddingBlock: 10,
      paddingInline: 8,
    },
    Select: {
      borderRadius: 3,
      optionSelectedBg: '#d3d5d6',
    },
    Modal: {
      titleFontSize:  24,
      fontWeightStrong: 400,
    },
    Table: {
      rowSelectedBg: '#d3d5d6',
      rowHoverBg: '#d3d5d6',
      rowSelectedHoverBg: '#d3d5d6',
      colorText: '#001529',
    },
  },
  token: {
    fontFamily: 'var(--font-sfpro)',
    colorPrimary: '#444856',
    colorLink: '#1b1d21',
  },
} as const

export default theme
