import React from 'react';
import Form from './form';
import Card from './card';
import { initVal, CardContext } from '../context/cardContext';

export default () => {
  const [cardState, setCardState] = React.useState(initVal);
  return (
    <div className='p-creditCardForm'>
      <CardContext.Provider value={{...cardState}}>
        <Card />
        <Form setCardState={setCardState} cardState={cardState}/>
      </CardContext.Provider>
    </div>
  )
}