import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "FamilyFlow",
   description: "Manage your family. Simplify your life.",
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
