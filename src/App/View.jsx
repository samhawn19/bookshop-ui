import './app.css';
import React from 'react';
import BookList from "../BookList/View.jsx"
import BookDetailsView from "../BookDetails/View.jsx"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBookDetailsView: false,
      bookId: null
    }
    this.toggleView = this.toggleView.bind(this)
  }

  toggleView(id) {
    this.setState(prevState => ({
      showBookDetailsView: !prevState.showBookDetailsView,
      bookId: (id) ? id : null,
    }));
  }

  render() {
    return (
      <div className="app">
      {(!this.state.showBookDetailsView) ? <BookList isFromBookDetailsView={this.state.isFromBookDetailsView} showBookDetailsView={(bookId) => {this.toggleView(bookId)}} /> : <BookDetailsView handleReturnToBookList={this.toggleView} bookId={this.state.bookId}/>}
    </div>
    )
  }
}

export default App;

