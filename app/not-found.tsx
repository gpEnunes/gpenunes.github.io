import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-32">
      <h1 className="font-serif text-4xl text-white">Page not found</h1>
      <p className="mt-4 text-white/60">
        <Link href="/" className="underline">
          Emerson Nunes
        </Link>
      </p>
    </main>
  )
}
