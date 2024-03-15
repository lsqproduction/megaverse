import { MapService } from "./services/mapService";
import { logger } from "./utils/logger";

class Restart {
    static async run(): Promise<void> {
        try {
            logger.info("restarting");
            const goalMap = await MapService.fetchGoalMap();
            await MapService.restart(goalMap);
        } catch (error) {
            logger.error(`Error while running program clear map: ${error}`);

        }
    }
}

Restart.run();