"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, ArrowLeft, Pencil } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useUserStore } from "@/store/useUserStore"

const formSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits"),
})

function VerifyForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const phone = searchParams.get("phone")
    const login = useUserStore((state) => state.login)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (phone) {
            login(phone)
            router.push(`/name?phone=${phone}`)
        } else {
            router.push("/login")
        }

        setIsLoading(false)
    }

    return (
        <div className="relative">
            <div className="absolute -inset-1 bg-[#D9027D]/20 rounded-3xl blur-xl opacity-50" />
            <div className="relative bg-[#1a1a1a]/80 backdrop-blur-2xl border border-[#D9027D]/15 rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#D9027D]/5">
                <button
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 text-white/60" />
                </button>
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
                        Verify OTP
                    </h1>
                    <p className="mt-2 text-white/50 text-sm md:text-base text-center">
                        Enter the 6-digit code sent to<br />
                        <span className="inline-flex items-center gap-2">
                            <span className="text-white/70 font-medium">{phone}</span>
                            <button
                                onClick={() => router.push("/login")}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                title="Change number"
                            >
                                <Pencil className="h-3.5 w-3.5 text-[#D9027D]" />
                            </button>
                        </span>
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className="gap-3">
                                                <InputOTPSlot index={0} className="w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl text-white bg-[#1f1f1f] border-2 border-white/10 rounded-xl focus:border-[#D9027D] focus:ring-2 focus:ring-[#D9027D]/30 transition-all text-center" />
                                                <InputOTPSlot index={1} className="w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl text-white bg-[#1f1f1f] border-2 border-white/10 rounded-xl focus:border-[#D9027D] focus:ring-2 focus:ring-[#D9027D]/30 transition-all text-center" />
                                                <InputOTPSlot index={2} className="w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl text-white bg-[#1f1f1f] border-2 border-white/10 rounded-xl focus:border-[#D9027D] focus:ring-2 focus:ring-[#D9027D]/30 transition-all text-center" />
                                                <InputOTPSlot index={3} className="w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl text-white bg-[#1f1f1f] border-2 border-white/10 rounded-xl focus:border-[#D9027D] focus:ring-2 focus:ring-[#D9027D]/30 transition-all text-center" />
                                                <InputOTPSlot index={4} className="w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl text-white bg-[#1f1f1f] border-2 border-white/10 rounded-xl focus:border-[#D9027D] focus:ring-2 focus:ring-[#D9027D]/30 transition-all text-center" />
                                                <InputOTPSlot index={5} className="w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl text-white bg-[#1f1f1f] border-2 border-white/10 rounded-xl focus:border-[#D9027D] focus:ring-2 focus:ring-[#D9027D]/30 transition-all text-center" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage className="mt-3 text-[#D9027D]" />
                                </FormItem>
                            )}
                        />
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                type="submit"
                                disabled={isLoading}
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
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify & Login"
                                )}
                            </Button>
                        </motion.div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default function VerifyPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Suspense fallback={<div className="text-center text-white/50">Loading...</div>}>
                <VerifyForm />
            </Suspense>
        </motion.div>
    )
}
