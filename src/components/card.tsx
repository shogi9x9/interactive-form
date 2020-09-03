import React from 'react';
import './card.scss';

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

export default class Card extends React.Component<{}, cardState> {
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
      <div className='p-card'>
        <div className='p-card__top'>
          <img src='/chip.svg' alt='chip_logo'/>
          <img src='/visa_logo.svg' alt='visa_logo' className='p-card__top-visaLogo'/>
        </div>
      </div>
    )
  }
}