
import React from 'react';
import './bookCard.css';

class BookCard extends React.Component {

  render() {
    const numberOfAuthors = this.props.authors.length;
    return (
    <div className="bookCard" onClick={() => {this.props.handleBookCardClick(this.props.id)}}>
      <div className="bookTitle">{this.props.title}</div>
      <div className="authors">
        {(numberOfAuthors === 0) ? null : <div className="by">by</div> }
      {this.props.authors.map(author => {
        return (numberOfAuthors === 1) ? <div>{author.name}</div> : <div>{`${author.name}, `}</div>
      })}
      </div>
    </div>
    )
  }
}

export default BookCard;