import { type FC, type PropsWithChildren } from 'react'

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container flex flex-col h-screen">
      <main>{children}</main>
    </div>
  )
}

export default DefaultLayout
