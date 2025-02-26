import axios from 'axios';
import {
  ExchangeRateBCRResponse,
  ExchangeRateSUNATResponse,
  Period,
  ResponseEntity,
} from '../types';
import { ServerError } from '@softcodestudio/common';
import { format, parse } from 'date-fns';

export async function getExchangeRateUSDToPENBCR(
  from: string,
  to: string
): Promise<ResponseEntity<ExchangeRateBCRResponse>> {
  try {
    const USD_PEN_B_URL =
      'https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04637PD/json';
    const USD_PEN_S_URL =
      'https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04638PD/json';
    const { data: buyingData } = await axios.get(
      `${USD_PEN_B_URL}/${from}/${to}`
    );
    const { data: sellingData } = await axios.get(
      `${USD_PEN_S_URL}/${from}/${to}`
    );
    const data: ExchangeRateBCRResponse = {
      config: {
        title: 'Tipo de Cambio',
        series: [
          {
            name: 'Tipo de cambio - TC Interbancario (S/ por US$) - Compra y Venta',
            dec: '3',
          },
        ],
      },
      periods: [],
    };

    for (let i = 0; i < buyingData.periods.length; i++) {
      const period = buyingData.periods[i] as Period;
      const sellingPeriod = sellingData.periods[i] as Period;

      data.periods.push({
        name: period.name,
        values: [period.values[0], sellingPeriod ? sellingPeriod.values[0] : 0],
      });
    }

    return [data as ExchangeRateBCRResponse, null];
  } catch (error) {
    console.error(error);
    return [
      null,
      new ServerError(
        'Error fetching exchange rate - BCR Service not available'
      ),
    ];
  }
}

export async function getExchangeRateUSDToPENSUNAT(
  from: string
): Promise<ResponseEntity<ExchangeRateSUNATResponse>> {
  try {
    const USD_PEN_URL =
      'https://e-consulta.sunat.gob.pe/cl-at-ittipcam/tcS01Alias/listarTipoCambio';
    const _from = parse(from, 'yyyy-dd-MM', new Date());
    const year = new Date(_from).getFullYear();
    const month = new Date(_from).getMonth();
    const { data } = await axios.post(USD_PEN_URL, {
      anio: year,
      mes: month,
      token: new Date().getTime(),
    });
    const tc: ExchangeRateSUNATResponse = {
      config: {
        title: 'Tipo de Cambio',
        series: [
          {
            name: `Tipo de cambio - TC (S/ por US$) - Compra y Venta - ${year}`,
            dec: month.toString(),
          },
        ],
      },
      periods: {},
    };

    for (let i = 0; i < data.length; i++) {
      const { fecPublica, valTipo } = data[i] as {
        fecPublica: string;
        valTipo: string;
      };
      const date = format(parse(fecPublica, 'dd/MM/yyyy', new Date()), 'yyyy-dd-MM');

      if (tc.periods[date]) {
        tc.periods[date] = [tc.periods[date][0], Number(valTipo)];
      } else {
        tc.periods[date] = [Number(valTipo), 0];
      }
    }

    return [tc, null];
  } catch (error) {
    console.log(error);
    return [
      null,
      new ServerError(
        'Error fetching exchange rate - SUNAT Service not available'
      ),
    ];
  }
}
