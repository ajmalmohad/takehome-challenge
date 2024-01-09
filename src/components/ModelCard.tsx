import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';

interface ModelProps {
  link: string;
  modelName: string;
  modelType: string;
  modelVersion: number;
}

const ModelCard = ({
  link,
  modelName,
  modelType,
  modelVersion,
}: ModelProps) => {
  return (
    <Link to={link}>
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          'width': '100%',
          '&:hover': { boxShadow: 'md', borderColor: 'primary.400' },
        }}
      >
        <CardContent>
          <div className='flex justify-between items-center mb-2'>
            <Typography level="title-lg">
              {modelName}
            </Typography>
            <Typography level="body-sm">
              {modelType}
            </Typography>
          </div>
          <Chip
            variant="outlined"
            color="success"
            size="sm"
          >
            Version: {modelVersion}
          </Chip>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ModelCard;