import {useContext, useEffect, useState} from 'react'
import {AllContext} from '../all-context'

export default function CurrencyList({name, index}){
  const {currencies, searchQuery, currentInput, setSearchQuery, setCurrentInput, setExchangeCurrencies, exchangeCurrencies, getExchangeRate, onChangeHandler, exchangeRate, setHeaderText, headerText} = useContext(AllContext)
  const [currency, setCurrency] = useState(exchangeCurrencies[index])

  function currencyChooser(e, currencyName){
    const exCur = exchangeCurrencies.map((elm, i) => i === index ? e.target.name : elm)
    setExchangeCurrencies(exCur)
    setCurrency(e.target.name)
    setCurrentInput('')
    setHeaderText(() => headerText.map((elm, i) => i === index ? currencyName : elm))
    }
  useEffect(() => {
    getExchangeRate()
  }, [exchangeCurrencies])

  useEffect(() => {
    onChangeHandler(1, 0)
  }, [exchangeRate])

  return (
    <div className="currency-list-container">
      <input 
        className="currency-list-input"
        type="text" 
        value={currency}
        onClick={() => {
          setCurrentInput(name)
          setSearchQuery('')
        }} 
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setCurrency(e.target.value)
        }
        }/>
      {currentInput === name &&
        <div className="currency-list">
          {currencies.map((currency, index) => (currency.id + currency.currencyName).toLowerCase().includes(searchQuery.toLowerCase()) &&
          <input 
            className="currency"
            type="text"
            onClick={(e) => currencyChooser(e, currency.currencyName)}
            key={index}
            name={currency.id}
            defaultValue={`${currency.id} - ${currency.currencyName}`}/
          >)}
        </div>}
    </div>
  )
}

