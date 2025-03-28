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
    <TooltipProvider>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{prompt.title}</CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleFavorite}>
                  <Bookmark className={`h-5 w-5 ${isFavorited ? "fill-primary" : ""}`} />
                  <span className="sr-only">{isFavorited ? "Remove from favorites" : "Add to favorites"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFavorited ? "Remove from favorites" : "Add to favorites"}</TooltipContent>
            </Tooltip>
          </div>
          <CardDescription>{prompt.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3 flex-grow">
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="secondary">{prompt.category}</Badge>
            {prompt.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {prompt.tags.length > 2 && <Badge variant="outline">+{prompt.tags.length - 2}</Badge>}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{prompt.prompt}</p>
        </CardContent>
        <CardFooter className="pt-3 flex justify-between border-t">
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-1" />
            <span>{prompt.favorites}</span>
            <MessageSquare className="h-4 w-4 ml-3 mr-1" />
            <span>{prompt.uses}</span>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{prompt.title}</DialogTitle>
                <DialogDescription>{prompt.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Category</h4>
                  <Badge variant="secondary">{prompt.category}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Prompt</h4>
                  <div className="bg-muted p-3 rounded-md text-sm">{prompt.prompt}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Author</h4>
                  <p className="text-sm">{prompt.author}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="text-sm">{prompt.favorites} favorites</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-sm">{prompt.uses} uses</span>
                    </div>
                  </div>
                  <Button onClick={handleCopyPrompt}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Prompt
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}

