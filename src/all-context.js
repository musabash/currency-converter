import React, {createContext, useState} from 'react'

const AllContext = createContext()

function AllContextProvider({children}) {
  const [exchangeCurrencies, setExchangeCurrencies] = useState(['GBP', 'USD'])
  const [result, setResult] = useState('')
  const [exchangeRate, setExchangeRate] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [error, setError] = useState('')
  const [values, setValues] = useState([1, ''])
  const [currentInput, setCurrentInput] = useState('')
  const [headerText, setHeaderText] = useState(['British Pound', 'United States Dollar'])

  const webAddress = process.env.REACT_APP_WEB_ADDRESS
  const apiKey = process.env.REACT_APP_API_KEY

  function getApiUsage() {
    const url = `https://free.currconv.com/others/usage?apiKey=${apiKey}`
    fetch(url)
      .then((response) => {
          if (response.ok) {
              return response.json()
          } else {
              throw new Error('Something went wrong.')
          }
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err)
      })
  }
  
  function getExchangeRate() {
    const query = `${exchangeCurrencies[0]}_${exchangeCurrencies[1]}`
    const url = `${webAddress}convert?q=${query}&compact=ultra&apiKey=${apiKey}`
    fetch(url)
      .then((response) => {
          if (response.ok) {
              return response.json()
          } else {
              return response.error
          }
      })
      .then((data) => setExchangeRate(data[query]))
      .catch((err) => {
        console.log(err)
      })
  }

  function getCurrencies() {
    const url = `${webAddress}currencies?apiKey=${apiKey}`
    fetch(url)
      .then((response) => {
          if (response.ok) {
              return response.json()
          } else {
              throw new Error('Something went wrong')
          }
      })
      .then((data) => {
        const currenciesArray = []
        for (let key in data.results) {
          currenciesArray.push(data.results[key]);
        }
        setCurrencies(currenciesArray.sort((a, b) => a.id > b.id ? 1 : -1))
      })
      .catch((err) => {
        console.log(err)
      })
  }
    
  function getCountries() {
    const url = `${webAddress}countries?apiKey=${apiKey}`
    console.log(url)
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
            throw new Error('Something went wrong')
        }
      })
      .then((data) => {
        const countriesArray = []
        for (let key in data.results) {
          countriesArray.push(data.results[key]);
        }
          setCountries(countriesArray)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function onChangeHandler(value, index) {
    let convertedValue = 0
    index === 0 ? convertedValue = value * exchangeRate : convertedValue = value / exchangeRate
    setValues(values.map((_, i) => i === index ? value : Number(convertedValue.toFixed(6))))
  }
    
  const value = {
    exchangeCurrencies,
    setExchangeCurrencies,
    result,
    setResult,
    searchQuery,
    setSearchQuery,
    countries,
    setCountries,
    error,
    setError,
    getCountries,
    getExchangeRate,
    currencies,
    getCurrencies,
    values,
    setValues,
    currentInput,
    setCurrentInput,
    exchangeRate,
    setExchangeRate,
    onChangeHandler,
    getApiUsage,
    headerText,
    setHeaderText
  }
  return (
    <AllContext.Provider value={value}>
        {children}
    </AllContext.Provider>
  )
}

export {AllContext, AllContextProvider}