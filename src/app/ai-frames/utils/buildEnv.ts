declare global {
  interface Window {
    __NEXT_BUILD_ENV__?: string;
  }
}

const resolveEnvValue = (): string => {
  if (typeof window !== "undefined" && window.__NEXT_BUILD_ENV__) {
    return window.__NEXT_BUILD_ENV__;
  }

  if (process.env.NEXT_PUBLIC_BUILD_ENV) {
    return process.env.NEXT_PUBLIC_BUILD_ENV;
  }

  if (process.env.NEXT_BUILD_ENV) {
    return process.env.NEXT_BUILD_ENV;
  }

  return "local";
};

export const getBuildEnv = (): string => resolveEnvValue();

export const isLocalBuildEnv = (): boolean => getBuildEnv() === "local";

export const isCloudBuildEnv = (): boolean => getBuildEnv() === "cloud";

export {};
