"use client"

import { Draggable } from "@/components/draggable"
import { ws } from "@/lib/utils"
import { DragDropProvider } from "@dnd-kit/react"
import { MousePointer2 } from "lucide-react"

export default function Home() {
  function move(x: number, y: number, id: string) {
    ws.send(JSON.stringify({ x, y, id }))
  }

  let controller: AbortController

  function handleStart(event: any) {
    controller = new AbortController()
    window.addEventListener(
      "mousemove",
      (e) => {
        move(e.clientX, e.clientY, event?.operation?.source?.id as string)
      },
      {
        signal: controller.signal,
      }
    )
  }

  function handleEnd(event: any) {
    controller.abort()
    ws.send(
      JSON.stringify({ deactivate: true, id: event?.operation?.source?.id })
    )
  }

  function broadcastMouse(event: React.MouseEvent<Element, MouseEvent>) {
    ws.send(JSON.stringify({ x: event.clientX, y: event.clientY }))
  }
  
  return (
    <div onMouseMove={broadcastMouse} className="min-h-svh flex p-10 gap-8 relative">
      <DragDropProvider onDragStart={handleStart} onDragEnd={handleEnd}>
        <Draggable key={"A1"} props={{ id: "A1", index: 0 }} />
        <Draggable key={"A2"} props={{ id: "A2", index: 1 }} />
        <Draggable key={"A3"} props={{ id: "A3", index: 2 }} />
        <Draggable key={"A4"} props={{ id: "A4", index: 3 }} />
      </DragDropProvider>
      <div id="mouse" className="absolute left-52 top-52 pointer-events-none"><MousePointer2 className="fill-amber-300"/> <div className="border rounded-sm px-1.5 translate-x-[1.25rem] translate-y-[-0.30rem] bg-amber-300">Username</div></div>
    </div>
  )
}
