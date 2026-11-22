export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-white/50">© {year} Emerson Nunes</p>
        <div className="flex gap-5 text-sm text-white/50">
          <a href="https://github.com/gpEnunes" className="hover:text-white" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/emerson-nunes5" className="hover:text-white" rel="noreferrer noopener">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
