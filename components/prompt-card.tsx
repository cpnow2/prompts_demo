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
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-3 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl font-semibold leading-tight">{prompt.title}</CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-secondary" 
                  onClick={toggleFavorite}
                >
                  <Bookmark className={`h-5 w-5 transition-colors ${isFavorited ? "fill-primary text-primary" : ""}`} />
                  <span className="sr-only">{isFavorited ? "Remove from favorites" : "Add to favorites"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{isFavorited ? "Remove from favorites" : "Add to favorites"}</TooltipContent>
            </Tooltip>
          </div>
          <CardDescription className="text-base">{prompt.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3 flex-grow space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="px-2.5 py-0.5 text-sm font-medium">{prompt.category}</Badge>
            {prompt.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="px-2.5 py-0.5 text-sm">
                {tag}
              </Badge>
            ))}
            {prompt.tags.length > 2 && (
              <Badge variant="outline" className="px-2.5 py-0.5 text-sm">
                +{prompt.tags.length - 2}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{prompt.prompt}</p>
        </CardContent>
        <CardFooter className="pt-4 flex justify-between items-center border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1.5 text-yellow-500" />
              <span>{prompt.favorites}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1.5 text-blue-500" />
              <span>{prompt.uses}</span>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="font-medium">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-2xl">{prompt.title}</DialogTitle>
                <DialogDescription className="text-base">{prompt.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <Badge variant="secondary" className="px-2.5 py-0.5 text-sm font-medium">{prompt.category}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="px-2.5 py-0.5 text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Prompt</h4>
                  <div className="bg-muted p-4 rounded-lg text-sm leading-relaxed">{prompt.prompt}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Author</h4>
                  <p className="text-sm text-muted-foreground">{prompt.author}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1.5 text-yellow-500" />
                      <span className="text-sm">{prompt.favorites} favorites</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1.5 text-blue-500" />
                      <span className="text-sm">{prompt.uses} uses</span>
                    </div>
                  </div>
                  <Button onClick={handleCopyPrompt} className="gap-2">
                    <Copy className="h-4 w-4" />
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

