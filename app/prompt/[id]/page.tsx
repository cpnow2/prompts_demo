import { ArrowLeft, Bookmark, Copy, MessageSquare, Share2, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"

interface PageProps {
  params: {
    id: string
  }
}

export default function PromptPage({ params }: PageProps) {
  // In a real app, you would fetch the prompt data based on the ID
  const prompt = promptsData.find((p) => p.id === params.id) || promptsData[0]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container max-w-4xl mx-auto py-6 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{prompt.title}</h1>
              <p className="text-muted-foreground mt-1">{prompt.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{prompt.category}</Badge>
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Prompt</h3>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
              </div>
              <Textarea
                readOnly
                value={prompt.prompt}
                className="font-mono text-sm resize-none bg-background"
                rows={6}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Replace the placeholders (text in curly braces) with your own content.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Example Usage</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">{prompt.example || "No example provided for this prompt."}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Comments (12)</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={prompt.author} />
                  <AvatarFallback>{prompt.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{prompt.author}</p>
                  <p className="text-xs text-muted-foreground">Prompt Creator</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full">
                  Follow
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Prompt Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm">March 15, 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Updated</span>
                  <span className="text-sm">June 22, 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Favorites</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">{prompt.favorites}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Uses</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">{prompt.uses}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save to Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Prompt
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Prompt
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Similar Prompts</h3>
              <div className="space-y-3">
                {similarPrompts.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/prompt/${similar.id}`}
                    className="block hover:bg-background p-2 rounded-md transition-colors"
                  >
                    <p className="font-medium text-sm">{similar.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{similar.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const promptsData = [
  {
    id: "1",
    title: "Creative Story Generator",
    description: "Generate a creative short story based on a few keywords",
    category: "Creative Writing",
    tags: ["story", "creative", "fiction"],
    prompt: "Write a short story about {theme} set in {setting} with a character who is {character trait}.",
    author: "Sarah Johnson",
    favorites: 245,
    uses: 1024,
    example:
      "Example: Using the prompt with theme='redemption', setting='post-apocalyptic world', character trait='seeking forgiveness', you'll get a story about a character seeking redemption in a post-apocalyptic setting.",
  },
  {
    id: "2",
    title: "Code Explainer",
    description: "Explain complex code in simple terms",
    category: "Programming",
    tags: ["code", "explanation", "programming"],
    prompt: "Explain this code as if you're teaching a beginner: {code}",
    author: "Michael Chen",
    favorites: 189,
    uses: 876,
    example:
      "Example: When you input a complex algorithm, the AI will break it down into simple concepts, explaining each part's purpose and how they work together.",
  },
]

const comments = [
  {
    id: "1",
    author: "Alex Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    content:
      "This prompt is amazing! I used it to generate a story for my creative writing class and got an A+. Thank you for sharing!",
  },
  {
    id: "2",
    author: "Jamie Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "1 week ago",
    content:
      "I've been using this prompt for a month now and it consistently produces great results. Highly recommended for anyone looking to improve their storytelling.",
  },
  {
    id: "3",
    author: "Taylor Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2 weeks ago",
    content: "Would be better if it had more options for character development. Still pretty good though.",
  },
]

const similarPrompts = [
  {
    id: "3",
    title: "Character Development Prompt",
    description: "Create detailed character profiles for your stories",
  },
  {
    id: "4",
    title: "Plot Twist Generator",
    description: "Generate unexpected plot twists for your narratives",
  },
  {
    id: "5",
    title: "Dialogue Creator",
    description: "Create realistic dialogue between characters",
  },
  {
    id: "6",
    title: "Setting Description",
    description: "Generate vivid descriptions of story settings",
  },
]

