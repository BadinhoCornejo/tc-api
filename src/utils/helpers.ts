import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function isNullOrUndefined(v: any) {
  let r = false;

  if (v === null || v === undefined || v === 'null' || v === 'undefined')
    r = true;

  return r;
}

export const parseDateAndTime = (date: string): string =>
  format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: es });
