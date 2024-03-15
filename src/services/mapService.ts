import { IGoal, IBody, ISoloonBody, IComethBody } from "../interfaces/interfaces"
import { appConfig } from "../appConfig"
import { BodyType, Color, Direction } from "../enums/enums";
import { logger } from "../utils/logger";

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
            logger.error("failed to fetch goal map>>>", error);
            throw error;
        }
    }


    //get the body data for the fetch()
    static getBodys(goalMap: IGoal): { polyBodys: IBody[], soloonBodys: ISoloonBody[], comethBodys: IComethBody[] } {
        try {
            const { POLYANET, SOLOON, COMETH } = BodyType;
            const polyBodys: IBody[] = [];
            const soloonBodys: ISoloonBody[] = [];
            const comethBodys: IComethBody[] = [];

            goalMap.goal.forEach((row, i) => {

                row.forEach((bodyType, j) => {

                    if (bodyType === POLYANET) {
                        polyBodys.push({ row: i, column: j });
                    } else {
                        //check for soloon and cometh
                        const type = bodyType.split("_")[1];
                        if (type === SOLOON) {
                            const colorValue = bodyType.split("_")[0] as keyof typeof Color;
                            const color = Color[colorValue];
                            soloonBodys.push({ row: i, column: j, color })
                        }
                        if (type === COMETH) {
                            const directionValue = bodyType.split("_")[0] as keyof typeof Direction;
                            const direction = Direction[directionValue];
                            comethBodys.push({ row: i, column: j, direction });
                        }
                    }
                });
            });

            return { polyBodys, soloonBodys, comethBodys };
        } catch (error) {
            logger.error("failed to get the body data of the astro item>>>", error);
            throw error;
        }
    }
}