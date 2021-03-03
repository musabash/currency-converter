import {useContext} from 'react'
import {AllContext} from '../all-context'

export default function Header() {
  const {exchangeCurrencies, exchangeRate, headerText} = useContext(AllContext)
  return (
    <div className="header">
      <h4>1 {headerText[0]} equals</h4>
      <h3>{exchangeRate} {headerText[1]}</h3>
    </div>
  )
}