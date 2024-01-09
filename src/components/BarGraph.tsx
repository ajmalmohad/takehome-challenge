import { BarDatum, ResponsiveBar } from "@nivo/bar";

export interface GraphData {
  keys: string[];
  data: BarDatum[];
}

const BarGraph = ({ data, keys }: GraphData) => {
  return (
    <div className="overflow-auto">
      <div className="flex h-[500px] min-w-[500px]">
        <ResponsiveBar
          layout="horizontal"
          data={data}
          keys={keys}
          margin={{ right: 50, bottom: 50, left: 60 }}
          indexBy="origin"
          groupMode="grouped"
          colors={{ scheme: "set2" }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: true,
              translateX: 0,
              translateY: -20,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BarGraph;
