import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./Moviecard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <div className="tabs">
          <div className="tab">movies</div>
          <div className="tab">Favorites</div>
        </div>

        <div className="List">
          {data.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
