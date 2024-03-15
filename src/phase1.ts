import { appConfig } from "./appConfig";
import { MapService } from "./services/mapService";
import { MorphServices } from "./services/morphServices";
import { logger } from "./utils/logger";

class Phase1 {

    static async run(): Promise<void> {
        try {
            logger.info("starting phase1");
            //fetch the goal map
            const goalMap = await MapService.fetchGoalMap();

            //Get the coordinates of the polyanets
            const { polyBodys } = MapService.getBodys(goalMap);

            const { candidateId, endpoints } = appConfig;

            await MorphServices.postMultiple(polyBodys, 1000, endpoints.polyanets, candidateId);

        } catch (error) {
            logger.error("Error in posting polyanets", error);
            throw error;
        }
    }

}

Phase1.run();

