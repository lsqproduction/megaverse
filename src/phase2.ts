import { MorphServices } from "./services/morphServices";
import { logger } from "./utils/logger";
import { preFetch } from "./utils/preFetch";

class Phase2 {

    static async run(): Promise<void> {
        try {
            logger.info("starting phase 2");

            //preload the information needed to start posting
            const { polyBodys, soloonBodys, comethBodys, candidateId, endpoints } = await preFetch();

            await MorphServices.postMultiple(polyBodys, 1000, endpoints.polyanets, candidateId);
            await MorphServices.postMultiple(soloonBodys, 1000, endpoints.soloons, candidateId);
            await MorphServices.postMultiple(comethBodys, 1000, endpoints.comeths, candidateId);

        } catch (error) {
            logger.error("Error in posting all the astro goodies", error);
            throw error;
        }
    }

}

Phase2.run();

