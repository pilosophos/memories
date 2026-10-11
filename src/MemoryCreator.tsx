import { useEffect, useRef, useState } from 'preact/hooks';
import type { Memory } from './types';

const MEMORY_COLORS = [
  'black',
  'white',
  'red',
  'yellow',
  'green',
  'blue',
  'brown',
  'grey',
  'purple',
  'pink',
  'orange',
  'teal',
];

export function MemoryCreator() {
  const [ memory, setMemory ] = useState('Me and dad on a sailboat');
  const [ bgColor, setBgColor ] = useState('black');

 const memoryText = useRef<HTMLDivElement>(null);

  function onMemoryChange (e) {
    let newMemory = e.target.textContent;
    if (newMemory === '') {
      newMemory = 'Write something here';
    }
    memoryText.current!.textContent = newMemory;
    setMemory(newMemory);
  };

  function onSubmitMemory() {
    const fullMemory = {
      memory,
      bgColor,
      creator: 'John Doe'
    } as Memory;

    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      body: new URLSearchParams(fullMemory).toString(),
    });
  }

  useEffect(() => {
    if (memory) {
      memoryText.current!.textContent = memory;
    }
  }, [memory]);

  return (
    <div className="text-white flex flex-col items-center p-5">
      <article className="w-80 m-5 p-5 shadow-md pb-15 bg-stone-100 rotate-1">
        <figure
          className="inset-shadow-sm inset-shadow-black/20 flex place-content-center bg-stone-300 aspect-square p-5 text-center transtion-colors duration-300"
          style={ {backgroundColor: bgColor} }
        >
          <div
            className="font-bold uppercase text-2xl h-fit"
            ref={memoryText}
            contentEditable={true}
            onBlur={onMemoryChange}
          />
        </figure>
      </article>

      <div>
        <header className="text-center text-lg italic font-bold mb-3">I remember it being more...</header>
        <div className="grid grid-cols-4 gap-2">
          { MEMORY_COLORS.map( color =>
            <div
              className="inline-block rounded-full w-15 aspect-square"
              style={ { backgroundColor: color } }
              onClick={ () => setBgColor(color) }
            ></div>
          )}
        </div>
      </div>

      <button onClick={ onSubmitMemory }>Submit</button>
    </div>
  )
}