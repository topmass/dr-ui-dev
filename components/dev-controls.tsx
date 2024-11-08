import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GripVertical } from 'lucide-react'

interface DevControlsProps {
  onTogglePopup?: () => void
  showPopupButton?: boolean
}

export function DevControls({ onTogglePopup, showPopupButton = false }: DevControlsProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Set initial position after component mounts
    setPosition({ 
      x: window.innerWidth - 250,
      y: window.innerHeight - 150
    })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = Math.min(Math.max(0, e.clientX - dragStart.x), window.innerWidth - 200)
      const newY = Math.min(Math.max(0, e.clientY - dragStart.y), window.innerHeight - 100)
      setPosition({
        x: newX,
        y: newY
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      className="fixed flex flex-col bg-neutral-900/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-50 cursor-move"
      style={{
        left: position.x,
        top: position.y,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex items-center mb-2 text-white/50">
        <GripVertical className="h-4 w-4 mr-2" />
        Dev Controls
      </div>
      <div className="flex flex-col space-y-2">
        <Link 
          href="/" 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
        >
          Return to Index
        </Link>
        {showPopupButton && (
          <button 
            onClick={onTogglePopup}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Toggle Call Popup
          </button>
        )}
      </div>
    </div>
  )
} 