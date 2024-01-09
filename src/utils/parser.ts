import { GraphData } from "../components/BarGraph";

export const parseModelData = (data: any): GraphData => {
  const featureList = data.find(
    (item: { insight_name: string }) => item.insight_name === "feature_list",
  );
  const variableRankingItems = data.filter(
    (item: { insight_name: string }) =>
      item.insight_name === "variable_ranking",
  );

  if (!featureList || !Array.isArray(featureList.value)) {
    throw new Error("Invalid data: Missing or invalid feature_list");
  }

  const keys = featureList.value;

  const values = variableRankingItems.map(
    (item: {
      value: { [s: string]: unknown } | ArrayLike<unknown> | null;
      origin: any;
    }) => {
      if (typeof item.value !== "object" || item.value === null) {
        throw new Error(
          "Invalid data: Missing or invalid value for variable_ranking item",
        );
      }

      const valueEntries = Object.entries(item.value).map(([key, value]) => {
        const floatValue = parseFloat(value as string);
        if (isNaN(floatValue)) {
          throw new Error(`Invalid data: Non-numeric value for key ${key}`);
        }

        return [key, (floatValue * 100).toFixed(2)];
      });

      return {
        origin: item.origin,
        ...Object.fromEntries(valueEntries),
      };
    },
  );

  return {
    keys,
    data: values,
  };
};
