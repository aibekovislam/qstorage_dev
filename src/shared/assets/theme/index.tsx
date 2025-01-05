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
      fontFamily: 'var(--font-sfpro)',
    },
  },
  token: {
    fontFamily: 'var(--font-sfpro)',
    colorPrimary: '#FA541C',
    colorLink: '#FA541C',
  },
} as const

export default theme
