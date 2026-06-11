"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function ReadMoreText({ text, limit = 70 }: { text: string; limit?: number }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const words = text.split(" ")
  const isTooLong = words.length > limit

  const displayText = isExpanded ? text : words.slice(0, limit).join(" ") + (isTooLong ? "..." : "")

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground leading-relaxed">{displayText}</p>
      {isTooLong && (
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500">
          {isExpanded ? "Show less" : "Read more"}
        </Button>
      )}
    </div>
  )
}
