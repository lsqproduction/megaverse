import { appConfig } from "../appConfig";
import { ICoord } from "../interfaces/interfaces";
import { PostServices } from "./postServices";
import { logger } from "../utils/logger";

export class PolyanetPostService extends PostServices {
    static async post(polyCoords: ICoord[], delay: number, candidateId: string): Promise<void> {
        try {
            logger.info("calling Polyanet post")

            await super.postBatches(polyCoords, delay, appConfig.endpoints.polyanets, candidateId);
        } catch (error) {
            throw error;
        }
    }
}