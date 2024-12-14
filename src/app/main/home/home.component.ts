import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchQuery: string = ''; // For search bar input
  movies: any[] = []; // Array to hold all movies
  filteredMovies: any[] = []; // Array to hold filtered movies
  currentPage: number = 1; // Current page for pagination
  moviesPerPage: number = 8; // Number of movies per page
  totalPages: number = 1; // Total number of pages
  maxPages: number = 5; // Maximum number of pages to show
  pages: number[] = []; // Array of page numbers for buttons

  constructor() {}

  ngOnInit(): void {
    // Fetch movies data (this can be replaced with an API call)
 // Example movie data
 this.movies = [
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5625" },
    show_id: "s1",
    type: "Movie",
    title: "Dick Johnson Is Dead",
    director: "Kirsten Johnson",
    country: "United States",
    date_added: "September 25, 2021",
    release_year: 2020,
    rating: "PG-13",
    duration: "90 min",
    listed_in: "Documentaries",
    description:
      "As her father nears the end of his life, filmmaker Kirsten Johnson stages his death in inventive and comical ways to help them both face the inevitable.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Another Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "SecondLast Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
  {
    _id: { $oid: "6758aaf2ab8a0eb6d9be5626" },
    show_id: "s2",
    type: "Movie",
    title: "Last Movie",
    director: "John Doe",
    country: "Canada",
    date_added: "August 15, 2020",
    release_year: 2019,
    rating: "R",
    duration: "120 min",
    listed_in: "Thrillers",
    description:
      "A gripping thriller about a man on the run who discovers a shocking conspiracy.",
  },
];


    // Set total pages and initialize filteredMovies
    this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
    this.updateMoviesGrid();
    this.updatePages();
  }

  // Update the filteredMovies array based on the current page and search query
  updateMoviesGrid(): void {
    const startIndex = (this.currentPage - 1) * this.moviesPerPage;
    const endIndex = startIndex + this.moviesPerPage;

    // Apply search filter if searchQuery is not empty
    const filtered = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.totalPages = Math.ceil(filtered.length / this.moviesPerPage);
    this.filteredMovies = filtered.slice(startIndex, endIndex);

    // Update pages whenever the grid changes
    this.updatePages();
  }

  // Handle search bar input
  onSearch(): void {
    this.currentPage = 1; // Reset to the first page when searching
    this.updateMoviesGrid();
  }

  // Change the current page and update the movies grid
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateMoviesGrid();
    }
  }

  // Increase the maximum number of pages
  increasePageCount(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateMoviesGrid();
    }
  }


  // Decrease the maximum number of pages
  decreasePageCount(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateMoviesGrid();
    }
  }

  // Update the pages array for pagination buttons
  updatePages(): void {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxPages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxPages - 1);

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  } // <-- Make sure this closing brace is present
}
