import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex gap-2">
        <Link href="/recipes/popular">Popular</Link>
        <Link href="/recipes/mine">Mine</Link>
        <Link href="/recipes/create">Create</Link>
      </div>
      {children}
    </div>
  );
}
