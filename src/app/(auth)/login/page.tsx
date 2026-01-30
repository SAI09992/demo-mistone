"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Phone } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { AnimatedLogo } from "@/components/ui/animated-logo"

const formSchema = z.object({
    phone: z.string().min(10, "Mobile number must be at least 10 digits").max(10, "Mobile number must be 10 digits").regex(/^\d+$/, "Must be only digits"),
})

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [showForm, setShowForm] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
        router.push(`/verify?phone=${values.phone}`)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="relative">
                <div className="absolute -inset-1 bg-[#D9027D]/20 rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-[#1a1a1a]/80 backdrop-blur-2xl border border-[#D9027D]/15 rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#D9027D]/5">
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-6">
                            <AnimatedLogo onAnimationComplete={() => setShowForm(true)} />
                        </div>
                        <motion.p
                            className="text-white/50 text-sm md:text-base"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showForm ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Login or Sign up to continue
                        </motion.p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none z-10" />
                                                <span className="absolute left-11 top-1/2 -translate-y-1/2 text-white/60 text-base pointer-events-none z-10">+91</span>
                                                <motion.div
                                                    className="absolute -inset-0.5 rounded-xl bg-[#D9027D]/40 blur-md"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: isFocused ? 1 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                                <input
                                                    placeholder="Enter mobile number"
                                                    type="tel"
                                                    className={`
                            relative w-full h-14 pl-20 pr-4 
                            bg-[#1f1f1f] text-white text-base
                            rounded-xl border-2 
                            ${isFocused ? 'border-[#D9027D]' : 'border-white/10'}
                            focus:outline-none focus:border-[#D9027D]
                            transition-all duration-300 ease-out
                            placeholder:text-white/30
                          `}
                                                    {...field}
                                                    onFocus={(e) => { field.onBlur?.(); setIsFocused(true) }}
                                                    onBlur={(e) => { field.onBlur?.(); setIsFocused(false) }}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="mt-2 text-[#D9027D]" />
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
                                            Sending OTP...
                                        </>
                                    ) : (
                                        "Continue"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </div>
            </div>
        </motion.div>
    )
}
