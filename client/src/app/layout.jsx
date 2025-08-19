// app/layout.tsx or app/layout.js
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <div className="flex h-full">
          <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 overflow-auto bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
