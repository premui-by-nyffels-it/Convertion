export interface ConvertionSettings {
  dateFormat: string;
  dateTimeFormat: string;
  timezone: string;
  moneySettings: ConvertionMoneySettings;
  numberSettings: ConvertionNumberSettings;
}

export interface ConvertionMoneySettings {
  symbol: string;
  symbolLocation: moneySymbolLocationTypes;
  decimals: number;
}

export interface ConvertionNumberSettings {
  decimalSeperationSymbol: numberDecimalSeperationSymbolTypes;
  digitSeperationSymbol: numberDigitSeperationSymbolTypes;
}

export type moneySymbolLocationTypes = 'BEFORE' | 'AFTER';
export type numberDecimalSeperationSymbolTypes = '.' | ',';
export type numberDigitSeperationSymbolTypes = 'NONE' | '.' | ',';
