"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Shape the Future",
    description: "Join a community of scholars dedicated to excellence and innovation.",
    bg: "bg-zinc-950",
    text: "text-zinc-50",
  },
  {
    title: "World Class Faculty",
    description: "Learn from leaders in their fields and gain insights that change perspectives.",
    bg: "bg-zinc-100 dark:bg-zinc-900",
    text: "text-zinc-950 dark:text-zinc-50",
  },
  {
    title: "Global Impact",
    description: "Our research and alumni are making a difference in every corner of the world.",
    bg: "bg-zinc-50 dark:bg-zinc-950",
    text: "text-zinc-950 dark:text-zinc-50",
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
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center p-8 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } ${slide.bg}`}
        >
          <div className="max-w-3xl text-center space-y-6">
            <h1 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter ${slide.text}`}>
              {slide.title}
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${slide.text} opacity-80`}>
              {slide.description}
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant={index === 0 ? "secondary" : "default"} size="lg" className="rounded-none uppercase tracking-widest px-8">
                Explore Programs
              </Button>
              <Button variant="outline" size="lg" className="rounded-none uppercase tracking-widest px-8">
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
              index === current ? "bg-primary w-20" : "bg-muted hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-foreground hover:bg-foreground/10"
        onClick={prev}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-foreground hover:bg-foreground/10"
        onClick={next}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </section>
  )
}
