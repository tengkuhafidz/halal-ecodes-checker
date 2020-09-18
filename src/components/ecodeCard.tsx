import React from 'react'
import { EcodeData } from '../utils/models'

interface Props {
  ecodeData: EcodeData
}

const EcodeCard: React.FC<Props> = ({ ecodeData: { ecode, halalStatus, category, whatIsIt, chemicalName } }) => (
  <div
    className={`grid-col-1 rounded-lg p-8  text-white shadow-lg hover:shadow-2xl ${
      halalStatus === 'Halal' ? 'bg-green-600' : 'bg-red-600'
    }`}
  >
    <h2 className="text-xl font-bold">
      e{ecode} - {halalStatus}
    </h2>
    <p className="mt-2 font-light">{chemicalName}</p>
    <p className="mt-4 font-light">
      {category}: {whatIsIt}
    </p>
  </div>
)

export default EcodeCard
