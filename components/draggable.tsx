"use client"
import { Button } from "./ui/button"
import { useSortable } from "@dnd-kit/react/sortable"

type DragProps = {
  id: string
  index: number
}

export function Draggable({ props }: { props: DragProps }) {
  const { ref } = useSortable({id: props.id, index: props.index})

  return (
    <Button ref={ref} id={props.id}>
      draggable {props.id}
    </Button>
  )
}
