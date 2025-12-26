'use client'
import { Link, usePathname } from '@/i18n/navigation'
import { BarChart3, Home, User, Users } from 'lucide-react'
import { Button } from './ui/button'
import clsx from 'clsx'

const Navigations = () => {

  const pathname = usePathname()

  const linkClass = (href: string) =>
    clsx(
      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
      pathname === href
        ? 'bg-muted text-primary'
        : 'text-foreground hover:bg-muted'
    )

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-foreground">MyFocus</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={linkClass('/')}
            // className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link
              href="/leaderboard"
              className={linkClass('/leaderboard')}
            // className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Leaderboard</span>
            </Link>
            <Link
              href="/groups"
              className={linkClass('/groups')}
            // className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <Users className="w-4 h-4" />
              <span className="text-sm">Groups</span>
            </Link>
            <Link
              href="/profile"
              className={linkClass('/profile')}
            // className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigations