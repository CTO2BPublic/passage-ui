export const generateOptions = (data?: string[]) =>
  data?.map((item) => ({
    label: item,
    value: item,
  })) || [];
