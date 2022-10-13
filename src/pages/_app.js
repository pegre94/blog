import '../styles/globals.css';
import { StyledEngineProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />;
    </StyledEngineProvider>
  )
}

export default MyApp;
