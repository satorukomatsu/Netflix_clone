import './App.css';
import Row from './component/Row'
import { requests } from './request';
import './assets/styles/Row.css';
import { Banner } from './component/Banner';
import { Nav } from './component/Nav';

function App() {
  return (
    <div className="App" style={{backgroundColor: "#000"}}>
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={"https://api.themoviedb.org/3"+requests.feachNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated" fetchUrl={"https://api.themoviedb.org/3"+requests.feactTopRated} />
      <Row title="Action Movies" fetchUrl={"https://api.themoviedb.org/3"+requests.feactActionMovies} />
      <Row title="Comedy Movies" fetchUrl={"https://api.themoviedb.org/3"+requests.feactComedyMovies} />
      <Row title="Horror Movies" fetchUrl={"https://api.themoviedb.org/3"+requests.feactHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={"https://api.themoviedb.org/3"+requests.feactRomanceMovies} />
      <Row title="Documentaries" fetchUrl={"https://api.themoviedb.org/3"+requests.feactDocumentMovies} />

    </div>
  );
}

export default App;