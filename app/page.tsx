import * as React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PhoneCall, Users, Wrench } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Dataripple UX Examples</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/call-dashboard" className="block">
            <Card className="h-full hover:border-neutral-400 transition-colors">
              <CardHeader>
                <PhoneCall className="w-8 h-8 mb-2 text-neutral-600" />
                <CardTitle>Call Dashboard</CardTitle>
                <CardDescription>Live call analysis and customer information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500">
                  Monitor active calls, view customer details, and get AI-powered suggestions in real-time.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/manager-dashboard" className="block">
            <Card className="h-full hover:border-neutral-400 transition-colors">
              <CardHeader>
                <Users className="w-8 h-8 mb-2 text-neutral-600" />
                <CardTitle>Manager Dashboard</CardTitle>
                <CardDescription>Review and manage conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500">
                  Review flagged conversations, provide feedback, and monitor team performance.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin-tools" className="block">
            <Card className="h-full hover:border-neutral-400 transition-colors">
              <CardHeader>
                <Wrench className="w-8 h-8 mb-2 text-neutral-600" />
                <CardTitle>Admin Tools</CardTitle>
                <CardDescription>Manage AI agent capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500">
                  Add and configure tools for the AI agent, manage API keys, and customize system prompts.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}