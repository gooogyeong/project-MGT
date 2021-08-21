// TODO: 라이브러리에저 제공되는 타입 없는지?
export type Node = {
  type: string;
  name: string;
  children: Node[];
  next: Node;
  prev: Node;
  parent: Node;
  data: string;
  attribs?: {
    src: string;
    alt: string;
  }
}

export type ExchRateAPIResPonse = {
  base_code: string;
  conversion_rates: Record<string, number>;
  documentation: string;
  result: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: number;
  time_next_update_unix: number;
  time_next_update_utc: number;
}
