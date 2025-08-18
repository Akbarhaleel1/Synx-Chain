'use client'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { ThemeProvider } from '../lib/theme'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}