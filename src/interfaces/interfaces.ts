
export interface AppConfig {
  candidateId: string,
  endpoints: {
    goalMap: string,
    polyanets: string,
    soloons: string,
    comeths: string
  }
}

export interface IGoal {
  goal: string[][];
}


export interface ICoord {
  row: number;
  column: number;
}

export interface IData extends ICoord {
  candidateId: string;
}


