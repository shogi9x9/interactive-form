import React from 'react';
import './form.scss';

interface cardState {
  cardNumber: string
  holderName: string
  cvv: string
  expirationMonth: string
  expirationYear: string
  isFlipped: boolean
  isInputFocused: boolean
  elementFocused: string  
}

export default class Form extends React.Component<{}, cardState> {
  
  constructor(props: object) {
    super(props);
    this.state = {
      cardNumber: 'XXXX XXXX XXXX',
      holderName: 'Name',
      cvv: 'XXX',
      expirationMonth: 'XX',
      expirationYear: 'XX',
      isFlipped: false,
      isInputFocused: false,
      elementFocused: ''  
    };
  }

  render() {

    const monthOptions = [];
    for (let i = 1; i <= 12; i++) {
      monthOptions.push(
      <option value={i} key={`month_${i}`}>{i.toString().padStart(2, '0')}</option>
      )
    };
    monthOptions.unshift(<option value={'null'} key={'month_null'}>Month</option>)

    const yearOptions = [];
    const curr_year = new Date().getFullYear();
    for (let i = curr_year; i < curr_year + 10; i++) {
      yearOptions.push(
        <option value={i} key={`year_${i}`}>{i.toString()}</option>
      )
    }
    yearOptions.unshift(<option value={'null'} key={'year_null'}>Year</option>)

    return (
      <div className='p-form'>
        <div className='p-form__group'>
          <label htmlFor='cardNumber' className='p-form__label'>Card Number</label>
          <input type='text' id='cardNumber' className='p-form__input' autoComplete='off'/>
        </div>
        <div className='p-form__group'>
          <label htmlFor='holderName' className='p-form__label'>Card Holders</label>
          <input type='text' id='holderName' className='p-form__input' autoComplete='off'/>
        </div>

        <div className='p-form__group -flex'>
          <div className='p-form__subGroup -mr35'>
            <label htmlFor='expirationYear' className='p-form__label'>Expiration Date</label>
            <div className='p-form__selectBox -mr15'>
              <select id='expirationMonth' className='p-form__select -w150' placeholder='Month' defaultValue='null'>
                {monthOptions}
              </select>
            </div>
            <div className='p-form__selectBox'>
              <select id='expirationYear' className='p-form__select -w150' placeholder='Year' defaultValue='null'>
                {yearOptions}
              </select>
            </div>
          </div>
          <div className='p-form__subGroup'>
            <label htmlFor='cvv' className='p-form__label'>CVV</label>
            <input type='text' id='cvv' className='p-form__input -w150' autoComplete='off' maxLength={4} />
          </div>
        </div>

        <div className='p-form__group'>
          <button className='p-form__button'>Submit</button>
        </div>
      </div>
    )
  }
}