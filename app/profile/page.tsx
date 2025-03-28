"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, Edit, Settings, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { PromptCard } from "@/components/prompt-card"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  // Filter submissions to only show the current user's submissions
  // (this would be handled by the backend in a real app)
  const filteredSubmissions =
    user.role === "admin" ? userSubmissions : userSubmissions.filter((submission) => submission.author === user.name)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container py-6">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                {user.role === "admin" && (
                  <Badge variant="outline" className="mt-1">
                    Admin
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="submissions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="submissions">
              <User className="mr-2 h-4 w-4" />
              My Submissions
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Bookmark className="mr-2 h-4 w-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-4">
            {filteredSubmissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubmissions.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No submissions yet</CardTitle>
                  <CardDescription>You haven't submitted any prompts yet.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <a href="/submit">Submit your first prompt</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {userFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userFavorites.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No favorites yet</CardTitle>
                  <CardDescription>You haven't saved any prompts as favorites yet.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <a href="/">Browse prompts</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Import the Badge component
import { Badge } from "@/components/ui/badge"

// Sample data
const userSubmissions = [
  {
    id: "101",
    title: "Personal Bio Generator",
    description: "Create professional personal bios for various platforms",
    category: "Business",
    tags: ["bio", "professional", "personal"],
    prompt:
      "Write a professional bio for {name} who is a {profession} with {years} years of experience. The bio should highlight their expertise in {skills} and be suitable for {platform}.",
    author: "Current User",
    favorites: 24,
    uses: 156,
  },
  {
    id: "102",
    title: "Book Summary Creator",
    description: "Generate concise book summaries",
    category: "Education",
    tags: ["books", "summary", "learning"],
    prompt:
      "Create a concise summary of the book '{title}' by {author}. Include the main themes, key takeaways, and why someone might want to read it.",
    author: "Current User",
    favorites: 18,
    uses: 132,
  },
]

const userFavorites = [
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
  },
  {
    id: "3",
    title: "Email Composer",
    description: "Create professional emails quickly",
    category: "Business",
    tags: ["email", "professional", "business"],
    prompt: "Write a professional email to {recipient} about {topic} with a {tone} tone.",
    author: "Emma Williams",
    favorites: 156,
    uses: 723,
  },
  {
    id: "5",
    title: "Learning Concept Simplifier",
    description: "Explain complex concepts in simple terms",
    category: "Education",
    tags: ["learning", "explanation", "education"],
    prompt: "Explain {complex concept} in simple terms as if you're teaching a {age} year old.",
    author: "Lisa Taylor",
    favorites: 124,
    uses: 592,
  },
]

