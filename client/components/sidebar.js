import Link from 'next/link'

export default function Sidebar() {
  return (
    <section>
      <nav>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </nav>
    </section>
  )
}
