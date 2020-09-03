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
    const cardNumberSection = this.getCardNumberSectoin();
    return (
      <div className='p-card'>
        <div className='p-card__top'>
          <img src='/chip.svg' alt='chip_logo'/>
          <img src='/visa_logo.svg' alt='visa_logo' className='p-card__top-visaLogo'/>
        </div>
        <div className='p-card__cardNumber'>
          {cardNumberSection}
        </div>
        <div className='p-card__content'>
          <div className='p-card__holderName'>
            <p className='p-card__holderName-label'>Card Holder</p>
            <p className='p-card__holderName-name'>FULL NAME</p>
          </div>
          <div className='p-card__expirationDate'>
            0424
          </div>
        </div>
      </div>
    )
  }

  private getCardNumberSectoin() {
    const cardNumberSection = [];
    for(let i = 0; i < 4; i++) {
      const cardNumberDigitBlock = []
      for(let j = 0; j < 4; j++) {
        cardNumberDigitBlock.push(
            <span className='p-card__cardNumber-digit'>#</span>
        );
      }
      cardNumberSection.push(
        <div className='p-card__cardNumber-block'>
          {cardNumberDigitBlock}
        </div>
      );
    }
    return cardNumberSection;
  }
}