import React, { useState } from 'react'
import Fuse from 'fuse.js'
import EcodeCard from './ecodeCard'
import { EcodeData } from '../utils/models'

interface Props {
  ecodesData: EcodeData[]
}

const Main: React.FC<Props> = ({ ecodesData }) => {

  const [searchTerm, setSearchTerm] = useState("")

  const getFuseSearchResult = (ecodesData: EcodeData[], searchTerm: string): EcodeData[] => {
    const options = {
      isCaseSensitive: false,
      findAllMatches: false,
      includeMatches: false,
      includeScore: false,
      useExtendedSearch: false,
      minMatchCharLength: 1,
      shouldSort: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      keys: ['ecode'],
    }

    const fuse: Fuse<any> = new Fuse(ecodesData, options)
    const fuseSearchResult = fuse.search(searchTerm)
    return fuseSearchResult.map((result) => result.item)
  }

  const filteredEcodesData = searchTerm ? getFuseSearchResult(ecodesData, searchTerm) : ecodesData

  const renderEcodes = () => {
    return filteredEcodesData.map(ecodeData => <EcodeCard ecodeData={ecodeData} />)
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
  }

  return (
    <div>
      <div className="max-w-md mx-auto my-8 text-center">
        
        <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="e.g. 100 (without the prefix `e`)" onChange={(e) => handleSearch(e)}/>
        <p className="mt-2 text-gray-600 text-sm">Information as obtained from <a href="https://docs.google.com/spreadsheets/d/1WaEuXn6U9p9f2GsIIHrT02dsOMK4fvZJ/edit#gid=1126081160" className="underline hover:text-gray-800">Islamic Religious Council of Singapore</a></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderEcodes()} 
      </div>
    </div>
    
  )
}

export default Main