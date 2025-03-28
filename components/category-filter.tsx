"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CategoryFilter() {
  const [openCategories, setOpenCategories] = useState(true)
  const [openTags, setOpenTags] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <Button 
          variant="outline" 
          className="w-full justify-start text-sm font-medium text-gray-500 hover:text-black border border-gray-200 hover:bg-transparent"
        >
          Clear Filters
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox 
                id={`category-${category.id}`}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm flex justify-between w-full cursor-pointer group"
              >
                <span className="text-gray-700 group-hover:text-black">{category.name}</span>
                <span className="text-gray-400">{category.count}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Popular Tags</h3>
        <div className="space-y-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <Checkbox 
                id={`tag-${tag.id}`}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <label
                htmlFor={`tag-${tag.id}`}
                className="ml-2 text-sm flex justify-between w-full cursor-pointer group"
              >
                <span className="text-gray-700 group-hover:text-black">{tag.name}</span>
                <span className="text-gray-400">{tag.count}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sample data
const categories = [
  { id: "1", name: "Creative Writing", count: 42 },
  { id: "2", name: "Programming", count: 38 },
  { id: "3", name: "Business", count: 35 },
  { id: "4", name: "Marketing", count: 31 },
  { id: "5", name: "Education", count: 28 },
  { id: "6", name: "Food", count: 24 },
  { id: "7", name: "Travel", count: 21 },
  { id: "8", name: "Fitness", count: 18 },
]

const tags = [
  { id: "1", name: "story", count: 35 },
  { id: "2", name: "code", count: 32 },
  { id: "3", name: "email", count: 29 },
  { id: "4", name: "marketing", count: 27 },
  { id: "5", name: "explanation", count: 25 },
  { id: "6", name: "business", count: 23 },
  { id: "7", name: "education", count: 21 },
  { id: "8", name: "creative", count: 19 },
]

