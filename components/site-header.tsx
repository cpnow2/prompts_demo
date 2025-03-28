"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, Menu, Search, User, UserCog, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

export function SiteHeader() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const isAdminPage = pathname?.startsWith("/admin")

  const handleSignOut = () => {
    signOut()
    if (isAdminPage) {
      router.push("/")
    }
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold">
              Prompt Library
            </Link>
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-medium text-black"
              >
                Browse
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-gray-500 hover:text-black"
              >
                Categories
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search prompts..." 
                className="w-full pl-9 h-9 bg-white border border-gray-200 rounded-lg" 
              />
            </div>
            <Button variant="ghost" className="text-gray-500 hover:text-black" asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button className="bg-black text-white hover:bg-black/90" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

