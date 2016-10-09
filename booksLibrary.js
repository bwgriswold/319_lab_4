/*
5 reference books
20 ordinary books

each book has id
borrowed by (student username)
presence (1 or 0 for borrowed)

reference books cannot be checked out

Library, Shelf, Book

4 categories: Art, Science, Sport, Literature
bookID%4==0, 1, 2, 3

different categories on different shelves

Login Page:
	username and password == admin, log in as librarian
	username starts with u => undergrad student
	otherwise, alert - not correct un & pw

librarian view:
	Table: Shelf is column
	clicking a cell gives details
	add specific book to shelf
	
undergrad view:
	similar view
	student can borrow up to 2 books
	return borrowed book
	
use constructor + prototype patterns
no global variables or functions

*/

function Library(longestShelf) {
	this.longestShelf = longestShelf;
	this.shelves = []; //has shelves[] that will contain all shelves
	
	this.addShelf = function(shelf) {
		this.shelves.push(shelf);
	}
	this.print = function() {
		var table = "<table id=\"tableID\" style=\"border:1px solid black\"><tr>";
		for (i = 0; i < library.shelves.length; i++) {
			table += library.shelves[i].printHeader();
		}
		table += "</tr>";
		
		for (j = 0; j < library.longestShelf; j++) {
			table += "<tr>"
			for (i = 0; i < this.shelves.length; i++) {
				if (this.shelves[i].books[j]) {
					if (this.shelves[i].books[j].presence == 0) {
						table += "<td bgcolor=\"#FF0000\" style=\"border:1px solid black\">" + this.shelves[i].books[j].name + "</td>";
					}
					else {
						table += "<td style=\"border:1px solid black\">" + this.shelves[i].books[j].name + "</td>";
					}
				}
				else {
					table += "<td style=\"border:1px solid black\"></td>";
				}
			}
			table += "</tr>";
		}
		
		table += "</table>";
		return table;
	}
}

function Shelf(shelfName) {
	this.shelfName = shelfName;
	this.books = []; //has books[] that will contain books. will need to be added individually
	
	this.addBook = function(book) {
		this.books.push(book);
	}
	this.printHeader = function() {
		return "<th style=\"border:1px solid black\">" + shelfName + "</th>";
	}
}

function Book(id, name, presence, borrowed) {
	this.id = id;
	this.name = name;
	this.presence = presence;
	this.borrowed = borrowed;
	
	this.checkOut = function(userID) {
		this.presence = 0;
		this.borrowed = userID;
	}
	this.details = function() {
		console.log(this.id);
	}
}

function initLibrary() {
	var book0 = new Book(0, "B0", 1, "");
	var book4 = new Book(4, "B4", 1, "");
	var book8 = new Book(8, "B8", 1, "");
	//TODO add rest of Art books
	
	var shelfArt = new Shelf("Shelf Art");
	shelfArt.addBook(book0);
	shelfArt.addBook(book4);
	shelfArt.addBook(book8);
	
	var book1 = new Book(1, "B1", 1, "");
	var book5 = new Book(5, "B5", 1, "");
	var book9 = new Book(9, "B9", 1, "");
	//TODO add rest of Science books
	
	var shelfScience = new Shelf("Shelf Science");
	shelfScience.addBook(book1);
	shelfScience.addBook(book5);
	shelfScience.addBook(book9);
	
	var library = new Library(8);
	library.addShelf(shelfArt);
	library.addShelf(shelfScience);
	//TODO add other two shelves
	console.log(library);
	
	//TODO something with Reference books
	return library;
}

function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	
	
	if ((username == "admin") && (password == "admin")) {
		console.log("logging in as librarian");
		library = initLibrary();
		librarianView(library);
	}
	else if (username.charAt(0).toLowerCase() != 'u') {
		alert("Username or Password is incorrect!");
	}
	else {
		console.log("logging in as student");
	}
}

function librarianView(library) {
	var libraryTable = library.print();
	document.write(libraryTable);
	//TODO how to "add specific book to specific shelf"?
	
	//assign table functionality
	var table = document.getElementById("tableID");
	if (table != null) {
	    for (var i = 0; i < table.rows.length; i++) {
	        for (var j = 0; j < table.rows[i].cells.length; j++)
	        table.rows[i].cells[j].onclick = function () {
	            bookDetails(this);
	        };
	    }
	}

	function bookDetails(tableCell) {
		bookName = tableCell.innerHTML;
		
		for (i = 0; i < library.shelves.length; i++) {
			for (j = 0; j < library.longestShelf; j++) {
				book = library.shelves[i].books[j];
				if (book) {
					if (book.name == bookName) {
						console.log("found!");
						console.log(book);
						alert(book.name + "is on " + library.shelves[i].shelfName);
						//TODO info about borrowed by, presence?
						return;
					}	
				}
			}
		}
	}
}

function studentView() {
	//TODO
}






