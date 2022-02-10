import Sidebar from './sidebar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
        <main>{children}</main>
      <Footer />
    </>
  )
}
