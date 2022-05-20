import "./App.css";
import Books from './Books';
import Search from './Search';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI';

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [shelves, setShelves] = useState({});
  const shelvesInfo = [
    {
      shelfName: "currentlyReading",
      shelfDisplayName: "Currently Reading"
    },
    {
      shelfName: "wantToRead",
      shelfDisplayName: "Want To Read"
    },
    {
      shelfName: "read",
      shelfDisplayName: "Read"
    }, {
      shelfName: "none",
      shelfDisplayName: "None"
    }
  ]
  const getData = async () => {
    await BooksAPI.getAll().then(res => setData(res));
  }
  useEffect(() => {
    getData();
  }, []);
  const updateShelf = async e => {
    const id = { id: e.target.id }
    await BooksAPI.update(id, e.target.value).then(res => setShelves(res));
    getData();
  }
  const addBook = async e => {
    const id = { id: e.target.id }
    await BooksAPI.update(id, e.target.value).then(res => setShelves(res));
    getData();
    navigate("/")
  }
  return (
    <div className="app">
      <Routes>
        <Route excat path="/" element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Books shelvesInfo={shelvesInfo} data={data} shelf={"currentlyReading"} updateShelf={updateShelf} />
                <Books shelvesInfo={shelvesInfo} data={data} shelf={"wantToRead"} updateShelf={updateShelf} />
                <Books shelvesInfo={shelvesInfo} data={data} shelf={"read"} updateShelf={updateShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </div>
        } />
        <Route path="/search" element={
          <Search shelvesInfo={shelvesInfo} data={data} addBook={addBook} shelves={shelves} />
        } />
      </Routes>
    </div>
  );
}

export default App;
