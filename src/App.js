import {useContext, useEffect} from 'react'
import {AllContext} from './all-context'
import CurrencySelector from './components/currency-selector'
import Header from './components/header'

function App() {
  const {getCurrencies, getExchangeRate, setCurrentInput} = useContext(AllContext)
  
  useEffect(() => {
    getCurrencies()
    getExchangeRate()
  }, [])
  
  return (
    <div className="app" onClick={(e) => e.target.className !== 'currency-list-input' && setCurrentInput('')}>
      <h1>Currency Converter</h1>
      <Header />
      <CurrencySelector name="from" index={0}/>
      <CurrencySelector name="to" index={1}/>
    </div>
  );
}

export default App;
