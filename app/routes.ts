import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/challenges.tsx"),
    route("savingtips", "./routes/savingtips.tsx")
] satisfies RouteConfig;
