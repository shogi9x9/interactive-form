import React from 'react';
import './card.scss';
import './form.scss'
import CardNumberFormatter from '../module/cardNumberFormatter';
import CvvNumberFormat from '../module/cvvNumberFormatter';
import { CardContext } from '../context/cardContext';

export default (props: any) => {
  const monthOptions: Array<JSX.Element> = [];
  for (let i = 1; i <= 12; i++) {
    monthOptions.push(
      <option value={i} key={`month_${i}`}>{i.toString().padStart(2, '0')}</option>
    )
  };
  monthOptions.unshift(<option value={'default'} key={'month_null'}>Month</option>)

  const yearOptions: Array<JSX.Element> = [];
  const curr_year = new Date().getFullYear();
  for (let i = curr_year; i < curr_year + 10; i++) {
    yearOptions.push(
      <option value={i} key={`year_${i}`}>{i.toString()}</option>
    )
  }
  yearOptions.unshift(<option value={'default'} key={'year_null'}>Year</option>)

  const setCardNumber = (target: HTMLInputElement): void => {
    const { value } = target;
    const formattedValue = CardNumberFormatter.formatNumber(value);
    target.value = formattedValue;
    props.setCardState({...props.cardState, cardNumber: formattedValue.replace(/ /g, '')}); 
  }

  const setHolderName = (target: HTMLInputElement): void => {
    const { value } = target;
    props.setCardState({...props.cardState, holderName: value}); 
  }
  
  const setYear = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    let value = 'default';
    let selectedValue = event.target.value;
    if (!(selectedValue === 'default')) {
      value = selectedValue.substring(2, 4); 
    }
    props.setCardState({...props.cardState, expirationYear: value});
  }
  
  const setMonth = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    let value = 'default';
    let selectedValue = event.target.value;
    if (!(selectedValue === 'default')) {
      value = selectedValue;
    }
    props.setCardState({...props.cardState, expirationMonth: value});
  }
  
  const setCvv = (target: HTMLInputElement): void =>  {
    const { value } = target;
    const formattedValue = CvvNumberFormat.formatNumber(value);
    target.value = formattedValue;
    props.setCardState({...props.cardState, cvv: formattedValue}); 
  }

  const focusCvv = () => {
    props.setCardState({...props.cardState, isFlipped: true}); 
  }

  const blueCvv = () => {
    props.setCardState({...props.cardState, isFlipped: false}); 
  }

  return (
    <CardContext.Consumer>
      {
        () => {
          return (
            <div className='p-form'>
              <div className='p-form__group'>
                <label htmlFor='cardNumber' className='p-form__label'>Card Number</label>
                <input type='text' id='cardNumber' className='p-form__input' autoComplete='off'
                onChange={(e) => setCardNumber(e.target)}/>
              </div>
              <div className='p-form__group'>
                <label htmlFor='holderName' className='p-form__label'>Card Holders</label>
                <input type='text' id='holderName' className='p-form__input' autoComplete='off'
                onChange={(e) => setHolderName(e.target)}/>
              </div>

              <div className='p-form__group -flex'>
                <div className='p-form__subGroup -mr35'>
                  <label htmlFor='expirationYear' className='p-form__label'>Expiration Date</label>
                  <div className='p-form__selectBox -mr15'>
                    <select id='expirationMonth' className='p-form__select -w150' placeholder='Month' defaultValue='default'
                    onChange={(e) => setMonth(e)}>
                      {monthOptions}
                    </select>
                  </div>
                  <div className='p-form__selectBox'>
                    <select id='expirationYear' className='p-form__select -w150' placeholder='Year' defaultValue='default'
                    onChange={(e) => setYear(e)}>
                      {yearOptions}
                    </select>
                  </div>
                </div>
                <div className='p-form__subGroup'>
                  <label htmlFor='cvv' className='p-form__label'>CVV</label>
                  <input type='text' id='cvv' className='p-form__input -w150' autoComplete='off' maxLength={4}
                  onChange={(e) => setCvv(e.target)} onFocus={() => focusCvv()} onBlur={() => blueCvv()}/>
                </div>
              </div>

              <div className='p-form__group'>
                <button className='p-form__button'>Submit</button>
              </div>
            </div>
          )
        }
      }
    </CardContext.Consumer>
  )
}