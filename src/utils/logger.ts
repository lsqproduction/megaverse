import pino from "pino";

export const logger = pino({
    name: "megaverse",
    level: "debug"
})