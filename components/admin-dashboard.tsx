'use client'

import * as React from "react"
import { Bell, ChevronDown, Flag, MessageSquare, Search, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Conversation {
  id: number;
  csr: string;
  customer: string;
  date: string;
  summary: string;
  notes: string;
  transcript: Array<{
    speaker: string;
    message: string;
    action?: string;
    csrResponse?: string;
  }>;
}

export function AdminDashboardComponent() {
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null)

  const flaggedConversations = [
    {
      id: 1,
      csr: "Alice Johnson",
      customer: "John Doe",
      date: "2023-05-15",
      summary: "Customer requested a refund for a product purchased 45 days ago.",
      notes: "AI suggested denying the refund based on a misinterpreted 30-day policy. Our actual policy for this product is 60 days.",
      transcript: [
        { speaker: "Customer", message: "Hi, I'd like to request a refund for the product I bought last month." },
        { speaker: "CSR", message: "Hello! I'd be happy to help you with that. Can you please provide me with your order number?" },
        { speaker: "Customer", message: "Sure, it's order number 12345." },
        { speaker: "CSR", message: "Thank you. I'm looking up your order now." },
        { speaker: "AI", message: "Suggestion: The order is 45 days old. Our standard refund policy is 30 days. Recommend denying the refund request.", action: "Deny refund?", csrResponse: "No" },
        { speaker: "CSR", message: "I see that you purchased our premium product line, which actually has a 60-day return policy. You're still within that window, so we can certainly process that refund for you." },
        { speaker: "Customer", message: "Oh, that's great! I wasn't sure about the policy." },
        { speaker: "CSR", message: "No problem at all. I'm glad I could clarify that for you. I'll start processing your refund right away." },
        { speaker: "AI", message: "Suggestion: Offer the customer a 10% discount on their next purchase to encourage retention.", action: "Offer discount?", csrResponse: "Yes" },
        { speaker: "CSR", message: "As a token of our appreciation for your business, I'd like to offer you a 10% discount on your next purchase with us. Would you be interested in that?" },
        { speaker: "Customer", message: "Yes, that would be great! Thank you so much for your help." },
        { speaker: "CSR", message: "You're welcome! I'm sending you an email with the refund confirmation and your discount code. Is there anything else I can help you with today?" },
        { speaker: "Customer", message: "No, that's all. Thanks again!" },
        { speaker: "CSR", message: "Thank you for choosing our company. Have a great day!" },
      ]
    },
    {
      id: 2,
      csr: "Bob Smith",
      customer: "Jane Smith",
      date: "2023-05-14",
      summary: "Customer inquired about features of the new XYZ model.",
      notes: "AI provided outdated information about the ABC model instead of the new XYZ model the customer asked about.",
      transcript: [
        { speaker: "Customer", message: "Hello, I'm interested in the new XYZ model. Can you tell me about its features?" },
        { speaker: "CSR", message: "I'd be happy to provide you with information about our new XYZ model." },
        { speaker: "AI", message: "Suggestion: Provide information about the ABC model: 10-inch display, 64GB storage, 12MP camera.", action: "Use this information?", csrResponse: "No" },
        { speaker: "CSR", message: "The new XYZ model actually has some great upgrades from our previous models. It features a 12-inch display, 128GB of storage, and a 16MP camera." },
        { speaker: "Customer", message: "That sounds impressive. How does the battery life compare to the previous model?" },
        { speaker: "AI", message: "Suggestion: The XYZ model has a 20% longer battery life compared to the previous model.", action: "Confirm this information?", csrResponse: "Yes" },
        { speaker: "CSR", message: "I'm glad you asked about the battery life. The XYZ model has a 20% longer battery life compared to our previous model, which means you can use it for extended periods without needing to recharge." },
        { speaker: "Customer", message: "That's great to hear. Is it available in different colors?" },
        { speaker: "CSR", message: "Yes, the XYZ model comes in three colors: Silver, Space Gray, and Gold. Do you have a color preference?" },
        { speaker: "Customer", message: "I think I'd like the Space Gray. When can I place an order?" },
        { speaker: "AI", message: "Suggestion: Offer immediate pre-order with a 5% discount for early adopters.", action: "Make this offer?", csrResponse: "Yes" },
        { speaker: "CSR", message: "Excellent choice! I have good news for you. We're currently offering a special 5% discount for customers who pre-order the XYZ model. Would you like to take advantage of this offer and place your pre-order today?" },
        { speaker: "Customer", message: "That sounds like a great deal. Yes, I'd like to pre-order it now." },
        { speaker: "CSR", message: "Wonderful! I'll guide you through the pre-order process right away." },
      ]
    },
    {
      id: 3,
      csr: "Charlie Brown",
      customer: "Lucy van Pelt",
      date: "2023-05-13",
      summary: "Customer reported a minor software glitch in their device.",
      notes: "AI suggested a factory reset for a simple clock issue, which was unnecessary and could have led to data loss.",
      transcript: [
        { speaker: "Customer", message: "Hi, I'm having a small issue with my device. The clock keeps resetting to 12:00." },
        { speaker: "CSR", message: "I'm sorry to hear you're experiencing this issue. Let's see if we can resolve it quickly for you." },
        { speaker: "AI", message: "Suggestion: Recommend a factory reset to resolve persistent software issues.", action: "Suggest factory reset?", csrResponse: "No" },
        { speaker: "CSR", message: "Before we try any drastic measures, let's start with some simple troubleshooting. Have you tried restarting your device recently?" },
        { speaker: "Customer", message: "No, I haven't. Should I do that now?" },
        { speaker: "CSR", message: "Yes, please. Let's try a simple restart first. It often resolves minor glitches like this without risking any data loss." },
        { speaker: "Customer", message: "Okay, I'm restarting it now... It's back on. The clock seems to be working correctly now!" },
        { speaker: "AI", message: "Suggestion: Provide steps to manually set the time and date to prevent future issues.", action: "Offer these instructions?", csrResponse: "Yes" },
        { speaker: "CSR", message: "That's great news! To prevent this from happening again, let me guide you through the steps to manually set the time and date on your device. This way, even if it resets, you'll know how to fix it quickly." },
        { speaker: "Customer", message: "That would be very helpful, thank you." },
        { speaker: "CSR", message: "You're welcome. First, go to your device's Settings, then tap on 'General', and select 'Date & Time'. Make sure 'Set Automatically' is turned on. If it is and you still have issues, you can toggle it off and set the time manually." },
        { speaker: "Customer", message: "I see it. That's really simple, thanks for walking me through it." },
        { speaker: "CSR", message: "You're very welcome. Is there anything else I can help you with today?" },
        { speaker: "Customer", message: "No, that's all. Thanks for your help!" },
        { speaker: "CSR", message: "It was my pleasure. Thank you for choosing our support service. Have a great day!" },
      ]
    },
  ]

  const handleDecision = (decision: string) => {
    // Mock function to handle manager's decision
    console.log(`Decision made: ${decision}`)
    // In a real application, this would trigger an email/notification to the CSR
    alert(`Feedback "${decision}" sent to CSR`)
    setSelectedConversation(null)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Manager Dashboard</h1>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700"
          >
            <Flag className="mr-3 h-5 w-5" />
            Flagged Conversations
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 mr-4"
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by CSR" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alice">Alice Johnson</SelectItem>
                <SelectItem value="bob">Bob Smith</SelectItem>
                <SelectItem value="charlie">Charlie Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="@manager" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Manager</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      manager@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Flagged Conversations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* List of flagged conversations */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Flags</CardTitle>
                  <CardDescription>Click on a conversation to review</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {flaggedConversations.map((conv) => (
                      <div
                        key={conv.id}
                        className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{conv.csr}</span>
                          <Badge variant="outline">{conv.date}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{conv.summary}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Detailed view of selected conversation */}
              {selectedConversation && (
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Conversation Details</CardTitle>
                    <CardDescription>Review and make a decision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Conversation Info</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">CSR:</span> {selectedConversation.csr}</p>
                        <p className="text-sm  text-gray-600 dark:text-gray-400"><span className="font-medium">Customer:</span> {selectedConversation.customer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Date:</span> {selectedConversation.date}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Summary</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedConversation.summary}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">CSR Notes</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedConversation.notes}</p>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Full Transcript</h3>
                      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                        {selectedConversation.transcript.map((entry, index) => (
                          <div key={index} className="mb-4">
                            {entry.speaker === "AI" ? (
                              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">AI Suggestion:</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{entry.message}</p>
                                <div className="mt-2 flex items-center">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{entry.action}</span>
                                  <Badge variant={entry.csrResponse === "Yes" ? "success" : "destructive"}>
                                    {entry.csrResponse}
                                  </Badge>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">{entry.speaker}:</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{entry.message}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Textarea
                      placeholder="Add your comments here..."
                      className="w-full"
                    />
                    <div className="flex justify-between w-full">
                      <Button variant="outline" onClick={() => handleDecision("AI was correct")}>
                        AI was correct
                      </Button>
                      <div className="space-x-2">
                        <Button onClick={() => handleDecision("CSR was correct")}>
                          CSR was correct
                        </Button>
                        <Button variant="secondary" onClick={() => handleDecision("Neither option correct")}>
                          Neither option correct
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}