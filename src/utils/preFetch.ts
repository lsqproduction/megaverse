import { MapService } from "../services/mapService";
import { appConfig } from "../appConfig";

export async function preFetch() {

    const goalMap = await MapService.fetchGoalMap();

    //Get the body data of the astros
    const { polyBodys, soloonBodys, comethBodys } = MapService.getBodys(goalMap);

    const { candidateId, endpoints } = appConfig;

    return { polyBodys, soloonBodys, comethBodys, candidateId, endpoints }
}