
import './App.css';
import React from 'react';

class BookCard extends React.Component {
  constructor(props) {
    super(props)
  }

  onClickOfUniqueBookCard() {
    () => {
      this.props.handleBookCardClick(this.props.id)
    }
  }


  render() {
    return (
    <div onClick={this.props.onClickOfUniqueBookCard}>
      {this.props.title}
    </div>
    )
  }
}

export default BookCard;