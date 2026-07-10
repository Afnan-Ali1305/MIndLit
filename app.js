// 1. Movie Data List
const moviesList = [
    {
        id: 1,
        title: "Iron Man",
        thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
        videoUrl: "https://www.youtube.com/embed/8hP9D6kZseM"
    },
    {
        id: 2,
        title: "Avatar: The Way of Water",
        thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&q=80",
        videoUrl: "https://www.youtube.com/embed/d9MyW72ELq0"
    },
    {
        id: 3,
        title: "Interstellar",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
        videoUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
        id: 4,
        title: "The Dark Knight",
        thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&q=80",
        videoUrl: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
        id: 5,
        title: "Spiderman: No Way Home",
        thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80",
        videoUrl: "https://www.youtube.com/embed/JfVOs4VSpmA"
    },
    {
        id: 6,
        title: "Inception",
        thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80",
        videoUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
    }
];

// State Variables for Main Page
let currentPage = 1;
const itemsPerPage = 20; 
let filteredMovies = [...moviesList];

// --- INDEX PAGE LOGIC ---
function initIndexPage() {
    const moviesGrid = document.getElementById('movies-grid');
    const searchInput = document.getElementById('search-input');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNumber = document.getElementById('page-number');

    function renderMovies() {
        moviesGrid.innerHTML = "";
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);

        if (moviesToDisplay.length === 0) {
            moviesGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No movies found.</p>`;
            updatePaginationControls();
            return;
        }

        moviesToDisplay.forEach(movie => {
            const card = document.createElement('div');
            card.className = "movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer flex flex-col group border border-gray-700 hover:border-red-500 transition duration-300";
            card.innerHTML = `
                <div class="aspect-[2/3] w-full overflow-hidden bg-gray-900">
                    <img src="${movie.thumbnail}" alt="${movie.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-3 flex-grow flex items-center justify-start">
                    <h3 class="font-medium text-sm sm:text-base line-clamp-2 group-hover:text-red-500 transition">${movie.title}</h3>
                </div>
            `;
            
            // Asal Page Redirect URL Parameter ke sath
            card.addEventListener('click', () => {
                window.location.href = `player.html?id=${movie.id}`;
            });
            moviesGrid.appendChild(card);
        });

        updatePaginationControls();
    }

    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredMovies.length / itemsPerPage) || 1;
        pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderMovies();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderMovies();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        filteredMovies = moviesList.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        currentPage = 1;
        renderMovies();
    });

    renderMovies();
}

// --- PLAYER PAGE LOGIC ---
function initPlayerPage() {
    const videoPlayer = document.getElementById('video-player');
    const playerMovieTitle = document.getElementById('player-movie-title');

    // URL se Movie ID nikalna
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));

    // ID match kr ke movie dhundna
    const movie = moviesList.find(m => m.id === movieId);

    if (movie) {
        videoPlayer.src = movie.videoUrl;
        playerMovieTitle.textContent = movie.title;
        document.title = `${movie.title} - StreamVerse`;
    } else {
        // Agar ghalti se galat ID ho tu runtime handle kre
        playerMovieTitle.textContent = "Movie Not Found";
        videoPlayer.style.display = "none";
    }
}