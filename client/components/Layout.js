import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
        <main>{children}</main>
      <Footer />
    </>
  )
}
