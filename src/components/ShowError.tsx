import Typography from '@mui/joy/Typography';

const ShowError = ({ message }: {
    message: string;
}) => {
    return <div className='h-full w-full flex items-center justify-center'>
        <Typography
            color="danger"
            level="title-lg"
            variant="plain"
        >{message}
        </Typography>
    </div>;
}

export default ShowError;