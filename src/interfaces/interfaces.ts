import { Color, Direction } from "../enums/enums";
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

export interface ISoloonCoord extends ICoord {
  color: Color;
}

export interface IComethCoord extends ICoord {
  direction: Direction;
}

export interface ISoloonData extends IData {
  color: Color;
}

export interface IComethData extends IData {
  direction: Direction;
}
