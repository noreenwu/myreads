import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    localBooks: [
      { id: 'mockingbird',
        title: 'To Kill a Mockingbird',
      	authors: 'Harper Lee',
        width: 128,
        height: 188,
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        },
        // backgroundImage: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
       shelf: 'currentlyReading'
      },
      { id: 'enders', 
        title: 'Ender\'s Game',
        authors: 'Orson Scott Card',
        width: 128, 
        height: 188,
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
        },       
        // backgroundImage: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        shelf: 'currentlyReading'
      },
      { id: '1776',
        title: '1776',
        authors: 'David McCullough',
        width: 128, 
        height: 193,
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
        },        
        // backgroundImage: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        shelf: 'wantToRead'
      },
      { id: 'potter', 
        title: 'Harry Potter and the Sorcerer\'s Stone',
        authors: 'J.K. Rowling',
        width: 128, 
        height: 192,
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
        },        
        // backgroundImage: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        shelf: 'wantToRead',
      },
      { id: 'hobbit',
        title: 'The Hobbit',
        authors: 'J.R.R. Tolkien',
        width: 128,
        height: 192,
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
        },        
        // backgroundImage: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        shelf: 'read'
      },
      { id: 'places',
        title: 'Oh, the Places You\'ll Go!',
        authors: 'Seuss',
        width: 128,
        height: 174,
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
        },        
        // backgroundImage: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        shelf: 'read'
      },
      { id: 'tomsawyer',
        title: 'The Adventures of Tom Sawyer',
        authors: 'Mark Twain',
        width: 128,
        height: 192,
        imageLinks: {
          thumbnail: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
        },        
        // backgroundImage: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        shelf: 'read'
      }      
    ],
    books: [],
    b1: {}
  }

  filterBooks = (status) => {
    return function(b) {
      return (b.shelf === status);
    }
  }

  displayVals = (b) => {
    return (
      { width: b.width,
        height: b.height,
        backgroundImage: b.backgroundimg
      }
    );
  }

  findBook = (bid) => {
	for (let i=0; i<  this.state.localBooks.length; i++) {
      if (this.state.localBooks[i].id === bid) {
        return i;
      }
    }    
    return -1;    // didn't find the book
  }

  handleShelfChange = (ev, b) => {
    // The directive to move a book from one shelf to another came from ShelfSelector
    //  which detected that the user made a change in a <select> control. Handling of
    //  the change is propagated up from ShelfSelector to Book (which adds in which book
    //  info) to BookShelf and finally here, to App, where the state of the books,
    //  including which shelf it lives on, is kept.
    // 
    // In order to change the bookshelf state, we need to copy the array, make the change and
    // then reset the localBooks array; we cannot make changes to the state directly.
    
    const newLocalBooks = this.state.localBooks.slice();  // copy localBooks
    let bidx = this.findBook(b.id);
    if (bidx !== -1) {
      newLocalBooks[bidx].shelf = ev;
    }

    this.setState( {
		localBooks: newLocalBooks
    })

  }

  addBookToLibrary = (ev, b) => {
     console.log("App: addBookToLibrary ");
    

     BooksAPI.get(b.id)
    	.then((bk) => {
       		const newLocalBooks = this.state.localBooks.slice();  // copy localBooks
       		console.log("bk.shelf: " + bk.shelf);
       	    bk.shelf = ev;
       		newLocalBooks.push(bk);
       
            BooksAPI.update(bk, 'read')
              .then((res) => {
              console.log("updated book shelf on API " + res);
            });
       
       		this.setState({
                localBooks : newLocalBooks
              })
       
  		})
              
               

  }


  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
          this.setState(() => ({
            books,
            b1: books[5]
          }))
        })
  }

  render() {
    return (
      <div className="app">
       {console.log(this.state.books[0])}
		<Route 
    		path='/search' 
    		render={() => (
          		<SearchBooks
              		books={this.state.books}
					handleShelfChange={this.handleShelfChange}
					addBookToLibrary={this.addBookToLibrary}
				/>
         	)}
	 	/>
        <Route exact path='/' render={() => (

              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
				  
                  <BookCase localBooks={this.state.localBooks}
                            handleShelfChange={this.handleShelfChange}
                            filterBooks={this.filterBooks}
                  />

                  <div className="open-search">
                    <Link
                        to='/search'
                        className='search-books'
                      >Add a book</Link>
                  </div>
              </div>
            ) 
          } />
      </div>
    )
  } 
}

export default BooksApp

