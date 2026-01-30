"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedLogoProps {
    onAnimationComplete?: () => void
}

export function AnimatedLogo({ onAnimationComplete }: AnimatedLogoProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [showFullName, setShowFullName] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const timer = setTimeout(() => {
            setShowFullName(true)
        }, 800)

        const completeTimer = setTimeout(() => {
            onAnimationComplete?.()
        }, 2000)

        return () => {
            clearTimeout(timer)
            clearTimeout(completeTimer)
        }
    }, [isMounted, onAnimationComplete])

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center">
                <span className="text-5xl md:text-6xl font-black text-[#D9027D] tracking-tighter" style={{ fontFamily: "var(--font-geist-sans), 'Outfit', 'Inter', sans-serif" }}>
                    M
                </span>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <div className="relative flex items-center">
                <motion.div
                    className="absolute -inset-4 bg-[#D9027D]/30 blur-2xl rounded-full"
                    initial={{ scale: 1.5, opacity: 0.5 }}
                    animate={{ scale: showFullName ? 2 : 1.5, opacity: showFullName ? 0.3 : 0.5 }}
                    transition={{ duration: 0.8 }}
                />

                <motion.span
                    className="relative text-5xl md:text-6xl font-black text-[#D9027D] tracking-tighter"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ fontFamily: "var(--font-geist-sans), 'Outfit', 'Inter', sans-serif" }}
                >
                    M
                </motion.span>

                <AnimatePresence>
                    {showFullName && (
                        <motion.span
                            className="relative text-5xl md:text-6xl font-black text-white tracking-tighter overflow-hidden"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{ fontFamily: "var(--font-geist-sans), 'Outfit', 'Inter', sans-serif" }}
                        >
                            <motion.span
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                istnove
                            </motion.span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
