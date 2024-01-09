import { GraphProps } from "../components/BarGraph";

export interface DataItem {
  origin: string;
  value: string[] | { [key: string]: number };
  insight_name: string;
  name: string;
}

export const parseModelData = (data: DataItem[]): GraphProps => {
  const featureList = data.find(
    (item: DataItem) => item.insight_name === "feature_list",
  );
  const variableRankingItems = data.filter(
    (item: DataItem) => item.insight_name === "variable_ranking",
  );

  if (!featureList || !Array.isArray(featureList.value)) {
    throw new Error("Missing or invalid feature_list");
  }

  const keys = featureList.value;

  const values = variableRankingItems.map((item: DataItem) => {
    if (typeof item.value !== "object" || item.value === null) {
      throw new Error("Missing or invalid value for variable_ranking item");
    }

    const valueEntries = Object.entries(item.value).map(([key, value]) => {
      const floatValue = parseFloat(value as string);
      if (isNaN(floatValue)) {
        throw new Error(`Non-numeric value for key ${key}`);
      }

      return [key, (floatValue * 100).toFixed(2)];
    });

    return {
      origin: item.origin,
      ...Object.fromEntries(valueEntries),
    };
  });

  return {
    keys,
    data: values,
  };
};
