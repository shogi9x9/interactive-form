export default class CardNumberFormatter {
  static formatNumber(value: string): string {
    const cardNumber = value.replace(/[^0-9]/g, '').substring(0, 16);
    const length = cardNumber.length;
    if(length < 4) {
      return cardNumber;
    } else {
      let formattedValue = '';
      for (let i = 0; i < length / 4; i++) { 
        formattedValue += cardNumber.slice(i * 4, 4 + i * 4);
        const partialLength = cardNumber.slice(i * 4, 4 + i * 4).length;
        if (i !== 3 && partialLength === 4 && i * 4 + partialLength !== length) {
          formattedValue += ' '
        }
      }
      if (formattedValue[-1] === ' ') {
        formattedValue = formattedValue.slice(0, formattedValue.length - 1);
      }
      return formattedValue;
    }
  }
}