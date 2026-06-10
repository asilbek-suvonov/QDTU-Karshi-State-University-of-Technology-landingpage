import React from 'react'
import { notFound } from "next/navigation"

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8">Profile: {id}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
        User Profile information for ID: {id}
      </p>
    </div>
  )
}
