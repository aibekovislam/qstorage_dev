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
    },
    Modal: {
      titleFontSize:  24,
      fontWeightStrong: 400,
    },
  },
  token: {
    fontFamily: 'var(--font-sfpro)',
    colorPrimary: '#FA541C',
    colorLink: '#FA541C',
  },
} as const

export default theme
