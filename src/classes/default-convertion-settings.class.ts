import { ConvertionSettings } from "../interfaces/convertion-settings.interface";

export class DefaultConvertionSettings {
  private static settings: ConvertionSettings;

  public static default(): ConvertionSettings {
    return {
      dateFormat: 'DD/MM/YYYY',
      dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
      timezone: 'UTC',
      moneySettings: {
        decimals: 2,
        symbol: '€',
        symbolLocation: 'BEFORE',
      },
      numberSettings: {
        decimalSeperationSymbol: ',',
        digitSeperationSymbol: '.',
      },
    };
  }
}