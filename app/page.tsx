import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptCard } from "@/components/prompt-card"
import { CategoryFilter } from "@/components/category-filter"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container mx-auto py-6 px-4 md:px-6">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Prompt Library</h1>
            <p className="text-muted-foreground mt-1">Discover and use powerful prompts for your AI projects</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-[300px] hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search prompts..." className="w-full pl-8" />
            </div>
            <Button asChild>
              <Link href="/submit">Submit Prompt</Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <aside className="hidden md:block">
            <CategoryFilter />
          </aside>

          <main>
            <Tabs defaultValue="popular" className="mb-8">
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="recent" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="favorites" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoritePrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

// Sample data
const popularPrompts = [
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
    id: "2",
    title: "Code Explainer",
    description: "Explain complex code in simple terms",
    category: "Programming",
    tags: ["code", "explanation", "programming"],
    prompt: "Explain this code as if you're teaching a beginner: {code}",
    author: "Michael Chen",
    favorites: 189,
    uses: 876,
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
    id: "4",
    title: "Product Description",
    description: "Generate compelling product descriptions",
    category: "Marketing",
    tags: ["product", "marketing", "description"],
    prompt:
      "Write a compelling product description for {product} highlighting its {feature} and appealing to {target audience}.",
    author: "David Miller",
    favorites: 132,
    uses: 651,
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
  {
    id: "6",
    title: "Recipe Creator",
    description: "Generate recipes based on ingredients",
    category: "Food",
    tags: ["recipe", "cooking", "food"],
    prompt:
      "Create a recipe using these ingredients: {ingredients}. The dish should be {cuisine} style and {dietary restriction} friendly.",
    author: "James Wilson",
    favorites: 118,
    uses: 547,
  },
]

const recentPrompts = [
  {
    id: "7",
    title: "Social Media Post Generator",
    description: "Create engaging social media content",
    category: "Marketing",
    tags: ["social media", "content", "marketing"],
    prompt: "Generate a {platform} post about {topic} that will engage {target audience}. Include relevant hashtags.",
    author: "Olivia Brown",
    favorites: 87,
    uses: 412,
  },
  {
    id: "8",
    title: "Interview Question Preparer",
    description: "Prepare answers for common interview questions",
    category: "Career",
    tags: ["interview", "career", "preparation"],
    prompt:
      "Help me prepare an answer for the interview question: {question}. I'm applying for a {job title} position.",
    author: "Daniel Lee",
    favorites: 76,
    uses: 389,
  },
  // More recent prompts...
  {
    id: "9",
    title: "Study Notes Generator",
    description: "Create concise study notes on any topic",
    category: "Education",
    tags: ["study", "notes", "education"],
    prompt: "Generate concise study notes on {topic} covering the key concepts, definitions, and examples.",
    author: "Sophia Martinez",
    favorites: 65,
    uses: 342,
  },
  {
    id: "10",
    title: "Workout Plan Creator",
    description: "Generate personalized workout plans",
    category: "Fitness",
    tags: ["workout", "fitness", "health"],
    prompt:
      "Create a {duration} workout plan for {fitness level} focusing on {goal}. Include exercises, sets, and reps.",
    author: "Ryan Thompson",
    favorites: 58,
    uses: 321,
  },
  {
    id: "11",
    title: "Travel Itinerary Planner",
    description: "Plan detailed travel itineraries",
    category: "Travel",
    tags: ["travel", "itinerary", "planning"],
    prompt:
      "Create a {duration} day itinerary for {destination} for a traveler interested in {interests}. Include recommendations for accommodations, activities, and dining.",
    author: "Jessica Clark",
    favorites: 52,
    uses: 298,
  },
  {
    id: "12",
    title: "Debate Argument Generator",
    description: "Generate strong arguments for debates",
    category: "Education",
    tags: ["debate", "argument", "persuasion"],
    prompt:
      "Generate strong arguments for and against the statement: {statement}. Include supporting evidence and potential counterarguments.",
    author: "Andrew Wilson",
    favorites: 47,
    uses: 276,
  },
]

const favoritePrompts = [
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

