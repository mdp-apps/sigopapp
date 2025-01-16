import { format, FormatOptions, parseISO, ParseISOOptions } from "date-fns";

import { toDate, ToDateOptionsWithTZ } from "date-fns-tz";
import { es } from "date-fns/locale";


export class DateAdapter {
  static format(
    date: Date | number | string,
    stringFormat: string,
    options: FormatOptions = { locale: es }
  ): string {
    let formatDate = new Date(date);

    if (typeof date === "string") {
      formatDate = DateAdapter.parseISO(date);
    }

    const dateInTimeZone = DateAdapter.toDate(formatDate);

    return format(new Date(dateInTimeZone), stringFormat, options);
  }

  static parseISO(argument: string, options?: ParseISOOptions<Date>): Date {
    return parseISO(argument, options);
  }

  static toDate(
    date: Date | string | number,
    options?: ToDateOptionsWithTZ
  ): Date {
    return toDate(date, {
      timeZone: "America/Santiago",
      ...options,
    });
  }
}
