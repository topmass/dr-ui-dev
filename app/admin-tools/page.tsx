'use client'

import * as React from "react"
import { PlusCircle, Settings, Wrench } from "lucide-react"

interface Tool {
  id: number;
  name: string;
  description: string;
  systemPrompt: string;
  functionDef: string;
  apiKeyName: string;
  active: boolean;
}

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DevControls } from "@/components/dev-controls"

export default function AdminToolsDashboard() {
  const [tools, setTools] = React.useState<Tool[]>([
    {
      id: 1,
      name: "Track Package",
      description: "Look up shipping status for orders",
      systemPrompt: "You can track packages using the tracking API. When a customer asks about their order status, use this tool to fetch real-time shipping updates.",
      functionDef: "async function trackPackage(trackingNumber: string) { /* Implementation */ }",
      apiKeyName: "SHIPPING_API_KEY",
      active: true
    },
    {
      id: 2,
      name: "Order History",
      description: "Fetches customer's previous orders",
      systemPrompt: "Use this tool to retrieve order history when discussing past purchases or returns.",
      functionDef: "async function getOrderHistory(customerId: string) { /* Implementation */ }",
      apiKeyName: "CRM_API_KEY",
      active: true
    },
  ])
  const [systemPrompt, setSystemPrompt] = React.useState(
    "You are a helpful AI assistant. Your role is to assist customers with their inquiries and provide accurate information."
  )

  const handleAddTool = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newTool: Tool = {
      id: tools.length + 1,
      name: formData.get("toolName") as string,
      description: formData.get("toolDescription") as string,
      systemPrompt: formData.get("toolSystemPrompt") as string,
      functionDef: formData.get("toolFunctionDef") as string,
      apiKeyName: formData.get("toolApiKeyName") as string,
      active: true
    }
    setTools([...tools, newTool])
  }

  const handleUpdateSystemPrompt = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setSystemPrompt(formData.get("systemPrompt") as string)
  }

  return (
    <div className="container mx-auto p-4">
      <DevControls />
      <h1 className="text-2xl font-bold mb-4">Admin Tools Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tool Management</CardTitle>
            <CardDescription>Add and manage tools for call agents</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleAddTool}>
                  <DialogHeader>
                    <DialogTitle>Add New Tool</DialogTitle>
                    <DialogDescription>
                      Configure a new tool for the AI agent to use during calls.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="toolName">Tool Name</Label>
                      <Input
                        id="toolName"
                        name="toolName"
                        placeholder="e.g., Track Package"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="toolDescription">Description</Label>
                      <Input
                        id="toolDescription"
                        name="toolDescription"
                        placeholder="Brief description of what the tool does"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="toolSystemPrompt">System Prompt</Label>
                      <Textarea
                        id="toolSystemPrompt"
                        name="toolSystemPrompt"
                        placeholder="Instructions for the AI on how to use this tool"
                        rows={3}
                      />
                      <p className="text-sm text-neutral-500">
                        Explain when and how the AI should use this tool during conversations.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="toolFunctionDef">Function Definition</Label>
                      <Textarea
                        id="toolFunctionDef"
                        name="toolFunctionDef"
                        placeholder="TypeScript/JavaScript function definition"
                        rows={3}
                        className="font-mono text-sm"
                      />
                      <p className="text-sm text-neutral-500">
                        Define the function interface that will be called when this tool is used.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="toolApiKeyName">API Key Name (Optional)</Label>
                      <Input
                        id="toolApiKeyName"
                        name="toolApiKeyName"
                        placeholder="e.g., SHIPPING_API_KEY"
                      />
                      <p className="text-sm text-neutral-500">
                        Environment variable name for the API key if required.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Tool</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
          <CardFooter>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <div className="grid gap-2">
                {tools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-neutral-500">{tool.description}</p>
                    </div>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prompt Manager</CardTitle>
            <CardDescription>Adjust the system prompt for the entire system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateSystemPrompt}>
              <div className="grid w-full gap-4">
                <Textarea
                  id="systemPrompt"
                  name="systemPrompt"
                  placeholder="Enter system prompt"
                  className="min-h-[200px]"
                  defaultValue={systemPrompt}
                />
                <Button type="submit">Update System Prompt</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}