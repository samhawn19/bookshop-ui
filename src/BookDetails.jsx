import React from 'react';

class BookDetailsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        error: null,
        isLoaded: false,
        bookTitle: "",
        bookAuthors: []
    }
    this.getBookDataUrl = this.getBookDataUrl.bind(this);
    this.fetchBookDataById = this.fetchBookDataById.bind(this);
  }

  getBookDataUrl() {
    return `https://gutendex.com/books/${this.props.id}`;
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

  componentDidMount() {
    this.fetchBookDataById();
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>{this.state.bookTitle}</div>
        )
  }
}
}

export default BookDetailsView;

