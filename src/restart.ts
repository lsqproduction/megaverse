import { MorphServices } from "./services/morphServices";
import { logger } from "./utils/logger";
import { preFetch } from "./utils/preFetch";

class Restart {
    static async run(): Promise<void> {
        try {
            logger.info("restarting");

            //preload the information needed to restart the map
            const { polyBodys, soloonBodys, comethBodys, candidateId, endpoints } = await preFetch();

            await MorphServices.deleteMultiple(polyBodys, 1000, endpoints.polyanets, candidateId);
            await MorphServices.deleteMultiple(soloonBodys, 1000, endpoints.soloons, candidateId);
            await MorphServices.deleteMultiple(comethBodys, 1000, endpoints.comeths, candidateId);

        } catch (error) {
            logger.error(`Error while running program clear map: ${error}`);

        }
    }
}

Restart.run();