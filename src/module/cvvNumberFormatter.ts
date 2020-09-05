export default class CvvNumberFormatter {
  static formatNumber(value: string): string {
    return value.replace(/[^0-9]/g, '').substring(0, 4);
  }
}