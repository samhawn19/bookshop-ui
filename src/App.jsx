import './App.css';
import React from 'react';
import BookList from "./BookList.jsx"
import BookDetailsView from "./BookDetails.jsx"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBookDetails: false
    }
    this.switchToShowBookDetailsView = this.switchToShowBookDetailsView.bind(this);

  }

  switchToShowBookDetailsView(id) {
    // use function to avoid state being undefined
    () => {
      this.setState(() => ({
        showBookDetails: !this.state.showBookDetails,
        bookId: id
      }));
    }
  }

  // if this.state.showBookDetails is true show bookDetails
  render() {
    return (
      <div>
      <h1>Welcome to Outlast Bookshop</h1>
      {(!this.state.showBookDetails) ? <BookList showBookDetailsView={this.switchToShowBookDetailsView} /> : <BookDetailsView bookId={this.state.bookId} />}
    </div>
    )
  }
}

export default App;

