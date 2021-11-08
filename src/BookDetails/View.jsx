import React from 'react';
import "./bookDetails.css"

class BookDetailsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        error: null,
        isLoaded: false,
        bookTitle: "",
        bookAuthors: [],
        userName: ""
    }
    this.getBookDataUrl = this.getBookDataUrl.bind(this);
    this.fetchBookDataById = this.fetchBookDataById.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveBookToFavorites = this.saveBookToFavorites.bind(this);
  }

  getBookDataUrl() {
    return `https://gutendex.com/books/${this.props.bookId}`;
  }

  fetchBookDataById() {
      const url = this.getBookDataUrl();
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                isLoaded: true,
                bookTitle: result.title,
                bookAuthors: result.authors
            });
        },

        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    )
  }

  fetchDataToReturnToBookList() {
    const url = this.getBookDataUrl();
    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                isLoaded: true,
                bookTitle: result.title,
                bookAuthors: result.authors
            });
        },

        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    )
  }

  saveBookToFavorites(id, bookTitle, userName) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, title: bookTitle, userName: userName})
  };
  fetch('http://localhost:3001/favorites', requestOptions)
      .then(response => response.json())
      this.handleSubmit()
  }

  handleChange(event) {
    this.setState({userName: event.target.value});
  }

  handleSubmit() {
    this.setState({userName: ""})
  }
 
  componentDidMount() {
    this.fetchBookDataById();
  }

  render() {
    const { error, isLoaded, bookTitle, bookAuthors, userName } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <div className="book-details">
            <div className="heading">{bookTitle}</div>
            <div className="authors-container">
              {(bookAuthors.length > 0) ? <div className="by">by</div> : null}
            {bookAuthors.map(author => {
              return (bookAuthors.length === 1) ? <div className="authors">{author.name}</div> : <div >{`${author.name}, `}</div>
            })}
          </div>
            <div className="cover-photo-container">
            <div className="cover-photo">Cover photo</div>
            </div>
            <div className="favorite-form-container">

          <span className="favorite-explanation">Tell us your name if you want to mark this book as a favorite!</span>
          <form className="favorite-form">
                <span className="username">Name:</span>
              <input className="name-input" type="text" value={this.state.userName} onChange={this.handleChange} />  
              <button className="favorite-button" onClick={() => {this.saveBookToFavorites(this.props.bookId, bookTitle, userName)}}>Mark as favorite</button>
            </form>
          </div>
          <div className="return-button-container">
          <button className="return-button"onClick={this.props.handleReturnToBookList}>Return to book list</button>
        </div>
      </div>

        )
  }
}
}

export default BookDetailsView;

