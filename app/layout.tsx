import { roboto } from '@/shared/assets/fonts/fonts'
import AntdProvider from '@/shared/providers/Antd'
import '@/shared/assets/styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  )
}
