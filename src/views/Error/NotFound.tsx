import { Button, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className='h-full w-full flex flex-col gap-4 items-center justify-center'>
            <Typography
                color="neutral"
                level="title-lg"
                variant="plain">
                404 Not Found
            </Typography>
            <Link to='/'>
                <Button variant="outlined" color="neutral">
                    Go Back
                </Button>
            </Link>
        </div>
    )
};

export default NotFound;