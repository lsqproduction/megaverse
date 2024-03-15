import { IBody, ISoloonBody, IComethBody } from "../interfaces/interfaces";
import { logger } from "../utils/logger";

export class MorphServices {


    private static async sendRequest(method: string, endpoint: string, candidateId: string, postBody: IBody | ISoloonBody | IComethBody): Promise<void> {
        const data = this.constructPostBody(candidateId, postBody);
        try {
            await fetch(endpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (method === "POST") {
                logger.info(`Successfully posted to row ${postBody.row}, column ${postBody.column}`);
            } else if (method === "DELETE") {
                logger.info(`Successfully deleted from row ${postBody.row}, column ${postBody.column}`);
            }
        } catch (error) {
            if (method === "POST") {
                logger.error(`Error while posting to row ${postBody.row}, column ${postBody.column}: ${error}`);
            } else if (method === "DELETE") {
                logger.error(`Error while deleting from row ${postBody.row}, column ${postBody.column}: ${error}`);
            }
        }
    }

    private static constructPostBody(candidateId: string, postBody: IBody | ISoloonBody | IComethBody) {
        const { row, column } = postBody;

        if ("color" in postBody) {
            // Check for ISoloonBody
            const { color } = postBody;
            return { candidateId, row, column, color };
        } else if ("direction" in postBody) {
            // Check for IComethBody
            const { direction } = postBody;
            return { candidateId, row, column, direction };
        } else {
            // This is IBody
            return { candidateId, row, column };
        }
    }

    static async postSingle(endpoint: string, candidateId: string, postBody: IBody | ISoloonBody | IComethBody): Promise<void> {
        await this.sendRequest("POST", endpoint, candidateId, postBody);
    }

    static async deleteSingle(endpoint: string, candidateId: string, postBody: IBody | ISoloonBody | IComethBody): Promise<void> {
        await this.sendRequest("DELETE", endpoint, candidateId, postBody);
    }

    static async postMultiple(bodies: (IBody | ISoloonBody | IComethBody)[], delay: number, endpoint: string, candidateId: string): Promise<void> {
        for (const body of bodies) {
            await this.postSingle(endpoint, candidateId, body);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    static async deleteMultiple(bodies: (IBody | ISoloonBody | IComethBody)[], delay: number, endpoint: string, candidateId: string): Promise<void> {
        for (const body of bodies) {
            await this.deleteSingle(endpoint, candidateId, body);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
