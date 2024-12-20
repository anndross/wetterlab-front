export const preparePlotData = (data: any[], baseConfig: any) =>
  data.map((item, index) => ({
    ...item,
    ...baseConfig[index],
  }));
