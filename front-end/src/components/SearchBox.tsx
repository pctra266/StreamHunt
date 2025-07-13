import {useRef} from "react"

interface SearchBoxProps{
    searchVideo: (value:string)=>void
}

const SearchBox = ({searchVideo}:SearchBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null); 

    const handleClick = () => {
      const value = inputRef.current?.value || "";
      searchVideo(value);        
    };
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex gap-2 mb-6 justify-center">
      <input
          ref={inputRef}
          type="text"
          placeholder="Enter topic..."
          className="px-3 py-2 rounded text-white w-full max-w-sm border border-white"
        />
        <button
          className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-neutral-700"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBox