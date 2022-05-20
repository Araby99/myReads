const Books = ({ data, shelf, updateShelf, shelvesInfo }) => {
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
                                                    `url(${book.imageLinks && book.imageLinks.thumbnail})`,
                                            }}
                                        ></div>
                                        <div className="book-shelf-changer">
                                            <select defaultValue={shelf} onChange={updateShelf} id={book.id}>
                                                <option value="none" disabled>
                                                    Move to...
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
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default Books;