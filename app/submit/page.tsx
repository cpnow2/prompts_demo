"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { SiteHeader } from "@/components/site-header"
import { useAuth } from "@/contexts/auth-context"

export default function SubmitPrompt() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    prompt: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "You must be signed in to submit a prompt.",
        variant: "destructive",
      })
      router.push("/signin")
    }
  }, [user, isLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Prompt submitted",
      description:
        user?.role === "admin"
          ? "Your prompt has been published successfully."
          : "Your prompt has been submitted successfully and is pending review.",
    })

    setIsSubmitting(false)
    router.push("/")
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container max-w-2xl mx-auto py-6 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Submit a Prompt</h1>
            <p className="text-muted-foreground mt-1">
              {user.role === "admin" ? "Create and publish a new prompt" : "Share your prompt with the community"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a descriptive title"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe what your prompt does"
                  className="mt-1 resize-none"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Category
                </label>
                <Select value={formData.category} onValueChange={handleSelectChange} required>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creative-writing">Creative Writing</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="tags"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tags
                </label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags separated by commas (e.g., creative, story, fiction)"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="prompt"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Prompt
                </label>
                <Textarea
                  id="prompt"
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleChange}
                  placeholder="Enter your prompt. Use {placeholders} for variables."
                  className="mt-1 font-mono text-sm"
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use curly braces for variables, e.g., {"{topic}"}, {"{character}"}, etc.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : user.role === "admin" ? "Publish Prompt" : "Submit Prompt"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

