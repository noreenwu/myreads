# MyReads Project
# Noreen Wu 
# Udacity React: June 2019

# Overview
The MyReads app allows you to sort your books into 3 shelves: what you're currently reading,
what you'd like to read, and what you've finished reading. It will also allow you to search
for new books and add them to your shelves. If a book comes up as a result of a search and
it has already been placed on one of your shelves, its appropriate shelf status will be reflected in 
the selector for that book.

This project is being submitted directly from the Udacity-provided workspace. It requires only 
npm install and npm start to install and launch.

## Implementation Notes
There are two main pages in this app: the MyReads page which displays the 3 shelves and the Search page.
These utilize BrowserRouter, Route and Link React components to facilitate typical browser navigation
from the main page, (/), and the search page (/search).

The component breakdown is as follows:

   App
    │ 
    ├── BookCase ──────
    │                  ├── BookShelf ── Book ── ShelfSelector
    └── SearchBooks────


BookCase calls BookShelf 3 times, once for each of the shelves, and SearchBooks calls it once.  

The job of BookShelf and its sub-components is primarily to display what has been passed to it.
However, if the user chooses to move a book from one shelf to another, a cascade of handleChange
operations is triggered from the bottom up, beginning with ShelfSelector, which does not even
know which book is affected. Book does know, and it propagates this information upwards, eventually 
to App, where the shelf information, held in "state," is changed. Shelf changes are also registered
with the BooksAPI (using BooksAPI.update) -- however, searching for this information (BooksAPI.search)
will never uncover any shelf information. Therefore, to retain the proper shelf status of
searched for books, the shelf values of affected books has to be updated every time the user
searches. 

## Required Files

├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms that work with the app
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # 
└── src
    ├── App.css # Styles for the app
    ├── App.js # The root of the app
    ├── BookCase.js    # Drives the primary MyReads page with 3 shelves
    ├── SearchBooks.js # Allows the user to search for more books using the BooksAPI
    ├── BookShelf.js   # Drives the display of a set of books that has been passed to it
    ├── Book.js    # Specializes in the display of a single book, including rendering of its cover, author, title
    ├── ShelfSelector.js # Concerned with the <select> control that allows the user to move books to different shelves   
    ├── App.test.js # Used for testing.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend.
    ├── icons # Helpful images for the app. 
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. 
    └── index.js # Modified to include <BrowserRouter>

