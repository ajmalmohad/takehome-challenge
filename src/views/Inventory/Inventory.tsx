import { useEffect, useState } from "react";
import { getModels } from "../../api/getModels";
import Loading from "../../components/Loading";
import ModelCard from "../../components/ModelCard";
import ShowError from "../../components/ShowError";

interface Model {
  model_version: number;
  ts_start: number;
  ts_end: number;
  num_categorical: number;
  job_id: string;
  model_type: string;
  num_continuous: number;
  model_name: string;
  sk: string;
  ts_updated: number;
};

const Inventory = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getModels().then((data) => {
      setModels(data.data);
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ShowError message={error} />;
  }

  return (
    <div className="p-6 flex gap-6 flex-wrap w-full">
      {
        models.map((model: any, idx: number) => {
          return <div className="flex-1">
            <ModelCard
              key={idx}
              link={`/analysis/${model.model_name}`}
              modelName={model.model_name} modelType={model.model_type}
              modelVersion={model.model_version}
            />
          </div>
        })
      }
    </div>
  );
};

export default Inventory;