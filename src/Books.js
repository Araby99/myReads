const Books = ({ data, shelf, updateShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{(shelf.charAt(0).toUpperCase() + shelf.slice(1)).split(/(?=[A-Z])/).join(" ")}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        data.filter(book => book.shelf === shelf).map((book, index) => (
                            <li key={index}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 192,
                                                backgroundImage:
                                                    `url(${book.imageLinks.thumbnail})`,
                                            }}
                                        ></div>
                                        <div className="book-shelf-changer">
                                            <select defaultValue={shelf} onChange={updateShelf} id={book.id}>
                                                <option value="none" disabled>
                                                    Move to...
                                                </option>
                                                <option value="currentlyReading">
                                                    Currently Reading
                                                </option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default Books;