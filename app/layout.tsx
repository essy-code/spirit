import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* HEADER */}
        <header className="header">
          <div className="container flex justify-between items-center py-4">
            <h1 className="logo">Spirit Surge</h1>

            <nav className="nav text-sm">
              <Link href="/">Home</Link>
              <Link href="/news">News</Link>
              <Link href="/events">Events</Link>
              <Link href="/testimonies">Testimonies</Link>
              <Link href="/meeting">Meeting</Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="container py-6">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="footer mt-10">
          <div className="container py-4 text-center text-sm">
            © 2026 Spirit Surge Network.
          </div>
        </footer>

      </body>
    </html>
  );
}