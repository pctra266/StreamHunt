import React from 'react'

interface SearchBoxProps{
    searchVideo: ()=>void
}

const SearchBox = ({searchVideo}:SearchBoxProps) => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 YouTube Video Search</h1>

      <div className="flex gap-2 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={searchVideo}
        >
          getRandomVideo
        </button>
      </div>

      
    </div>
  )
}

export default SearchBox