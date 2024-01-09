import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnalysis } from "../../api/getAnalysis";
import Loading from "../../components/Loading";
import ShowError from "../../components/ShowError";
import BarGraph, { GraphProps } from "../../components/BarGraph";
import { Typography } from "@mui/joy";
import { parseModelData } from "../../utils/parser";

const Analysis = () => {
  const { modelName } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<GraphProps | null>(null);

  useEffect(() => {
    getAnalysis(modelName as string)
      .then((data) => {
        if (!data?.data?.[0]) {
          throw new Error("No analysis for current model found");
        }
        setAnalysis(parseModelData(data.data[0]));
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setAnalysis(null);
        setError(err.message);
        setLoading(false);
      });
  }, [modelName]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ShowError message={error} />;
  }

  if (!analysis) {
    return <ShowError message="No analysis for current model found" />;
  }

  return (
    <div className="p-6">
      <Typography level="title-lg">{modelName}</Typography>

      <BarGraph data={analysis.data} keys={analysis.keys} />
    </div>
  );
};

export default Analysis;
