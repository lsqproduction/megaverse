import { ICoord, IData, IGoal, ISoloonCoord, ISoloonData, IComethCoord, IComethData } from "../interfaces/interfaces";

export class PostServices {
    private static constructPostData(candidateId: string, coordinate: ICoord | ISoloonCoord | IComethCoord) {

        const { row, column } = coordinate;

        if ("color" in coordinate) {
            //check for ISoloonCoord
            const { color } = coordinate;
            return { candidateId, row, column, color };
        } else if ("direction" in coordinate) {
            //check for IComethCoord
            const { direction } = coordinate;
            return { candidateId, row, column, direction };
        } else {
            //this is ICoord
            return { candidateId, row, column };
        }
    }

    static async postSingle(
        endpoint: string,
        candidateId: string,
        coordinate: ICoord
    ): Promise<void> {
        const postData = this.constructPostData(candidateId, coordinate)
        try {
            await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });
        } catch (error) {
            throw new Error(`Error while posting point to row ${coordinate.row}, column ${coordinate.column}: ${error}`);

        }
    }

    static async postMultiple(coordinates: ICoord[] | ISoloonCoord[] | IComethCoord[], delay: number, endpoint: string, candidateId: string): Promise<void> {

        for (const coord of coordinates) {
            try {
                await this.postSingle(endpoint, candidateId, coord);
                await new Promise(resolve => setTimeout(resolve, delay));

            } catch (error) {
                throw error;
            }
        }
    }
};
