export type Serie = {
  name: string;
  dec: string;
};

export type Config = {
  title: string;
  series: Array<Serie>;
};

export type Period = {
  name: string;
  values: Array<number>;
};

export type ExchangeRateBCRResponse = {
  config: Config;
  periods: Array<Period>;
};

export type ExchangeRateSUNATResponse = {
  config: Config;
  periods: Record<string, Array<number>>;
};

export type ResponseEntity<T> = [T, null] | [null, Error];
