"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, User } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/useUserStore"

function NameForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const phone = searchParams.get("phone")
    const setName = useUserStore((state) => state.setName)
    const [isLoading, setIsLoading] = useState(false)
    const [fullName, setFullName] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!fullName.trim()) return

        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setName(fullName.trim())
        router.push("/food")

        setIsLoading(false)
    }

    return (
        <div className="relative">
            <div className="absolute -inset-1 bg-[#D9027D]/20 rounded-3xl blur-xl opacity-50" />
            <div className="relative bg-[#1a1a1a]/80 backdrop-blur-2xl border border-[#D9027D]/15 rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#D9027D]/5">
                <div className="flex flex-col items-center mb-8 pt-4">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 scale-150 bg-[#D9027D]/20 blur-2xl rounded-full" />
                        <Image
                            src="/favicon.png"
                            alt="Mistnove"
                            width={56}
                            height={56}
                            className="relative w-12 h-12 md:w-14 md:h-14"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                        Almost there!
                    </h1>
                    <p className="mt-2 text-white/50 text-sm md:text-base text-center">
                        Enter your full name to continue
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white/60 text-sm mb-2">
                            Enter your full name
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none z-10" />
                            <motion.div
                                className="absolute -inset-0.5 rounded-xl bg-[#D9027D]/40 blur-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isFocused ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <input
                                placeholder="Enter your name"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className={`
                  relative w-full h-14 pl-12 pr-4 
                  bg-[#1f1f1f] text-white text-base
                  rounded-xl border-2 
                  ${isFocused ? 'border-[#D9027D]' : 'border-white/10'}
                  focus:outline-none focus:border-[#D9027D]
                  transition-all duration-300 ease-out
                  placeholder:text-white/30
                `}
                            />
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            type="submit"
                            disabled={isLoading || !fullName.trim()}
                            className="
                w-full h-14 
                bg-[#D9027D] hover:bg-[#D9027D]/90 
                text-white font-semibold text-base
                rounded-xl border-0
                shadow-lg shadow-[#D9027D]/30
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                "Continue"
                            )}
                        </Button>
                    </motion.div>
                </form>
            </div>
        </div>
    )
}

export default function NamePage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Suspense fallback={<div className="text-center text-white/50">Loading...</div>}>
                <NameForm />
            </Suspense>
        </motion.div>
    )
}
