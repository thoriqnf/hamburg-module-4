import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/home">Home</Link>
          <Link href="/home">About</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
