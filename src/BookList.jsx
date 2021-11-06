import React from 'react';
import BookCard from './BookCard.jsx'

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            bookList: [],
            nextUrl: null,
            prevUrl: null,
            bookId: ""
        };
        this.fetchListData = this.fetchListData.bind(this);
        this.fetchNewList = this.fetchNewList.bind(this);
        this.showBookDetailsView = this.showBookDetailsView.bind(this);
        this.initialUrl = "https://gutendex.com/books";
    }

    fetchListData(url) {
        // set current url to url
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    bookList: result.results,
                    nextUrl: result.next,
                    prevUrl: result.previous
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    fetchNewList(isNext) {
        const url = (isNext) ? this.state.nextUrl : this.state.prevUrl
        return () => {
            this.fetchListData(url);
        }
            
    }

    showBookDetailsView(bookId) {
         () => {
            this.props.showBookDetailsView(bookId);
        }
    }


    componentDidMount() {
        this.fetchListData(this.initialUrl)
    }


    render() {
        const { error, isLoaded, bookList } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {bookList.map(book => (
                        // pass showBookDetails callback to bookcard
                        <BookCard onClick={this.showBookDetailsView(book.id)} key={book.id} title={book.title} />
                    ))}
                    <div>
                        <button onClick={this.fetchNewList(false)}>Previous</button>
                        <button onClick={this.fetchNewList(true)}>Next</button>
                    </div>
                </div>
            );
        }
    }
}




export default BookList;