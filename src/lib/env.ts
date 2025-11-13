export const getServerBuildEnv = (): string => {
  return (
    process.env.NEXT_BUILD_ENV ||
    process.env.NEXT_PUBLIC_BUILD_ENV ||
    "local"
  );
};

export const isLocalServerEnv = (): boolean => getServerBuildEnv() === "local";
