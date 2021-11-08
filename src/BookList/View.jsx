import React from 'react';
import BookCard from '../BookCard/View.jsx'
import "./booklist.css";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            bookList: [],
            nextUrl: null,
            prevUrl: null,
            isInitialLoad: true
         } 
        this.fetchListData = this.fetchListData.bind(this);
        this.showBookDetailsView = this.showBookDetailsView.bind(this);
        this.fetchNewOrPreviousList = this.fetchNewOrPreviousList.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.initialUrl = "https://gutendex.com/books/";
    }

    fetchListData(url) {
        const isInitialLoad = (url === this.initialUrl)
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    bookList: result.results,
                    nextUrl: result.next,
                    prevUrl: result.previous,
                    isInitialLoad: isInitialLoad
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

    getUrl(isNext) {
        const url = (isNext) ? this.state.nextUrl : this.state.prevUrl
        return url;           
    }

    fetchNewOrPreviousList(isNext) {
        const url = this.getUrl(isNext);
        this.fetchListData(url, false);
    }

    showBookDetailsView(bookId) {
        this.props.showBookDetailsView(bookId);
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
                <div className="booklist">
                <h1 className="heading">Welcome to Outlast Bookshop</h1>
                <div>
                    {bookList.map(book => (
                        <BookCard handleBookCardClick={(bookId) => {this.showBookDetailsView(bookId)}} key={book.id} title={book.title} authors={book.authors} id={book.id}/>
                    ))}
                    <div className="button-container">
                    <div className="nav-buttons">
                        {(!this.state.isInitialLoad) ? <button onClick={() => this.fetchNewOrPreviousList(false)} className="previous-button">Previous</button> : <button disabled={true} className="previous-button">Previous</button>}
                        <button onClick={() => this.fetchNewOrPreviousList(true)} className="next-button">Next</button>
                    </div>
                    </div>
                </div>
                </div>
            );
        }
    }
}




export default BookList;