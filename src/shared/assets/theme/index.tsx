import { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 3,
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
    },
  },
  token: {
    fontFamily: 'var(--font-sfpro)',
    colorPrimary: '#0d1924',
    colorLink: '#FA541C',
  },
} as const

export default theme
