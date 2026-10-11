import { useEffect, useState } from "preact/hooks"
import type { Memory } from "./types";
import { SERVER_URL, socket } from './server-connection';

export function MemoryProjection() {
  const [ memories, setMemories ] = useState([
    {memory: 'Loading memories', bgColor: 'blue'},
  ] as Memory[]);

  const [ memoryChangeTimeout, setMemoryChangeTimeout ] = useState(null as number | null);
  const [ memoryIndex, setMemoryIndex ] = useState(0);
  const currentMemory = memories[memoryIndex % memories.length];

  useEffect(() => {
    if (memoryChangeTimeout === null) {
      const timeout = setTimeout(() => {
        setMemoryIndex(memoryIndex + 1);
        setMemoryChangeTimeout(null);
      }, 5000);
      setMemoryChangeTimeout(timeout);
    }
  }, [memoryIndex])

  useEffect(() => {
    fetch(`${SERVER_URL}/memories`)
      .then(res => res.json())
      .then(fetchedMemories => setMemories(fetchedMemories))
  }, []);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onMemoryAdded(memory: Memory) {
      console.log('Adding memory', memory);

      setMemories(existingMemories => {
        const combinedMemories = existingMemories.toSpliced((memoryIndex % memories.length) + 1, 0, memory);
        console.log(memoryIndex, combinedMemories)
        return combinedMemories;
      });
    }
    
    socket.on('memoryAdded', onMemoryAdded);

    return () => {
      socket.off('memoryAdded', onMemoryAdded);
    }
  }, [memoryIndex])

  return (
    <main className="w-full h-full p-20">
      <div
        className="rounded-xl flex items-center justify-center h-full aspect-4/3 mx-auto p-20"
        style={ {background: currentMemory.bgColor} }
      >
        <span className="text-8xl text-white font-bold uppercase text-center">{currentMemory.memory}</span>
      </div>
    </main>
  )
}