import React from 'react';
import { CardContext } from '../context/cardContext';

export default class Card extends React.Component<{}, {}> {
  render() {
    return (
      <CardContext.Consumer>
        {
          (cardInfo) => {
            const cardNumberSection = this.getCardNumberSectoin(cardInfo.cardNumber);
            return(
              <div className={'p-card__box' + (cardInfo.isFlipped ? ' -active' : '')}>
                <div className='p-card__box-content'>
                  <div className='p-card'>
                    <div className='p-card__mask'/>
                    <div className='p-card__front'>
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
                          <p className='p-card__holderName-name'>{this.getHolderName(cardInfo.holderName)}</p>
                        </div>
                        <div className='p-card__expirationDate'>
                          <p className='p-card__expirationDate-label'>Expires</p>
                          <p className='p-card__expirationDate-date'>
                            {this.getMonth(cardInfo.expirationMonth)}
                            <span className='-half'>/</span>
                            {this.getYear(cardInfo.expirationYear)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-card__back'>
                    <div className='p-card__back-contentBox'>
                      <div className='p-card__mask-back'/>
                      <div className='p-card__back-content'>
                        <div className='p-card__band'/>
                        <div className='p-card__cvv-box'>
                          <p className='p-card__cvv-label'>CVV</p>
                          <p className='p-card__cvv-value'>{this.getCvv(cardInfo.cvv)}</p>
                        </div>
                        <div className='p-card__back-logoBox'>
                          <img src='/visa_logo.svg' alt='visa_logo' className='p-card__back-logo'/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      </CardContext.Consumer>
    )
  }

  private getCardNumberSectoin(cardNumber: string) {
    let cardNumberStr = cardNumber;
    cardNumberStr = cardNumberStr.replace(/ /g, '');
    for (let i = 0; i < 16 - cardNumber.length; i++) {
      cardNumberStr += '#';
    }
    const cardNumberSection = [];
    for(let i = 0; i < 4; i++) {
      const cardNumberDigitBlock = []
      for(let j = 0; j < 4; j++) {
        const isNum =  /\d/.test(cardNumberStr[i * 4 + j])
        if ((i === 1 || i === 2) && isNum) {
          cardNumberDigitBlock.push(
            <div className={'p-card__cardNumber-digitBox' + (isNum ? ' -active' : '')}>
              <span className='p-card__cardNumber-digitDefault' key={`digitDefault_${i * 4 + j}`}>
                {'#'}
              </span>
              <span className='p-card__cardNumber-digit p-cardNumber-secret' key={`digit_${i * 4 + j}`}>
                <span className='p-cardNumber-secret'>{'*'}</span>
              </span>
            </div>
          );
        } else {
          cardNumberDigitBlock.push(
            <div className={'p-card__cardNumber-digitBox' + (isNum ? ' -active' : '')}>
              <span className='p-card__cardNumber-digitDefault' key={`digitDefault_${i * 4 + j}`}>
                {'#'}
              </span>
              <span className='p-card__cardNumber-digit' key={`digit_${i * 4 + j}`}>
                {cardNumberStr[i * 4 + j]}
              </span>
            </div>
          );
        }
      }
      cardNumberSection.push(
        <div className='p-card__cardNumber-block' key={`digitBlock_${i}`}>
          {cardNumberDigitBlock}
        </div>
      );
    }
    return cardNumberSection;
  }

  private getHolderName(holderName: string): string {
    return this.getValue(holderName, 'FULL NAME')
  }

  private getMonth(monthStr: string): JSX.Element {
    if (monthStr === 'default') {
      monthStr = 'MM';
    } else if (monthStr.length === 1) {
      monthStr = '0' + monthStr;
    }
    const val = this.getValue(monthStr, 'MM');
    return (<span>{val}</span>);
  }

  private getYear(yearStr: string): JSX.Element {
    if (yearStr === 'default') {
      yearStr = 'YY';
    }
    const val = this.getValue(yearStr, 'YY');
    return (<span>{val}</span>);
  }

  private getCvv(cvv: string): string {
    let cvvStr = '';
    for (let i = 0; i < cvv.length; i++) {
      cvvStr += '*'
    }
    return cvvStr;
  }

  private getValue(valueStr: string, defaultStr: string): string {
    return !valueStr ? defaultStr : valueStr;
  }
}