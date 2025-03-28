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
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Filters</h3>
        <Button 
          variant="outline" 
          className="w-full justify-start font-medium hover:bg-secondary transition-colors"
        >
          <Check className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <Collapsible open={openCategories} onOpenChange={setOpenCategories}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary transition-colors">
          <h3 className="text-sm font-semibold">Categories</h3>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              openCategories ? "transform rotate-180" : ""
            }`} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-2">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3 group">
                <Checkbox 
                  id={`category-${category.id}`}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium cursor-pointer flex justify-between w-full group-hover:text-primary transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="text-muted-foreground text-xs bg-secondary px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openTags} onOpenChange={setOpenTags}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary transition-colors">
          <h3 className="text-sm font-semibold">Popular Tags</h3>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              openTags ? "transform rotate-180" : ""
            }`} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-2">
          <div className="space-y-3">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center space-x-3 group">
                <Checkbox 
                  id={`tag-${tag.id}`}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={`tag-${tag.id}`}
                  className="text-sm font-medium cursor-pointer flex justify-between w-full group-hover:text-primary transition-colors"
                >
                  <span>{tag.name}</span>
                  <span className="text-muted-foreground text-xs bg-secondary px-2 py-0.5 rounded-full">
                    {tag.count}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
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

