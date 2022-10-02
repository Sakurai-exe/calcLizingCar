import { useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
  const [price, setPrice] = useState(3300000);
  const [initialPayment, setInitialPayment] = useState(429000);
  const [finalPercent, setFinalPercent] = useState(13);
  const priceChange = (e) => {
    if (e.target.value < 1000000) {
      setPrice(1000000);
    } else if (e.target.value > 6000000) {
      setPrice(6000000);
    } else {
      setPrice(e.target.value);
    }
  };
    const initialFinalPercent = (e) => {
      setFinalPercent(e.target.value);
      initialPaymentChange(e.target.value);
    };
  const initialPaymentChange = (e) => {
    const percent = e / 100;
    setInitialPayment(Math.round(price * percent));
  }

  return (
    <div className='App'>
      <div className='intro'>
        <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
      </div>
      <form className='wrap'>
        <div className='wrap__price'>
          <label htmlFor='price'>Стоимость автомобиля</label>
          <input
            type='number'
            value={price}
            maxLength='7'
            min='1000000'
            max='6000000'
            name='price'
            onChange={priceChange}
          />
          <input
            type='range'
            value={price}
            min='1000000'
            max='6000000'
            step='50000'
            name='price'
            onChange={priceChange}
          />
          <span className='required'>₽</span>
        </div>
        <div className='wrap__initialPayment'>
          <label htmlFor='initialPayment'>Первоначальный взнос</label>
          <input
            type='number'
            value={initialPayment}
            name='initialPayment'
            disabled
          />
          <input
            type='range'
            value={finalPercent}
            min='10'
            max='60'
            step='1'
            name='finalPercent'
            onChange={initialFinalPercent}
          />
          <span className='percent'>
            <input
              type='number'
              value={finalPercent}
              maxLength='2'
              min='10'
              max='60'
              name='finalPercent'
              onChange={initialFinalPercent}
            />
            <span className='percent_symbol'>%</span>
          </span>
        </div>
        <div className='wrap__term'>
          <label htmlFor='term'>Срок лизинга</label>
          <input
            type='number'
            // value={term}
            maxLength='2'
            min='1'
            max='60'
            name='term'
          />
          <input
            type='range'
            // value={term}
            min='1'
            max='60'
            step='1'
            name='term'
            // onChange={handleChange}
          />
          <span className='term__symbol'>мес.</span>
        </div>
      </form>
      {/* <div className='wrap'>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </div>
  );
}

export default App;