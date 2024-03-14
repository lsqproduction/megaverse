import { ICoord, IData, IGoal } from "../interfaces/interfaces";

export class PostServices {
    private static constructPostData(candidateId: string, coordinate: ICoord) {
        const data: IData = {
            candidateId,
            row: coordinate.row,
            column: coordinate.column
        }
        return data;
    }

    static async postSingle(
        endpoint: string,
        candidateId: string,
        coordinate: ICoord
    ): Promise<void> {
        const postData = this.constructPostData(candidateId, coordinate)
        console.log("postData- post single", postData);
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

    static async postBatchs(coordinates: ICoord[], delay: number, endpoint: string, candidateId: string): Promise<void> {
        const batchSize: number = 10;
        const batches: ICoord[][] = [];
        for (let i = 0; i < coordinates.length; i += batchSize) {
            batches.push(coordinates.slice(i, i + batchSize));
        };

        //post by batch
        console.log("batches...", batches)
        for (const batch of batches) {
            try {
                console.log("batch", batch);
                await Promise.all(batch.map(coordinates => {
                    console.log("polyposting", coordinates);
                    this.postSingle(endpoint, candidateId, coordinates)
                }));
                await new Promise(resolve => setTimeout(resolve, delay));
            } catch (error) {
                throw error;
            }
        }
    }
}