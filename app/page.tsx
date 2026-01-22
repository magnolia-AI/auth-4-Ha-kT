'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="max-w-[800px] mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <CheckCircle2 className="h-20 w-20 text-primary" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
          Todo App
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
          Stay organized and productive with our persistent, secure, and intuitive todo list manager.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button asChild size="lg" className="h-12 px-8 text-lg font-semibold">
            <Link href="/todos">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg font-semibold">
            <Link href="/auth/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

