import { MemoryCreator } from './MemoryCreator';

export function App() {
  return (
    <>
      <MemoryCreator/>
      <div className="md:absolute text-white bottom-0 left-0 text-center p-5 w-full">
        Your memories, brought you by <span className="text-yellow-500">Pi</span>losophos (<span className="text-yellow-500">pi</span>losophos.com)
      </div>
    </>
  )
}
