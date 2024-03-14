import { appConfig } from "./appConfig";
import { MapService } from "./services/mapService";
import { PolyanetPostService } from "./services/PolyanetPostService";

class Phase1 {
    static async run(): Promise<void> {
        const { endpoints, candidateId } = appConfig
        try {
            const goalMap = await MapService.fetchGoalMap();
            const { polyCoords } = await MapService.getCoords(goalMap);
            const { candidateId } = appConfig;


            await PolyanetPostService.post(polyCoords, 2000, candidateId)

        } catch (error) {
            throw error;
        }
    }
}

Phase1.run();

