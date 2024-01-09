import { useEffect, useState } from "react";
import { getModels } from "../../api/getModels";
import Loading from "../../components/Loading";
import ModelCard from "../../components/ModelCard";
import ShowError from "../../components/ShowError";

interface Model {
  model_name: string;
  model_type: string;
  model_version: number;
}

const Inventory = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getModels()
      .then((data) => {
        if (!data?.data) {
          throw new Error("No analysis for current model found");
        }
        setModels(data.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setModels([]);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ShowError message={error} />;
  }

  return (
    <div className="p-6 flex gap-6 flex-wrap w-full">
      {models.map((model: Model, idx: number) => {
        return (
          <div className="flex-1" key={idx}>
            <ModelCard
              link={`/analysis/${model.model_name}`}
              modelName={model.model_name}
              modelType={model.model_type}
              modelVersion={model.model_version}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Inventory;
