import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'

const LoadingPage = ({reload}) => {
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={reload}
        
        >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
}

export default LoadingPage