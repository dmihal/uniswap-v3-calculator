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

function getTick(priceSqrt) {
  return new bn(Math.log(Math.pow(priceSqrt, 2)).toString())
    .div(new bn(Math.log(1.0001).toString()))
    .integerValue(0)
    .toString()
}

function App() {
  const [values, setValues] = useState({
    reserve0: '1',
    reserve1: '1',
    priceSqrt: encodePriceSqrt(1, 1),
    ratio: '1',
    tick: getTick(encodePriceSqrt(1, 1)),
  });

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
            ratio: values.reserve1 / e.target.value,
            tick: getTick(encodePriceSqrt(e.target.value, values.reserve1)),
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
            ratio: e.target.value / values.reserve0,
            tick: getTick(encodePriceSqrt(values.reserve0, e.target.value)),
          })}
        />
      </label>
      <div>Square root price (decimal): {values.priceSqrt}</div>
      <div>Square root price (Q64.96): {priceSqrtX96}</div>
      <div>Token 0 Price: {values.ratio} Token 1</div>
      <div>Token 1 Price: {1 / values.ratio} Token 0</div>
      <div>Tick: {values.tick}</div>
    </div>
  );
}

export default App;
