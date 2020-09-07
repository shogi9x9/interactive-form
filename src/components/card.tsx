import React from 'react';
import { CardContext } from '../context/cardContext';

export default () => {
  React.useEffect(() => {
    setBackgroundImage(process.env.PUBLIC_URL);
  }, [])
  return (
    <CardContext.Consumer>
      {
        (cardInfo) => {
          const cardNumberSection = getCardNumberSectoin(cardInfo.cardNumber);
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
                        <p className='p-card__holderName-name'>{getHolderName(cardInfo.holderName)}</p>
                      </div>
                      <div className='p-card__expirationDate'>
                        <p className='p-card__expirationDate-label'>Expires</p>
                        <p className='p-card__expirationDate-date'>
                          {getMonth(cardInfo.expirationMonth)}
                          <span className='-half'>/</span>
                          {getYear(cardInfo.expirationYear)}
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
                        <p className='p-card__cvv-value'>{getCvv(cardInfo.cvv)}</p>
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

const setBackgroundImage = (url_str: string): void => {
  let cardFront = document.getElementsByClassName('p-card')[0];
  let cardBack = document.getElementsByClassName('p-card__back')[0];
  let imageId = Math.floor(Math.random() * Math.floor(25)) + 1;
  cardFront.setAttribute('style', `background-image: url("${url_str}/images/${imageId}.jpeg");`);
  cardBack.setAttribute('style', `background-image: url("${url_str}/images/${imageId}.jpeg");`);
}

const getCardNumberSectoin = (cardNumber: string): JSX.Element[] => {
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
          <div className={'p-card__cardNumber-digitBox' + (isNum ? ' -active' : '')} key={`digitBox_${i * 4 + j}`}>
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
          <div className={'p-card__cardNumber-digitBox' + (isNum ? ' -active' : '')} key={`digitBox_${i * 4 + j}`}>
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

const getHolderName = (holderName: string): string => {
  return getValue(holderName, 'FULL NAME')
}

const getMonth = (monthStr: string): JSX.Element => {
  if (monthStr === 'default') {
    monthStr = 'MM';
  } else if (monthStr.length === 1) {
    monthStr = '0' + monthStr;
  }
  const val = getValue(monthStr, 'MM');
  return (<span>{val}</span>);
}

const getYear = (yearStr: string): JSX.Element => {
  if (yearStr === 'default') {
    yearStr = 'YY';
  }
  const val = getValue(yearStr, 'YY');
  return (<span>{val}</span>);
}

const getCvv = (cvv: string): string => {
  let cvvStr = '';
  for (let i = 0; i < cvv.length; i++) {
    cvvStr += '*'
  }
  return cvvStr;
}

const getValue = (valueStr: string, defaultStr: string): string => {
  return !valueStr ? defaultStr : valueStr;
}