import "./App.css";
import Books from './Books';
import Search from './Search';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI';

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await BooksAPI.getAll();
      setData(res)
    }
    getData();
  }, []);
  const updateShelf = e => {
    const updateData = async () => {
      const id = { id: e.target.id }
      await BooksAPI.update(id, e.target.value);
      const getData = async () => {
        const res = await BooksAPI.getAll();
        setData(res)
      }
      getData();
    }
    updateData();
  }
  const addBook = e => {
    const updateData = async () => {
      const id = { id: e.target.id }
      await BooksAPI.update(id, e.target.value);
      const getData = async () => {
        const res = await BooksAPI.getAll();
        setData(res)
      }
      getData();
    }
    updateData();
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
                <Books data={data} setData={setData} shelf={"currentlyReading"} updateShelf={updateShelf} />
                <Books data={data} setData={setData} shelf={"wantToRead"} updateShelf={updateShelf} />
                <Books data={data} setData={setData} shelf={"read"} updateShelf={updateShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </div>
        } />
        <Route path="/search" element={
          <Search setData={setData} addBook={addBook} />
        } />
      </Routes>
    </div>
  );
}

export default App;
