import React, { useState } from 'react';
import './App.css';
const bn = require('bignumber.js');

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

// returns the sqrt price as a 64x96
function encodePriceSqrt(reserve1, reserve0) {
  return new bn(reserve1.toString())
    .div(reserve0.toString())
    .sqrt()
    // .multipliedBy(new bn(2).pow(96))
    // .integerValue(3)
    .toString()
}

function App() {
  const [values, setValues] = useState({ reserve0: '1', reserve1: '1', priceSqrt: '1' });

  const priceSqrtX96 = bn(values.priceSqrt).multipliedBy(new bn(2).pow(96)).integerValue(3).toString();

  return (
    <div className="App">
      <label>
        Reserve 0
        <input
          value={values.reserve0}
          onChange={e => setValues({
            reserve0: e.target.value,
            reserve1: values.reserve1,
            priceSqrt: encodePriceSqrt(e.target.value, values.reserve1),
          })}
        />
      </label>
      <label>
        Reserve 1
        <input
          value={values.reserve1}
          onChange={e => setValues({
            reserve0: values.reserve0,
            reserve1: e.target.value,
            priceSqrt: encodePriceSqrt(values.reserve0, e.target.value),
          })}
        />
      </label>
      <div>Square root price (decimal): {values.priceSqrt}</div>
      <div>Square root price (Q64.96): {priceSqrtX96}</div>
    </div>
  );
}

export default App;
