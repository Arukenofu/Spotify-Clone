import type {UserConfig} from "vite";

export default {
    cors: {
        origin: 'http://localhost:5174'
    }
} satisfies UserConfig['server']