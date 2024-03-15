import { appConfig } from "./appConfig";
import { MapService } from "./services/mapService";
import { PolyanetPostService } from "./services/PolyanetPostService";

class Phase1 {

    static async run(): Promise<void> {
        try {
            //fetch the goal map
            const goalMap = await MapService.fetchGoalMap();

            //Get the coordinates of the polyants
            const { polyCoords } = MapService.getCoords(goalMap);


            const { candidateId } = appConfig;

            await PolyanetPostService.post(polyCoords, 1000, candidateId)

        } catch (error) {
            console.error("Error in posting polyanets", error);
            throw error;
        }
    }

}

Phase1.run();

