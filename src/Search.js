import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';

const Search = ({ data, addBook, shelves, shelvesInfo }) => {
    const [searchInput, setSearchInput] = useState("");
    const [allBooks, setAllBooks] = useState([]);
    const [error, setError] = useState(false);
    if (shelves.length === undefined) {
        var firstState = {
            currentlyReading: [],
            read: [],
            wantToRead: []
        }
        data.map(book => {
            if (book.shelf === "currentlyReading") {
                firstState.currentlyReading.unshift(book.id)
            } else if (book.shelf === "read") {
                firstState.read.unshift(book.id)
            } else if (book.shelf === "wantToRead") {
                firstState.wantToRead.unshift(book.id)
            }
            return firstState;
        })
    }
    const getAllBooks = async (query) => {
        await BooksAPI.search(query).then((res) => {
            if (res.error) {
                setAllBooks([]);
                setError(true);
            } else {
                setAllBooks(res);
                setError(false);
                console.log(allBooks);
            }
        });
    }
    const handleChange = e => {
        setSearchInput(e.target.value)
        e.target.value.trim() !== "" && getAllBooks(e.target.value)
    }
    const checkShelf = book => {
        if ((shelves.length === undefined ? firstState : shelves).currentlyReading.includes(book.id)) {
            return "currentlyReading";
        } else if ((shelves.length === undefined ? firstState : shelves).read.includes(book.id)) {
            return "read";
        } else if ((shelves.length === undefined ? firstState : shelves).wantToRead.includes(book.id)) {
            return "wantToRead";
        } else {
            return "none";
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search"></Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={searchInput}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchInput !== "" && allBooks.map((book, index) => (
                            <li key={index}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 192,
                                                backgroundImage:
                                                    `url(${book.imageLinks && book.imageLinks.thumbnail})`,
                                            }}
                                        ></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={addBook} id={book.id} defaultValue={checkShelf(book)}>
                                                <option disabled>
                                                    Add to...
                                                </option>
                                                {
                                                    shelvesInfo.map((shelf, index) => (
                                                        <option key={index} value={shelf.shelfName}>{shelf.shelfDisplayName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
                                </div>
                            </li>
                        )
                        )
                    }
                </ol>
                {error && (
                    <div className="error-message">
                        <p>Sorry.. No Results Found</p>
                    </div>
                )}
            </div>
        </div >
    )
}
export default Search;