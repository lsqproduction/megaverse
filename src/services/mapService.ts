import { IGoal, ICoord, IData, ISoloonCoord, IComethCoord, ISoloonData, IComethData } from "../interfaces/interfaces"
import { appConfig } from "../appConfig"
import { CoordType, Color, Direction } from "../enums/enums";


export class MapService {
    //get the goal map
    static async fetchGoalMap(): Promise<IGoal> {
        const { endpoints } = appConfig;

        try {
            const res = await fetch(endpoints.goalMap);
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
            }
            return await res.json() as IGoal;

        } catch (error) {
            throw error;
        }
    }


    //get the row, column coordinates from goal
    static getCoords(goalMap: IGoal): { polyCoords: ICoord[], soloonCoords: ISoloonCoord[], comethCoords: IComethCoord[] } {
        try {
            const { POLYANET, SOLOON, COMETH } = CoordType;
            const polyCoords: ICoord[] = [];
            const soloonCoords: ISoloonCoord[] = [];
            const comethCoords: IComethCoord[] = [];

            goalMap.goal.forEach((row, i) => {

                row.forEach((coordType, j) => {

                    if (coordType === POLYANET) {
                        polyCoords.push({ row: i, column: j });
                    } else {
                        //check for soloon and cometh
                        const type = coordType.split("_")[1];
                        if (type === SOLOON) {
                            const colorValue = coordType.split("_")[0] as keyof typeof Color;
                            const color = Color[colorValue];
                            soloonCoords.push({ row: i, column: j, color })
                        };
                        if (type === COMETH) {
                            const directionValue = coordType.split("_")[0] as keyof typeof Direction;
                            const direction = Direction[directionValue];
                            comethCoords.push({ row: i, column: j, direction });
                        }
                    }
                });
            });

            return { polyCoords, soloonCoords, comethCoords };
        } catch (error) {
            throw error;
        }
    }



    //todo: restart map
    static async restart(goalMap: IGoal): Promise<void> {
        const { endpoints } = appConfig;

        async function deleteObj(endpoint: string, data: IData): Promise<Response> {
            return (fetch(endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }))
        };

        for (let i = 0; i < goalMap.goal.length; i++) {
            for (let j = 0; j < goalMap.goal[i].length; j++) {
                const data: IData = {
                    candidateId: appConfig.candidateId,
                    row: i,
                    column: j
                };
                const coordType = goalMap.goal[i][j];
                if (goalMap.goal[i][j] === CoordType.POLYANET) {
                    console.log("coordtype", goalMap.goal[i][j]);
                    const res = await deleteObj(endpoints.polyanets, data);
                    console.log("Deletion success!", data, res.status);
                };
                await new Promise(resolve => setTimeout(resolve, 500));
            };
        };
    }
}