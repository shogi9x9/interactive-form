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
            <select id='expirationMonth' className='p-form__select -w150 -mr15' placeholder='Month'>
              <option value='1'>01</option>
            </select>
            <select id='expirationYear' className='p-form__select -w150' placeholder='Year'>
              <option value='1'>01</option>
            </select>
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