import { useEffect, useRef, useState } from 'preact/hooks';
import type { Memory } from './types';
import { SERVER_URL } from './server-connection';
import slide1 from './assets/slide-1.png';
import slide2 from './assets/slide-2.png';
import submit from './assets/submit.png';

const MEMORY_COLORS = [
  'black',
  'red',
  'yellow',
  'green',
  'blue',
  'brown',
  'purple',
  'pink',
  'orange',
  'teal',
];

export function MemoryCreator() {
  const memoryPlaceholder = '[Click here to remember]';
  const [ memory, setMemory ] = useState(memoryPlaceholder);
  const [ bgColor, setBgColor ] = useState('black');
  const [ creator, setCreator ] = useState('');

  const canSubmit = (memory !== memoryPlaceholder) && (creator !== '');

  function reset() {
    setMemory(memoryPlaceholder);
    setBgColor('black');
    setCreator('');
  }

  const memoryText = useRef<HTMLDivElement>(null);

  function onMemoryChange (e) {
    let newMemory = e.target.textContent;
    if (newMemory === '') {
      newMemory = memoryPlaceholder;
    }
    memoryText.current!.textContent = newMemory;
    setMemory(newMemory);
  };

  function onSubmitMemory() {
    const fullMemory = {
      memory,
      bgColor,
      creator
    } as Memory;

    fetch(`${SERVER_URL}/submit`, {
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
    <div className="text-white text-lg md:h-full flex flex-col justify-center items-center p-5 gap-5 md:gap-10">
      <header className="text-center">
        <h1 className="font-extrabold text-3xl uppercase">Welcome to KPIFF!</h1>
        <p>Now screening: Your memories.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-10">
        <section>
          <header className="text-center italic mb-5">A precious of memory of mine is...</header>
          <figure className="flex items-center justify-center h-91 aspect-square">
            <img src={slide1} alt="Slide template" className="absolute z-20 w-90 pointer-events-none" />
            <div className="transition-colors duration-200 w-85 aspect-4/3 flex items-center justify-center p-20" style={ {backgroundColor: bgColor} }>
              <div
                className="text-center font-bold uppercase text-2xl h-fit w-49 z-10 opacity-80 overflow-hidden"
                ref={memoryText}
                contentEditable={true}
                onBlur={onMemoryChange}
              />
            </div>
          </figure>
        </section>
        <section>
          <header className="text-center italic mb-5">and I think it was more...</header>
          <div className="flex items-center justify-center md:h-91">
            <div className="grid grid-cols-5 md:grid-cols-2 gap-2">
              { MEMORY_COLORS.map( color =>
                <div
                  className="inline-block rounded-full w-15 aspect-square border border-black border-3"
                  style={ { backgroundColor: color, borderColor: color == 'black' ? 'rgba(255,255,255,.3)' : 'black' } }
                  onClick={ () => setBgColor(color) }
                ></div>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
        <label htmlFor="name" className="italic text-center">My name is</label>
        <input
          value={ creator }
          onChange={ e => setCreator((e.target as HTMLInputElement).value) }
          type="text"
          name="name"
          id="name"
          className="md:w-100 px-3 p-1 text-black bg-white rounded-md inset-shadow-sm inset-shadow-black/50" />
      </div>

      <div>
        <button
          disabled={ !canSubmit }
          onClick={ onSubmitMemory }
          className="px-8 py-3 flex bg-blue-800 disabled:bg-gray-800 hover:bg-blue-700 active:bg-blue-500 h-12 -rotate-1 hover:-rotate-2"
        >
          <img src={submit} alt="submit"/>
        </button>
      </div>
    </div>
  )
}