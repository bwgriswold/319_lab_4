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
		for (i = 0; i < this.shelves.length; i++) {
			table += this.shelves[i].printHeader();
		}
		table += "</tr>";
		
		for (j = 0; j < this.longestShelf; j++) {
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
	
	this.updateLongest = function() { //updates longest shelf after book has been added
		var longest = this.shelves[0].books.length;
		for(var i = 1; i < this.shelves.length; i += 1) {
			if (this.shelves[i].books.length > longest)
				longest = this.shelves[i].books.length;
		}
		this.longestShelf = longest;
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
	//TODO need to have old library stored
	//if (old library doesn't exist)
	
	var shelfArt = new Shelf("Shelf Art");
	shelfArt.addBook(new Book(0, "B0", 1, ""));
	shelfArt.addBook(new Book(4, "B4", 1, ""));
	shelfArt.addBook(new Book(8, "B8", 1, ""));
	shelfArt.addBook(new Book(12, "B12", 1, ""));
	shelfArt.addBook(new Book(16, "B16", 1, ""));
	shelfArt.addBook(new Book(20, "B20", 1, ""));
	
	var shelfScience = new Shelf("Shelf Science");
	shelfScience.addBook(new Book(1, "B1", 1, ""));
	shelfScience.addBook(new Book(5, "B5", 1, ""));
	shelfScience.addBook(new Book(9, "B9", 1, ""));
	shelfScience.addBook(new Book(13, "B13", 1, ""));
	shelfScience.addBook(new Book(17, "R1", 1, ""));
	shelfScience.addBook(new Book(21, "R2", 1, ""));
	
	var shelfSport = new Shelf("Shelf Sport");
	shelfSport.addBook(new Book(2, "B2", 1, ""));
	shelfSport.addBook(new Book(6, "B6", 1, ""));
	shelfSport.addBook(new Book(10, "B10", 1, ""));
	shelfSport.addBook(new Book(14, "B14", 1, ""));
	shelfSport.addBook(new Book(18, "B18", 1, ""));
	shelfSport.addBook(new Book(22, "B22", 1, ""));
	
	var shelfLiterature = new Shelf("Shelf Literature");
	shelfLiterature.addBook(new Book(3, "B3", 1, ""));
	shelfLiterature.addBook(new Book(7, "B7", 1, ""));
	shelfLiterature.addBook(new Book(11, "B11", 1, ""));
	shelfLiterature.addBook(new Book(15, "B15", 1, ""));
	shelfLiterature.addBook(new Book(19, "R3", 1, ""));
	shelfLiterature.addBook(new Book(23, "R4", 1, ""));
	shelfLiterature.addBook(new Book(27, "R5", 1, ""));
	
	var library = new Library(7);
	library.addShelf(shelfLiterature);
	library.addShelf(shelfScience);
	library.addShelf(shelfSport)
	library.addShelf(shelfArt);
	console.log(library);
	
	return library;
}

function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var library = initLibrary();
	
	if ((username == "admin") && (password == "admin")) {
		console.log("logging in as librarian");
		librarianView(library);
	}
	else if (username.charAt(0).toLowerCase() != 'u') {
		alert("Username or Password is incorrect!");
	}
	else {
		studentView(library, username);
		console.log("logging in as student");
	}
}

function librarianView(library) {
	var libraryTable = library.print();
	document.write(libraryTable);
	
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
		var bookName = tableCell.innerHTML;
		
		for (i = 0; i < library.shelves.length; i++) {
			for (j = 0; j < library.longestShelf; j++) {
				book = library.shelves[i].books[j];
				if (book) {
					if (book.name == bookName) {
						console.log("found!");
						console.log(book);
						alert(book.name + " is on " + library.shelves[i].shelfName);
						//TODO info about borrowed by, presence? We can have a separate one in the student for this
						return;
					}	
				}
			}
		}
		console.log("book not found");
		//TODO how to get column of tableCell?? then use that to determine the shelf *MUST BE EQUAL TO SHELVES INDEX*
		var shelf = "x";
		var minus = 0;
		
		if (col == 0){
			shelf = "Literature";
			minus = 1;
		} else if (col == 1) {
			shelf = "Science";
			minus = 3;
		} else if (col == 2) {
			shelf = "Sport";
			minus = 2;
		} else {
			shelf = "Art";
			minus = 4;
		}
		
		var string = "Would you like to add a book on the " + shelf + " shelf?";
		var add = confirm(string);
		if (add) {
			var notAdded = true;
			var bookName = "";
			while(notAdded) {
				string = "Enter the name of book to be added: \nRegular book begins with 'B' Reference with 'R'";
				bookName = prompt(string, "x");
				if(bookName.charAt(0) == 'B' || bookName.charAt(0) == 'R') 
					notAdded = false;
			}
			var bookID = library.shelves[col].books.length * 4 - minus;
			library.shelves[col].addBook(new Book(bookID, bookName, 1, ""));
			library.updateLongest();
			document.body.innerHTML = "";
			librarianView(library);
		}
	}
}

function studentView(library, username) {
	//TODO
}

//TODO need a button at the bottom to logout or go back to login screen and still keep the library




