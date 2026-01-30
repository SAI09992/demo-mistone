import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar" // Fixed import
import { Button } from '../ui/button'
import { useUserStore } from '@/store/useUserStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Laptop } from 'lucide-react'

function ProfileDrawer() {
  const { name, email, logout } = useUserStore()
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  const handleLogout = () => {
      logout()
      router.push('/login')
  }

  return (
     <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback>{name?.slice(0, 2).toUpperCase() || "UN"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name || "Guest User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {email || "No email set"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                </Link>
                <Link href="/orders">
                    <DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Wallet</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  Theme
                </DropdownMenuLabel>
                <DropdownMenuItem 
                  className={`cursor-pointer flex items-center justify-between ${theme === 'light' ? 'bg-accent' : ''}`}
                  onClick={() => setTheme("light")}
                >
                  <div className="flex items-center">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer flex items-center justify-between ${theme === 'dark' ? 'bg-accent' : ''}`}
                  onClick={() => setTheme("dark")}
                >
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer flex items-center justify-between ${theme === 'system' ? 'bg-accent' : ''}`}
                  onClick={() => setTheme("system")}
                >
                  <div className="flex items-center">
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  )
}

export default ProfileDrawer