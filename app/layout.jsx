import "../styles/globals.css"

export const metadata = {
  title: "Gaming Clips AI model",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className = "bg-black"
      >
        {children}
      </body>
    </html>
  );
}
