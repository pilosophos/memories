import type { Memory } from "./types";


export function MemoryFrame({ memory, bgColor }: Memory) {
  return (
    <article className="text-white w-80 m-5 p-5 shadow-md pb-15 bg-stone-100 rotate-1">
      <figure
        className="inset-shadow-sm inset-shadow-black/20 flex place-content-center bg-stone-300 aspect-square p-5 text-center transtion-colors duration-300"
        style={ {backgroundColor: bgColor} }
      >
        <div
          className="font-bold uppercase text-2xl h-fit"
          contentEditable={true}
        >
          { memory }
        </div>
      </figure>
    </article>
  )
}