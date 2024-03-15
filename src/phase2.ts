import { appConfig } from "./appConfig";
import { MapService } from "./services/mapService";
import { PostServices } from "./services/postServices";

class Phase2 {

    static async run(): Promise<void> {
        try {
            //fetch the goal map
            const goalMap = await MapService.fetchGoalMap();

            //Get the coordinates of the polyants
            const { polyCoords, soloonCoords, comethCoords } = MapService.getCoords(goalMap);

            const { candidateId, endpoints } = appConfig;

            await PostServices.postMultiple(polyCoords, 1000, endpoints.polyanets, candidateId);
            await PostServices.postMultiple(soloonCoords, 1000, endpoints.soloons, candidateId);
            await PostServices.postMultiple(comethCoords, 1000, endpoints.comeths, candidateId);

        } catch (error) {
            console.error("Error in posting all the astro goodies", error);
            throw error;
        }
    }

}

Phase2.run();

