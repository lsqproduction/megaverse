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


export interface IBody {
  row: number;
  column: number;
}

export interface ISoloonBody extends IBody {
  color: Color;
}

export interface IComethBody extends IBody {
  direction: Direction;
}