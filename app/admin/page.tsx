"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Filter, MoreHorizontal, Plus, Search, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { toast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("prompts")

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/signin")
      } else if (user.role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        })
        router.push("/")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const handleApprovePrompt = (id: string) => {
    toast({
      title: "Prompt approved",
      description: `Prompt ID: ${id} has been approved and published.`,
    })
  }

  const handleRejectPrompt = (id: string) => {
    toast({
      title: "Prompt rejected",
      description: `Prompt ID: ${id} has been rejected.`,
    })
  }

  const handleDeletePrompt = (id: string) => {
    toast({
      title: "Prompt deleted",
      description: `Prompt ID: ${id} has been deleted.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage prompts, users, and site content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="prompts">Prompts</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-[200px] lg:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder={`Search ${activeTab}...`} className="w-full pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
          </div>

          <TabsContent value="prompts" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promptsData.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell className="font-medium">{prompt.title}</TableCell>
                      <TableCell>{prompt.category}</TableCell>
                      <TableCell>{prompt.author}</TableCell>
                      <TableCell>
                        <Badge variant={prompt.status === "published" ? "success" : "outline"}>{prompt.status}</Badge>
                      </TableCell>
                      <TableCell>{prompt.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeletePrompt(prompt.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPromptsData.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell className="font-medium">{prompt.title}</TableCell>
                      <TableCell>{prompt.category}</TableCell>
                      <TableCell>{prompt.author}</TableCell>
                      <TableCell>{prompt.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleApprovePrompt(prompt.id)}>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleRejectPrompt(prompt.id)}>
                            <X className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Reject</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Contact Author</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "success" : "outline"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Suspend
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Prompts</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoriesData.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>{category.count}</TableCell>
                      <TableCell>{category.created}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Prompts</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Sample data
const promptsData = [
  {
    id: "1",
    title: "Creative Story Generator",
    category: "Creative Writing",
    author: "Sarah Johnson",
    status: "published",
    date: "2023-03-15",
  },
  {
    id: "2",
    title: "Code Explainer",
    category: "Programming",
    author: "Michael Chen",
    status: "published",
    date: "2023-04-22",
  },
  {
    id: "3",
    title: "Email Composer",
    category: "Business",
    author: "Emma Williams",
    status: "published",
    date: "2023-05-10",
  },
  {
    id: "4",
    title: "Product Description",
    category: "Marketing",
    author: "David Miller",
    status: "published",
    date: "2023-06-05",
  },
  {
    id: "5",
    title: "Learning Concept Simplifier",
    category: "Education",
    author: "Lisa Taylor",
    status: "draft",
    date: "2023-07-18",
  },
]

const pendingPromptsData = [
  {
    id: "p1",
    title: "Interview Question Generator",
    category: "Career",
    author: "Robert Johnson",
    date: "2023-08-12",
  },
  {
    id: "p2",
    title: "Technical Documentation Writer",
    category: "Programming",
    author: "Jennifer Lee",
    date: "2023-08-14",
  },
  {
    id: "p3",
    title: "Marketing Campaign Ideas",
    category: "Marketing",
    author: "Thomas Wilson",
    date: "2023-08-15",
  },
]

const usersData = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    status: "active",
    joined: "2023-01-15",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
    joined: "2023-02-22",
  },
  {
    id: "u3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "user",
    status: "inactive",
    joined: "2023-03-10",
  },
  {
    id: "u4",
    name: "Admin User",
    email: "cpnow2@yahoo.com",
    role: "admin",
    status: "active",
    joined: "2023-01-05",
  },
]

const categoriesData = [
  {
    id: "c1",
    name: "Creative Writing",
    slug: "creative-writing",
    count: 42,
    created: "2023-01-10",
  },
  {
    id: "c2",
    name: "Programming",
    slug: "programming",
    count: 38,
    created: "2023-01-10",
  },
  {
    id: "c3",
    name: "Business",
    slug: "business",
    count: 35,
    created: "2023-01-15",
  },
  {
    id: "c4",
    name: "Marketing",
    slug: "marketing",
    count: 31,
    created: "2023-01-20",
  },
  {
    id: "c5",
    name: "Education",
    slug: "education",
    count: 28,
    created: "2023-02-05",
  },
]

