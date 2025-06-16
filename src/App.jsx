import { Routing } from './routes/Routing';
import SessionProvider from './context/sessionProvider';
import FavoritesProvider from './context/FavoritesProvider';


function App() {


  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  )
}

export default App
