import CircularProgress from "@mui/joy/CircularProgress";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <CircularProgress
        color="success"
        determinate={false}
        size="sm"
        variant="outlined"
      />
    </div>
  );
};

export default Loading;
