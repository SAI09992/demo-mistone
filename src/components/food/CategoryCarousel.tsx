"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CATEGORIES } from "@/lib/mock-data"

export function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h2 className="text-xl font-bold tracking-tight">What's on your mind?</h2>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 no-scrollbar snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center flex-shrink-0 snap-center cursor-pointer"
          >
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden mb-2 border-2 border-transparent hover:border-primary transition-all">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 150px"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{category.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
