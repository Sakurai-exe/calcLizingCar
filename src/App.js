import { useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
  const [price, setPrice] = useState(3300000);
  const [initialPayment, setInitialPayment] = useState(429000);
  const [finalPercent, setFinalPercent] = useState(13);
  const [term, setTerm] = useState(60);
  const [sum, setSum] = useState(23452345234);
  const [monthPayment, setMonthPayment] = useState(115094);
  useEffect(() => {
    setMonthPayment(
      Math.round(
        (price - initialPayment) *
          ((0.035 * Math.pow(1 + 0.035, term)) /
            (Math.pow(1 + 0.035, term) - 1)),
      ),
    );
  }, [initialPayment, term]);

  useEffect(() => {
    setSum(initialPayment + term * monthPayment);
  }, [initialPayment, term, monthPayment]);

  const priceChange = (e) => {
    const newPercent = finalPercent / 100;
    if (e.target.value < 1000000) {
      setPrice(1000000);
      setInitialPayment(Math.round(1000000 * newPercent));
    } else if (e.target.value > 6000000) {
      setPrice(6000000);
      setInitialPayment(Math.round(6000000 * newPercent));
    } else {
      setPrice(e.target.value);
      setInitialPayment(Math.round(price * newPercent));
    }
  };

  const priceChangeAlways = (e) => {
    setPrice(e.target.value);
  };

  const finalPercentChange = (e) => {
    if (e.target.value < 10) {
      setFinalPercent(10);
      initialPaymentChange(10);
    } else if (e.target.value > 60) {
      setFinalPercent(60);
      initialPaymentChange(60);
    } else {
      setFinalPercent(e.target.value);
      initialPaymentChange(e.target.value);
    }
  };

  const finalPercentChangeAlways = (e) => {
    setFinalPercent(e.target.value);
  };

  const initialPaymentChange = (e) => {
    const percent = e / 100;
    setInitialPayment(Math.round(price * percent));
  };

  const termChange = (e) => {
    if (e.target.value < 1) {
      setTerm(1);
    } else if (e.target.value > 60) {
      setTerm(60);
    } else {
      setTerm(e.target.value);
    }
  };

  const termChangeAlways = (e) => {
    setTerm(e.target.value);
  };

  // const addCommas = (num) =>
  //   num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  // const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

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
            // pattern='^[ 0-9]+$'
            value={price}
            maxLength='7'
            min='1000000'
            max='6000000'
            name='price'
            onChange={priceChangeAlways}
            onBlur={priceChange}
          />
          <input
            type='range'
            value={price}
            min='1000000'
            max='6000000'
            step='50000'
            name='price'
            onChange={priceChangeAlways}
            onMouseLeave={priceChange}
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
            onChange={finalPercentChange}
          />
          <span className='percent'>
            <input
              type='number'
              value={finalPercent}
              maxLength='2'
              min='10'
              max='60'
              name='finalPercent'
              onChange={finalPercentChangeAlways}
              onBlur={finalPercentChange}
            />
            <span className='percent_symbol'>%</span>
          </span>
        </div>
        <div className='wrap__term'>
          <label htmlFor='term'>Срок лизинга</label>
          <input
            type='number'
            value={term}
            maxLength='2'
            min='0'
            max='60'
            name='term'
            onChange={termChangeAlways}
            onBlur={termChange}
          />
          <input
            type='range'
            value={term}
            min='1'
            max='60'
            step='1'
            name='term'
            onChange={termChangeAlways}
            onMouseLeave={termChange}
          />
          <span className='term__symbol'>мес.</span>
        </div>
      </form>
      <div className='wrap'>
        <div className='wrap__sum'>
          <label htmlFor='sum'>Сумма договора лизинга</label>
          <input type='number' value={sum} name='sum' disabled />
        </div>
        <div className='wrap__monthPayment'>
          <label htmlFor='monthPayment'>Ежемесячный платеж от</label>
          <input
            type='number'
            value={monthPayment}
            name='monthPayment'
            disabled
          />
        </div>
        <button>Оставить заявку</button>
      </div>
    </div>
  );
}

export default App;
