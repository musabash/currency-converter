import React, {useContext} from 'react'
import {AllContext} from '../all-context'
import CurrencyList from './currency-list'

export default function CurrencySelector({name, index}){
  const { values, onChangeHandler } = useContext(AllContext)

  const keyDownHandler = (e) => {
    if(e.key === "-"){
      e.preventDefault();
    }
  }
  
  return (
    <div className="currency-selector">
      <input
        type="number"
        min="0"
        onKeyDown={keyDownHandler}
        value={values[index]}  
        onChange={(e) => onChangeHandler(e.target.value, index)}
      />
      <CurrencyList name={name} index={index}/>
    </div>
  )
}