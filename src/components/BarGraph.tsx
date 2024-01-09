import { ResponsiveBar } from "@nivo/bar";

export interface GraphProps {
  keys: string[];
  data: { origin: string; [key: string]: string }[];
}

const BarGraph = ({ data, keys }: GraphProps) => {
  return (
    <div className="overflow-auto">
      <div className="flex h-[500px] min-w-[500px]">
        <ResponsiveBar
          layout="horizontal"
          data={data}
          keys={keys}
          margin={{ right: 50, bottom: 50, left: 50 }}
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
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage",
            legendPosition: "middle",
            legendOffset: 40,
          }}
        />
      </div>
    </div>
  );
};

export default BarGraph;
