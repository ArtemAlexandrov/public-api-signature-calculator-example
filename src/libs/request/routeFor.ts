export const routeFor = (
  url: string,
  options?: Record<string, any>
) => {
  return Object.keys(options || {}).reduce(
    (
      route: string,
      value
    ) =>
      route.includes(value)
        ? route.replace(`{${value}}`, options?.[value])
        : route,
    url
  );
};
