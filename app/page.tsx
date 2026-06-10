import React from 'react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-primary">
        University Platform
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Welcome to the cleaned-up version of our university portal. 
        Explore the navigation menu above to access different sections of the platform.
      </p>
    </div>
  )
}
