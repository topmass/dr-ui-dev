'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Activity, Bot, User, Clock, Package, ChevronRight, Phone, MicOff, AlertTriangle, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function DashboardComponent() {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [isListening, setIsListening] = useState(true)
  const [activityOpacity, setActivityOpacity] = useState(0.5)
  const [isConnected, setIsConnected] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [showEndCallScreen, setShowEndCallScreen] = useState(false)
  const [endCallNote, setEndCallNote] = useState('')
  const [showAIFlagDialog, setShowAIFlagDialog] = useState(false)
  const [aiFlagNote, setAIFlagNote] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityOpacity((prev) => (prev === 0.5 ? 1 : 0.5))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isConnected) {
        setCallDuration((prev) => prev + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [isConnected])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    setIsConnected(false)
    setShowEndCallScreen(true)
  }

  const handleSubmitEndCall = () => {
    // Here you would typically send the end call data to your backend
    console.log('Call ended', { endCallNote, callDuration })
    setShowEndCallScreen(false)
    // Reset states for next call
    setCallDuration(0)
    setEndCallNote('')
  }

  const handleFlagAI = () => {
    setShowAIFlagDialog(true)
  }

  const handleSubmitAIFlag = () => {
    // Here you would typically send the AI flag data to your backend
    console.log('AI Flagged', { aiFlagNote })
    setShowAIFlagDialog(false)
    setAIFlagNote('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Bot className="mr-2 h-8 w-8" />
          Dataripple AI Call Agent
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div className="text-sm font-medium">{formatDuration(callDuration)}</div>
          <Toggle 
            pressed={isMuted} 
            onPressedChange={setIsMuted}
            aria-label="Toggle mute"
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Toggle>
          <Button variant="outline" className="text-sm">
            Settings
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="destructive" onClick={handleEndCall}>
            End Call
          </Button>
        </div>
      </div>
      {/* Main dashboard content (unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        {/* ... (previous content remains unchanged) ... */}
      </div>
      <Separator className="my-6" />
      <div className="flex items-center space-x-2">
        <Input placeholder="Type your response here..." className="flex-grow" />
        <Button>Send</Button>
      </div>

      {/* End Call Screen */}
      <Dialog open={showEndCallScreen} onOpenChange={setShowEndCallScreen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>End Call Summary</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Customer:</span>
              <span className="col-span-3">John Doe</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Duration:</span>
              <span className="col-span-3">{formatDuration(callDuration)}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Resolution:</span>
              <span className="col-span-3">Customer's product return inquiry was addressed and resolved.</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="note" className="text-sm font-medium col-span-4">
                Additional Notes:
              </label>
              <Textarea
                id="note"
                value={endCallNote}
                onChange={(e) => setEndCallNote(e.target.value)}
                className="col-span-4"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleFlagAI()}>
              <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
              Flag AI Issue
            </Button>
            <Button onClick={handleSubmitEndCall}>Submit & Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Flag Dialog */}
      <Dialog open={showAIFlagDialog} onOpenChange={setShowAIFlagDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Flag AI Issue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Describe the AI issue..."
              value={aiFlagNote}
              onChange={(e) => setAIFlagNote(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAIFlagDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitAIFlag} variant="destructive">Submit for Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}