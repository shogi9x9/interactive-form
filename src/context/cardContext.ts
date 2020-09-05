import React from 'react';

export interface cardState {
  cardNumber: string,
  holderName: string,
  cvv: string,
  expirationMonth: string,
  expirationYear: string,
  isFlipped: boolean,
  isInputFocused: boolean,
  elementFocused: string,
  setCardState?: object
}

export const initVal = {
  cardNumber: '',
  holderName: '',
  cvv: '',
  expirationMonth: '',
  expirationYear: '',
  isFlipped: false,
  isInputFocused: false,
  elementFocused: ''
}

export const CardContext = React.createContext({...initVal});
