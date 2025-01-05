import { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 3,
    },
    Input: {
      borderRadius: 3,
      paddingBlock: 10,
      paddingInline: 15,
      fontFamily: 'var(--font-roboto)',
    },
    DatePicker: {
      borderRadius: 3,
    },
    Select: {
      borderRadius: 3,
    },
  },
  token: {
    fontFamily: 'var(--font-roboto)',
    colorPrimary: '#FA541C',
    colorLink: '#FA541C',
  },
} as const

export default theme
