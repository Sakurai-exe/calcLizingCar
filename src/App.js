import { useCallback, useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [price, setPrice] = useState(3300000);
  const [initialPayment, setInitialPayment] = useState(429000);
  const [finalPercent, setFinalPercent] = useState(13);
  const [term, setTerm] = useState(60);
  const [sum, setSum] = useState(7334640);
  const [monthPayment, setMonthPayment] = useState(115094);
  const [visibleSum, setVisibleSum] = useState("7334640 ₽");
  const [visibleMonthPayment, setVisibleMonthPayment] = useState("115094 ₽");

  useEffect(() => {
    setInitialPayment(Math.trunc(price * (finalPercent / 100)));
    setMonthPayment(
      Math.trunc(
        (price - initialPayment) *
          ((0.035 * Math.pow(1 + 0.035, term)) /
            (Math.pow(1 + 0.035, term) - 1)),
      ),
    );
    setSum(initialPayment + term * monthPayment);
    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
    setVisibleMonthPayment(addCommas(removeNonNumeric(monthPayment)) /*+ " ₽"*/);
    setVisibleSum(addCommas(removeNonNumeric(sum)) /* + " ₽"*/);
  });
  const priceChangeAlways = (e) => {
    let newPercent = finalPercent / 100;
    let number = Math.trunc(e.target.value);
    let array = [...number.toString()].map(Number);
    if (array.length > 7 || e.target.value > 6000000) {
      setPrice(6000000);
      setInitialPayment(Math.trunc(6000000 * newPercent));
    } else if (array.length < 0 || e.target.value < 0) {
      setPrice(1000000);
      setInitialPayment(Math.trunc(1000000 * newPercent));
    } else {
      setPrice(e.target.value);
      setInitialPayment(Math.trunc(price * newPercent));
    }
  };

  const priceChangeCondition = (e) => {
    let newPercent = finalPercent / 100;
    if (!(e.target.value >= 1000000 && e.target.value <= 6000000)) {
      setPrice(1000000);
      setInitialPayment(Math.trunc(1000000 * newPercent));
    }
  };

  const finalPercentChangeAlways = (e) => {
    let number = e.target.value;
    let array = [...number.toString()].map(Number);
    if (array.length > 2 || number > 60) {
      setFinalPercent(60);
      initialPaymentChange(60);
    } else if (number < 0) {
      setFinalPercent(10);
      initialPaymentChange(10);
    } else {
      setFinalPercent(number);
      initialPaymentChange(number);
    }
  };

  const finalPercentCondition = (e) => {
    if (!(e.target.value >= 10 && e.target.value <= 60)) {
      setFinalPercent(10);
      initialPaymentChange(10);
    }
  };

  const initialPaymentChange = (e) => {
    const percent = e / 100;
    setInitialPayment(Math.trunc(price * percent));
  };

  const termChangeAlways = (e) => {
    let number = e.target.value;
    let array = [...number.toString()].map(Number);
    if (array.length > 2 || number > 60) {
      setTerm(60);
    } else if (number < 0) {
      setTerm(1);
    }
    else {
      setTerm(e.target.value);
    }
  };

  const termChangeCondition = (e) => {
    if (!(e.target.value >= 1 && e.target.value <= 60)) {
      setTerm(1);
    }
  };

  // const inputHover = (e) => { 
  //   e.currentTarget.style.backgroundColor = "#E1E1E1";
  // }

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
            required
            onChange={priceChangeAlways}
            onBlur={priceChangeCondition}
            // onMouseMove={inputHover}
          />
          <input
            type='range'
            value={price}
            min='1000000'
            max='6000000'
            step='50000'
            name='price'
            onChange={priceChangeAlways}
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
            id="not-editable"
          />
          <input
            type='range'
            value={finalPercent}
            min='10'
            max='60'
            step='1'
            name='finalPercent'
            onChange={finalPercentChangeAlways}
          />
          <span className='percent'>
            <input
              type='number'
              value={finalPercent}
              maxLength='2'
              min='10'
              max='60'
              name='finalPercent'
              required
              onChange={finalPercentChangeAlways}
              onBlur={finalPercentCondition}
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
            required
            onChange={termChangeAlways}
            onBlur={termChangeCondition}
          />
          <input
            type='range'
            value={term}
            min='1'
            max='60'
            step='1'
            name='term'
            onChange={termChangeAlways}
          />
          <span className='term__symbol'>мес.</span>
        </div>
      </form>
      <div className='wrap'>
        <div className='wrap__sum'>
          <label htmlFor='sum'>Сумма договора лизинга</label>
          <div className='flex-wrap'>
            <span className='flex-wrap__value'>
              {visibleSum}
              <span className='rur-symbol'>₽</span>
            </span>
          </div>
        </div>
        <div className='wrap__monthPayment'>
          <label htmlFor='monthPayment'>Ежемесячный платеж от</label>
          <span className='flex-wrap__value'>
            {visibleMonthPayment}
            <span className='rur-symbol'>₽</span>
          </span>
        </div>
        <button type='submit'>Оставить заявку</button>
      </div>
    </div>
  );
}

export default App;
