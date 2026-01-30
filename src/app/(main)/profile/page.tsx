"use client"

import { useState, useEffect } from "react"
import { useUserStore } from "@/store/useUserStore"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Loader2 } from "lucide-react"
import { toast } from "sonner" // Assuming sonner is installed, or we can use a basic alert

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function ProfilePage() {
  const router = useRouter()
  const { name, email, phone, updateProfile, isAuthenticated } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
    },
  })

  // Update form values when store loads (persistence)
  useEffect(() => {
      if (name) form.setValue("name", name)
      if (email) form.setValue("email", email)
  }, [name, email, form])

  if (!isAuthenticated) {
      router.push('/login')
      return null
  }

  function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
        updateProfile(values)
        setIsLoading(false)
        // We really should have a toast here, but simple alert for now if no toaster setup
        // toast.success("Profile updated successfully") 
        alert("Profile updated successfully!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
       <header className="bg-background border-b px-4 h-16 flex items-center gap-4 sticky top-0 z-50">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg">My Profile</h1>
      </header>

      <div className="container max-w-lg mx-auto p-4 space-y-6">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 py-6">
            <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                        {name?.slice(0, 2).toUpperCase() || "UN"}
                    </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-sm">
                    <Camera className="h-4 w-4" />
                </Button>
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold">{name || "Guest User"}</h2>
                <p className="text-sm text-muted-foreground">{phone}</p>
            </div>
        </div>

        {/* Edit Form */}
        <Card className="border-0 shadow-sm">
            <CardHeader>
                <CardTitle className="text-base">Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <div className="space-y-2">
                          <FormLabel className="text-muted-foreground">Phone Number</FormLabel>
                          <Input value={phone || ""} disabled className="bg-muted text-muted-foreground" />
                          <p className="text-[10px] text-muted-foreground">Phone number cannot be changed.</p>
                      </div>

                    <Button type="submit" className="w-full font-bold mt-4" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
