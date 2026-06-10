"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Shape the Future",
    description: "Join a community of scholars dedicated to excellence and innovation.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop",
    text: "text-white",
  },
  {
    title: "World Class Faculty",
    description: "Learn from leaders in their fields and gain insights that change perspectives.",
    image: "https://images.unsplash.com/photo-1523050335391-4b7016149ad3?q=80&w=2072&auto=format&fit=crop",
    text: "text-white",
  },
  {
    title: "Global Impact",
    description: "Our research and alumni are making a difference in every corner of the world.",
    image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2070&auto=format&fit=crop",
    text: "text-white",
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const next = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === current ? "scale(1)" : "scale(1.1)"
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative max-w-3xl text-center space-y-6 p-8">
            <h1 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter ${slide.text}`}>
              {slide.title}
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${slide.text} opacity-80`}>
              {slide.description}
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg" className="rounded-none uppercase tracking-widest px-8">
                Explore Programs
              </Button>
              <Button variant="outline" size="lg" className="rounded-none uppercase tracking-widest px-8 border-white text-white hover:bg-white hover:text-black">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-12 h-1 transition-all ${
              index === current ? "bg-white w-20" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/10"
        onClick={prev}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/10"
        onClick={next}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </section>
  )
}
