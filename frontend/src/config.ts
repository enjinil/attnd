interface EnvConfig {
  GRAPHQL_API_URL: string;
}

const config = {
  GRAPHQL_API_URL: import.meta.env.VITE_GRAPHQL_API_URL as string,
} as EnvConfig;

export default config;
