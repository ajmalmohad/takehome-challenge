import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnalysis } from "../../api/getAnalysis";
import Loading from "../../components/Loading";
import ShowError from "../../components/ShowError";
import BarGraph, { GraphData } from "../../components/BarGraph";
import { Typography } from "@mui/joy";

const Analysis = () => {
  const { modelName } = useParams();

  if (!modelName) {
    return <ShowError message='No model name found' />;
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<GraphData | null>(null);

  let parseData = (data: any): GraphData => {
    let keys = data.filter((item: any) => item.insight_name === 'feature_list')[0].value;
    let values = data
      .filter((item: any) => item.insight_name === 'variable_ranking')
      .map((item: any) => ({
        origin: item.origin,
        ...Object.fromEntries(
          Object.entries(item.value).map(([key, value]) => [key, (parseFloat(value as string) * 100).toFixed(2)])
        )
      }));
    return {
      keys: keys,
      data: values
    }
  }

  useEffect(() => {
    getAnalysis(modelName).then((data) => {
      setAnalysis(parseData(data.data[0]));
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ShowError message={error} />;
  }

  if (!analysis) {
    return <ShowError message='No analysis found' />;
  }

  return (
    <div className="p-6">
      <Typography level="title-lg">{modelName}</Typography>
      <BarGraph data={analysis.data} keys={analysis.keys} />
    </div>
  )
}

export default Analysis;