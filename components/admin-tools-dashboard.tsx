'use client'

import * as React from "react"
import { PlusCircle, Settings, Wrench } from "lucide-react"

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

export function AdminToolsDashboardComponent() {
  const [tools, setTools] = React.useState([
    { id: 1, name: "Weather API", description: "Fetches current weather data" },
    { id: 2, name: "Currency Converter", description: "Converts between currencies" },
    { id: 3, name: "Product Catalog", description: "Searches product database" },
  ])
  const [systemPrompt, setSystemPrompt] = React.useState(
    "You are a helpful AI assistant. Your role is to assist customers with their inquiries and provide accurate information."
  )

  const handleAddTool = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newTool = {
      id: tools.length + 1,
      name: formData.get("toolName") as string,
      description: formData.get("toolDescription") as string,
      systemPrompt: formData.get("toolSystemPrompt") as string,
      functionDef: formData.get("toolFunctionDef") as string,
      apiKeyName: formData.get("toolApiKeyName") as string,
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
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddTool}>
                  <DialogHeader>
                    <DialogTitle>Add New Tool</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new tool. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="toolName" className="text-right">
                        Name
                      </Label>
                      <Input id="toolName" name="toolName" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="toolDescription" className="text-right">
                        Description
                      </Label>
                      <Input id="toolDescription" name="toolDescription" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="toolSystemPrompt" className="text-right">
                        System Prompt
                      </Label>
                      <Textarea id="toolSystemPrompt" name="toolSystemPrompt" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="toolFunctionDef" className="text-right">
                        Function Definition
                      </Label>
                      <Textarea id="toolFunctionDef" name="toolFunctionDef" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="toolApiKeyName" className="text-right">
                        API Key Name
                      </Label>
                      <Input id="toolApiKeyName" name="toolApiKeyName" className="col-span-3" />
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
                      <p className="text-sm text-gray-500">{tool.description}</p>
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