import { AppConfig } from "./interfaces/interfaces"

const candidateId = "64bad7d3-229f-4d06-a94a-c1f8ce45a622"
export const appConfig: AppConfig = {
  candidateId,
  endpoints: {
    goalMap: `https://challenge.crossmint.io/api/map/${candidateId}/goal`,
    polyanets: 'https://challenge.crossmint.io/api/polyanets',
    soloons: 'https://challenge.crossmint.io/api/soloons',
    comeths: 'https://challenge.crossmint.io/api/comeths',
  }

}