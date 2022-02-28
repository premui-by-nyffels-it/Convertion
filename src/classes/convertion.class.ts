import moment = require('moment-timezone');
import { ConvertionSettings } from '../interfaces/convertion-settings.interface';
import { DefaultConvertionSettings } from './default-convertion-settings.class';

export class Convertion {
  private _settings: ConvertionSettings;
  public set settings(settings: ConvertionSettings) {
    if (!settings) throw new Error('Settings are required to set the settings!');

    if (settings.dateFormat) {
      if (moment(new Date(), settings.dateFormat, true).isValid()) {
        this._settings.dateFormat = settings.dateFormat;
      } else {
        throw new Error('The given date format is invalid!');
      }
    }

    if (settings.dateTimeFormat) {
      if (moment(new Date(), settings.dateTimeFormat, true).isValid()) {
        this._settings.dateTimeFormat = settings.dateTimeFormat;
      } else {
        throw new Error('The given date time format is invalid!');
      }
    }

    if (settings.moneySettings) this._settings.moneySettings = settings.moneySettings;
    if (settings.numberSettings) this._settings.numberSettings = settings.numberSettings;
  }
  public get settings() {
    return this._settings;
  }

	/**
	 * @param settings Use the wanted convertion settings. If none or null is given, it will take the default settings defined in DefaultConvertionSettings. 
	 */
  constructor(settings: ConvertionSettings = DefaultConvertionSettings.default()) {
    if (settings == null) {
      this._settings = DefaultConvertionSettings.default();
    } else {
      this._settings = settings;
    }
  }

  /**
   *
   * @description Convert a date object to a date string.
   * @param date The date that has to be converted.
   * @returns Return a date formatted string, if the given value is null or undefined it will return an empty string. Be aware is the date is not of object Date or invalid, it will throw an error.
   */
  public convertDateToDateString(date: Date): string {
    if (!date) return '';
    if (!(date instanceof Date)) throw new Error('The given value is not of type date!');
    if (!moment(date).isValid()) throw new Error('The given date is not valid!');

    return moment(date).format(this._settings.dateFormat);
  }

  /**
   *
   * @description Convert a date object to a date time string.
   * @param date The date that has to be converted.
   * @param timezone Enable the use of a timezone.
   * @returns Return a date formatted string, if the given value is null or undefined it will return an empty string. Be aware is the date is not of object Date or invalid, it will throw an error.
   */
  public convertDateToDateTimeString(date: Date, timezone: boolean = true): string {
    if (!date) return '';
    if (!(date instanceof Date)) throw new Error('The given value is not of type date!');
    if (!moment(date).isValid()) throw new Error('The given date is not valid!');

    return timezone ? moment(date).tz(this._settings.timezone).format(this._settings.dateTimeFormat) : moment(date).format(this._settings.dateTimeFormat);
  }

  /**
   *
   * @description Convert a number to a readable number string.
   * @param value The number that will be converted.
   * @returns Return a formatted number string. Format is determined based on the current number settings.
   */
  public convertNumberToNumberString(value: number): string {
    if (value === null || value === undefined) return '';
    if (isNaN(+value)) throw new Error('The given value is not a valid number!');

    value = +value;

    let isNegative: boolean = false;
    if (value < 0) {
      isNegative = true;
      value = Math.abs(value);
    }

    let devidedNumber = value.toString().split('.');
    let wholeNumber: string = Array.from(chunk(Array.from(devidedNumber[0]).reverse().join(''), 3).join(this._settings.numberSettings.digitSeperationSymbol))
      .reverse()
      .join('');

    if (isNegative) wholeNumber = '-' + wholeNumber;
    if (devidedNumber.length > 1) {
      return wholeNumber + this._settings.numberSettings.decimalSeperationSymbol + devidedNumber[1];
    } else {
      return wholeNumber;
    }

    function chunk(str: string, n: number): string[] {
      var ret = [];
      var i;
      var len;

      for (i = 0, len = str.length; i < len; i += n) {
        ret.push(str.substr(i, n));
      }

      return ret;
    }
  }

  /**
   * @description Convert a number to a money string.
   * @param value The number that will be converted.
   * @returns Return a formatted money string. Format is determined on the current number and money settings.
   */
  public convertNumberToMoneyString(value: number): string {
    if (value === null || value === undefined) return '';

    switch (this._settings.moneySettings.symbolLocation) {
      case 'BEFORE':
        return this._settings.moneySettings.symbol + this.convertNumberToNumberString(+value.toFixed(this._settings.moneySettings.decimals));
      case 'AFTER':
        return this.convertNumberToNumberString(+value.toFixed(this._settings.moneySettings.decimals)) + this._settings.moneySettings.symbol;
    }
  }

  /**
   *
   * @description Convert a date object to a date string.
   * @param date The date that has to be converted.
   * @param setting The settings for the by user preffered values
   * @returns Return a date formatted string, if the given value is null or undefined it will return an empty string. Be aware is the date is not of object Date or invalid, it will throw an error.
   */
  public static convertDateToDateString(settings: ConvertionSettings = null, date: Date): string {
    if (!settings) settings = DefaultConvertionSettings.default();

    const convertionClass = new Convertion(settings);
    return convertionClass.convertDateToDateString(date);
  }

  /**
   *
   * @description Convert a date object to a date time string.
   * @param date The date that has to be converted.
   * @param timezone Enable the use of a timezone.
   * @param setting The settings for the by user preffered values
   * @returns Return a date formatted string, if the given value is null or undefined it will return an empty string. Be aware is the date is not of object Date or invalid, it will throw an error.
   */
  public static convertDateToDateTimeString(settings: ConvertionSettings = null, date: Date, timezone: boolean = true): string {
    if (!settings) settings = DefaultConvertionSettings.default();

    const convertionClass = new Convertion(settings);
    return convertionClass.convertDateToDateTimeString(date, timezone);
  }

  /**
   *
   * @description Convert a number to a readable number string.
   * @param value The number that will be converted.
   * @param setting The settings for the by user preffered values
   * @returns Return a formatted number string. Format is determined based on the current number settings.
   */
  public static convertNumberToNumberString(settings: ConvertionSettings = null, value: number): string {
    if (!settings) settings = DefaultConvertionSettings.default();

    const convertionClass = new Convertion(settings);
    return convertionClass.convertNumberToNumberString(value);
  }

  /**
   * @description Convert a number to a money string.
   * @param value The number that will be converted.
   * @param setting The settings for the by user preffered values
   * @returns Return a formatted money string. Format is determined on the current number and money settings.
   */
  public static convertNumberToMoneyString(settings: ConvertionSettings = null, value: number): string {
    if (!settings) settings = DefaultConvertionSettings.default();

    const convertionClass = new Convertion(settings);
    return convertionClass.convertNumberToNumberString(value);
  }
}