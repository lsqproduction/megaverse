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

    static async postBatches(coordinates: ICoord[], delay: number, endpoint: string, candidateId: string): Promise<void> {

        //post batches
        //const batches: ICoord[][] =[];
        // for (let i = 0; i < coordinates.length; i += batchSize) {
        //     batches.push(coordinates.slice(i, i + batchSize));
        // }

        // // Process each batch in parallel
        // await Promise.all(batches.map(async batch => {
        //     for (const coord of batch) {
        //         try {
        //             await this.postSingle(endpoint, candidateId, coord);
        //         } catch (error) {
        //             throw error; // Rethrow the error if needed
        //         }
        //     }
        //     // Add delay between batches
        //     await new Promise(resolve => setTimeout(resolve, delay));


        //working code
        for (const coord of coordinates) {
            try {
                await this.postSingle(endpoint, candidateId, coord);
                await new Promise(resolve => setTimeout(resolve, delay));

            } catch (error) {
                throw error;
            }
        }
    }
}

