import localFont from "next/font/local";
import "./globals.css";

export const inriaSansRegular = localFont({
  src: "./fonts/InriaSans-Regular.ttf",
  variable: "--font-inriaSans-regular"
})

export const inriaSansBold = localFont({
  src: "./fonts/InriaSans-Bold.ttf",
  variable: "--font-inriaSans-bold"
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inriaSansRegular.className}`}
      >
        {children}
      </body>
    </html>
  );
}
