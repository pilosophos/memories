import { useEffect, useState } from "preact/hooks"
import type { Memory } from "./types";
import { MemoryFrame } from "./MemoryFrame";

export function MemoryProjection() {
  const [ memories, setMemories ] = useState([
    {memory: 'Me and dad on a sailboat', bgColor: 'blue'},
    {memory: 'My visit to the Met in New York', bgColor: 'red'},
    {memory: "My brother's sixth birthday party", bgColor: 'green'},
  ] as Memory[]);

  const [ memoryIndex, setMemoryIndex ] = useState(0);
  const currentMemory = memories[memoryIndex % memories.length];

  useEffect(() => {
    setTimeout(() => {
      setMemoryIndex(memoryIndex + 1);
    }, 8000);
  }, [memoryIndex])

  return (
    <main className="w-full h-full p-20">
      <div
        className="rounded-xl flex items-center h-full aspect-4/3 mx-auto p-20"
        style={ {background: currentMemory.bgColor} }
      >
        <span className="text-8xl text-white font-bold uppercase text-center">{currentMemory.memory}</span>
      </div>
    </main>
  )
}