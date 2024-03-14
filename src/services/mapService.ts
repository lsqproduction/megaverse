import { IGoal, ICoord } from "../interfaces/interfaces"
import { appConfig } from "../appConfig"
import { CoordType } from "../enums/enums";


export class MapService {
    //get the goal map
    static async fetchGoalMap(): Promise<IGoal> {
        const { endpoints } = appConfig;

        try {
            const res = await fetch(endpoints.goalMap);
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
            }
            const goalMap: IGoal = await res.json() as IGoal;
            return goalMap;
        } catch (error) {
            throw error;
        }
    }


    //get the row, column coordinates from goal
    static getCoords(goalMap: IGoal): { polyCoords: ICoord[] } {
        try {
            const polyCoords: ICoord[] = [];
            const { POLYANET } = CoordType;

            goalMap.goal.forEach((row, i) => {
                row.forEach((coordType, j) => {
                    if (coordType === POLYANET) {
                        polyCoords.push({ row: i, column: j });
                    }
                });
            });

            return { polyCoords };
        } catch (error) {
            throw error;
        }
    }



    //todo: restart map

}