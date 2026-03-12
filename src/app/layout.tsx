export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // this layout is used to wrap all pages, you can add any common components here, such as a header or footer
  return children;
}
