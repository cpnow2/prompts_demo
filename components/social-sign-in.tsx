"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface SocialSignInProps {
  callbackUrl?: string
}

export function SocialSignIn({ callbackUrl = "/" }: SocialSignInProps) {
  const router = useRouter()
  const { signInWithSocial } = useAuth()
  const [isLoading, setIsLoading] = useState<"google" | "apple" | null>(null)

  const handleSocialSignIn = async (provider: "google" | "apple") => {
    try {
      setIsLoading(provider)
      const success = await signInWithSocial(provider)

      if (success) {
        toast({
          title: "Sign in successful",
          description: `You've successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`,
        })
        router.push(callbackUrl)
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: `There was a problem signing in with ${provider}.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        type="button"
        disabled={isLoading !== null}
        onClick={() => handleSocialSignIn("google")}
        className="flex items-center justify-center gap-2"
      >
        {isLoading === "google" ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading !== null}
        onClick={() => handleSocialSignIn("apple")}
        className="flex items-center justify-center gap-2"
      >
        {isLoading === "apple" ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.apple className="mr-2 h-4 w-4" />
        )}
        Apple
      </Button>
    </div>
  )
}

