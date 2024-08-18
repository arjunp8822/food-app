import RecipeLinks from "../components/RecipeLinks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row">
      <RecipeLinks />
      <div className="w-full">{children}</div>
    </div>
  );
}
