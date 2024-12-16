import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchQuery: string = ''; // For search bar input
  movies: any[] = []; // Array to hold all movies from the API
  filteredMovies: any[] = []; // Array to hold movies filtered by search and pagination
  currentPage: number = 1; // Current page for pagination
  moviesPerPage: number = 8; // Number of movies per page
  totalPages: number = 1; // Total number of pages
  totalItems: number = 0; // Total items from the API
  pages: number[] = []; // Array of page numbers for pagination buttons

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies(); // Fetch movies from the API on component initialization
  }

  // Fetch movies from API
  fetchMovies(): void {
    this.movieService.getMovies(this.currentPage, this.moviesPerPage).subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debugging: Log the API response
        this.movies = response.data; // Extract the movies array
        this.totalPages = response.pagination.totalPages; // Total pages from API
        this.totalItems = response.pagination.totalItems; // Total items from API
        this.updateMoviesGrid(); // Update the filtered movies grid
      },
      (error) => {
        console.error('Error fetching movies:', error); // Log any errors
      }
    );
  }

  // Update the filteredMovies array based on the current page and search query
  updateMoviesGrid(): void {
    // Apply search filter if searchQuery is not empty
    const filtered = this.movies.filter((movie) =>
      movie.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredMovies = filtered.slice(0, this.moviesPerPage); // Slice to fit the current page
    console.log('Filtered Movies:', this.filteredMovies); // Debugging: Log filtered movies
    this.updatePages(); // Update the pagination buttons
  }

  // Handle search bar input
  onSearch(): void {
    this.currentPage = 1; // Reset to the first page when searching
    this.updateMoviesGrid();
  }

  // Change the current page and fetch movies for that page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchMovies(); // Fetch new movies for the selected page
    }
  }

  // Increase the current page count
  increasePageCount(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies(); // Fetch new movies for the next page
    }
  }

  // Decrease the current page count
  decreasePageCount(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies(); // Fetch new movies for the previous page
    }
  }

  // Update the pages array for pagination buttons
  updatePages(): void {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4); // Show up to 5 pages

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    console.log('Pages:', this.pages); // Debugging: Log the pages
  }
}
