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
          <Link href="/home">Post</Link>
          <Link href="/home">tes post</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
