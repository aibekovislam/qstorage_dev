import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-roboto',
})

export {
  roboto,
}
