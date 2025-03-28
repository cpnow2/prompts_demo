"use client"

import { useState } from "react"
import { Bookmark, Copy, MessageSquare, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface PromptCardProps {
  prompt: {
    id: string
    title: string
    description: string
    category: string
    tags: string[]
    prompt: string
    author: string
    favorites: number
    uses: number
  }
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt)
    toast({
      title: "Prompt copied",
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited
        ? "The prompt has been removed from your favorites."
        : "The prompt has been added to your favorites.",
    })
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {prompt.title}
          </h3>
          <p className="text-sm text-gray-600">
            {prompt.description}
          </p>
        </div>
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="text-gray-400 hover:text-black"
        >
          <Bookmark className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
          <span className="sr-only">
            {isFavorited ? "Remove from favorites" : "Add to favorites"}
          </span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-2.5 py-0.5 text-xs font-medium">
            {prompt.category}
          </Badge>
          {prompt.tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-gray-600 border-gray-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
          {prompt.tags.length > 2 && (
            <Badge 
              variant="outline" 
              className="text-gray-600 border-gray-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              +{prompt.tags.length - 2}
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">
          {prompt.prompt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{prompt.favorites}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{prompt.uses}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="text-sm font-medium text-gray-600 hover:text-black hover:bg-transparent"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

