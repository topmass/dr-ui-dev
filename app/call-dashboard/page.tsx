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
import Link from "next/link"
import { DevControls } from '@/components/dev-controls'

export default function Dashboard() {
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
  const [showIncomingCall, setShowIncomingCall] = useState(false)

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

  const handleAcceptCall = () => {
    setShowIncomingCall(false)
    setIsConnected(true)
    // Reset call duration when accepting new call
    setCallDuration(0)
  }

  const handleEndCallNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEndCallNote(e.target.value);
  };

  const handleAIFlagNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAIFlagNote(e.target.value);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col relative">
      <DevControls 
        onTogglePopup={() => setShowIncomingCall(prev => !prev)} 
        showPopupButton={true} 
      />

      <Dialog open={showIncomingCall} onOpenChange={setShowIncomingCall}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 text-green-500">
                  <Phone className="h-5 w-5" />
                </div>
                01:14
              </div>
              <Button variant="destructive" size="sm">End Call</Button>
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <h3 className="text-lg font-semibold mb-4">Number not recognized</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:bg-neutral-50 cursor-pointer">
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-neutral-500">Last call: 2 days ago</p>
              </div>
              <div className="border rounded-lg p-4 hover:bg-neutral-50 cursor-pointer">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-neutral-500">Last call: 1 week ago</p>
              </div>
              <div className="border rounded-lg p-4 hover:bg-neutral-50 cursor-pointer">
                <p className="font-medium">Michael Brown</p>
                <p className="text-sm text-neutral-500">Last call: 2 weeks ago</p>
              </div>
              <div className="border rounded-lg p-4 hover:bg-neutral-50 cursor-pointer">
                <p className="font-medium">Emma Wilson</p>
                <p className="text-sm text-neutral-500">Last call: 1 month ago</p>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Input 
                placeholder="Search contacts..." 
                className="flex-grow"
              />
              <Button>Confirm</Button>
            </div>
            <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              AI is analyzing the call and suggesting matches from your CRM...
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAcceptCall} className="w-full">
              Accept Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              Live Call Analysis
              {isListening && (
                <div className="flex items-center text-green-500 animate-pulse text-sm">
                  <Activity className="w-4 h-4 mr-1" />
                  AI Listening
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4 mb-6">
              <Activity className="text-muted-foreground mt-1" style={{ opacity: activityOpacity }} />
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  It sounds like John is asking about his recent order (#12345). I can check the shipping status for this package.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Would you like me to look up the latest tracking update?
                </p>
                <div className="flex space-x-2">
                  <Button onClick={() => setShowMoreInfo(true)} variant="default" size="sm">Yes</Button>
                  <Button onClick={() => setShowMoreInfo(false)} variant="outline" size="sm">No</Button>
                </div>
              </div>
            </div>
            {showMoreInfo && (
              <Card className="bg-muted">
                <CardContent className="p-4">
                  <p className="text-sm mb-2">Order #12345 - Shipped via FedEx</p>
                  <p className="text-sm mb-2">Last Update: Out for delivery - Expected by 5:00 PM today</p>
                  <p className="text-sm">Current Location: Local FedEx facility in customer&apos;s city</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-1">John Doe</p>
              <p className="text-sm text-muted-foreground">123 Main St, Anytown, USA</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Previous Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between">
                  <span>Order #12345</span>
                  <span className="text-muted-foreground">$99.99</span>
                </li>
                <li className="flex justify-between">
                  <span>Order #67890</span>
                  <span className="text-muted-foreground">$149.99</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Previous Interaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-1">Last interaction: 2023-10-15</p>
              <p className="text-sm text-muted-foreground">Topic: Product return inquiry</p>
            </CardContent>
          </Card>
        </div>
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
              <span className="col-span-3">Customer&apos;s product return inquiry was addressed and resolved.</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="note" className="text-sm font-medium col-span-4">
                Additional Notes:
              </label>
              <Textarea
                id="note"
                value={endCallNote}
                onChange={handleEndCallNoteChange}
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
              onChange={handleAIFlagNoteChange}
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