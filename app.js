// ==========================================
// 1. HELPER FUNCTIONS FOR GOOGLE DRIVE URLS
// ==========================================
const getStreamUrl = (driveId) => `https://drive.google.com/file/d/${driveId}/preview`;
const getDownloadUrl = (driveId) => `https://docs.google.com/uc?export=download&id=${driveId}`;

// ==========================================
// 2. MOVIE DATA LIST (Optimized with driveId)
// ==========================================
const moviesList = [
    { id: 1, title: "Chhota Bheem Aur Krishna", thumbnail: "thumbnails/1.webp", driveId: "1-G0WxhERhkCbZhciWmrrmiSDDXJSZdht" },
    { id: 2, title: "Chhota Bheem & Krishna In Patliputra City Of Dead ", thumbnail: "thumbnails/2.webp", driveId: "1vBya42znalQuwvPdjaaj8xwtyiDm-g7p" },
    { id: 3, title: "Chhota Bheem And Krishna In Mayanagari ", thumbnail: "thumbnails/3.webp", driveId: "1IsFA_YRibu4nf1FiwF9WteRbQnGKpOYp" },
    { id: 4, title: "Chhota Bheem and Hatim: The Legend of the First Jinn", thumbnail: "thumbnails/4.webp", driveId: "1uPGJ8IvtDOtWhwraJzpQHcAjUlHQITJT" },
    { id: 5, title: "Frozen (2013)", thumbnail: "thumbnails/5.webp", driveId: "1g9t3xn15hy4C-tLpblZCEQRcW520LrbP" },
    { id: 6, title: "Chhota Bheem: The Evil Queen of Dholakpur", thumbnail: "thumbnails/6.webp", driveId: "1aCIYUVgsDjwX8mEJ0TL9dftzoGcbEkVI" },
    { id: 7, title: "The Adventure of Chhota Bheem and Ghatotkach", thumbnail: "thumbnails/7.webp", driveId: "1FSUUbGC-YhWyqtfoJ8ZpvQl6E1F_3C0k" },
    { id: 8, title: "Doraemon the Movie: Nobita Aur Ek Jalpari", thumbnail: "thumbnails/8.webp", driveId: "1G9i8UUNNGTlsQG-R6Fym03o_GrmUj7he" },
    { id: 9, title: "Doraemon the Movie: Nobita’s New Little Star Wars", thumbnail: "thumbnails/9.webp", driveId: "17RvqP1fu_zxEseB1j34-E2tJ97VKwSAd" },
    { id: 10, title: "Motu Patlu Ka Goa Dhamaal (2026)", thumbnail: "thumbnails/10.webp", driveId: "1aJdg74ijD0rLm7yDOMi3BKDeQsH7eWya" },
    { id: 11, title: "Motu Patlu: King of Kings (2016) Movie", thumbnail: "thumbnails/11.webp", driveId: "1mF5zYlCsEwpe2DtlHPvsgBbAjIoU5jC9" },
    { id: 12, title: "Shinchan The Movie: Yummy in Tummy", thumbnail: "thumbnails/12.webp", driveId: "1_QP3-1jbCYg7E96l0JTYoVYWwaIQqEYc" },
    { id: 13, title: "Kung Fu Panda 4 (2024)", thumbnail: "thumbnails/13.webp", driveId: "1n4ZECGNnCW4HQPBsWeSBwaV0M-xFaur8" },
    { id: 14, title: "Dragon Ball Z: Battle of Gods", thumbnail: "thumbnails/14.webp", driveId: "1l2x7m8ZLxzIrsWFRLmaFDjWp4w3-xmfP" },
    { id: 15, title: "Doraemon the Movie: Nobita’s Earth Symphony", thumbnail: "thumbnails/15.webp", driveId: "1L-Fnp9omWKhvBHRGh4kNdfC1YEnv-Tse" },
    { id: 16, title: "Doraemon the Movie: Nobita Aur Jadooi Tapu", thumbnail: "thumbnails/16.webp", driveId: "1Vn8LmPceluM_qcsg7jXI4ypWkNTBqZUu" },
    { id: 17, title: "Doraemon the Movie: Nobita in Hara Hara Planet", thumbnail: "thumbnails/17.webp", driveId: "1AB9Y_otrLdcIDqVoPUCM9qaFK8VU6aIv" },


];

let currentPage = 1;
const itemsPerPage = 12;
let filteredMovies = [...moviesList];

// ==========================================
// 3. INDEX PAGE LOGIC
// ==========================================
function initIndexPage() {
    const moviesGrid = document.getElementById('movies-grid');
    const searchInput = document.getElementById('search-input');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNumber = document.getElementById('page-number');

    function renderMovies() {
        if (!moviesGrid) return;
        moviesGrid.innerHTML = "";

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);

        // Agar koi movie search mein nahi milti toh Smart Link button show hoga
        if (moviesToDisplay.length === 0) {
            moviesGrid.innerHTML = `
                <div class="col-span-full text-center py-12 px-4 bg-gray-850 rounded-xl border border-gray-800 space-y-4">
                    <p class="text-gray-400 text-base">The movie you are looking for is currently unreleased or buffering.</p>
                    <a href="https://www.effectivecpmnetwork.com/fnidem1r8?key=e811a9ad862800948e70aaf5bc5c225f" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="inline-block bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 text-sm">
                       ⚡ Click Here to Request & Stream from Cloud Server
                    </a>
                </div>
            `;
            updatePaginationControls();
            return;
        }

        moviesToDisplay.forEach((movie, index) => {
            // Movie Card
            const card = document.createElement('div');
            card.className = "movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer flex flex-col group border border-gray-700 hover:border-red-500 transition duration-200";
            card.innerHTML = `
                <div class="aspect-[2/3] w-full overflow-hidden bg-gray-900">
                    <img src="${movie.thumbnail}" alt="${movie.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">
                </div>
                <div class="p-3 flex-grow flex items-center justify-start">
                    <h3 class="font-medium text-sm sm:text-base line-clamp-2 group-hover:text-red-500 transition">${movie.title}</h3>
                </div>
            `;

            card.addEventListener('click', () => {
                window.location.href = `player.html?id=${movie.id}`;
            });
            moviesGrid.appendChild(card);

            // Grid Inline Ad Injection (Har 4 cards ke baad)
            if ((index + 1) % 4 === 0) {
                const inlineAdCard = document.createElement("div");
                inlineAdCard.className = "bg-gray-950 rounded-lg p-2 flex flex-col items-center justify-center text-center border border-dashed border-gray-700 min-h-[250px] overflow-hidden col-span-1";
                inlineAdCard.innerHTML = `
                    <p class="text-[10px] text-gray-600 mb-1 uppercase tracking-widest font-semibold">Sponsored Link</p>
                    <div class="w-full flex justify-center items-center h-full">
                        <iframe src="//www.highperformanceformat.com/watchnew?key=9a853e7f223b87bc6111a630d9e9b757" 
                                width="300" 
                                height="250" 
                                frameborder="0" 
                                scrolling="no" 
                                style="border:none; overflow:hidden;"
                                class="rounded shadow-md">
                        </iframe>
                    </div>
                `;
                moviesGrid.appendChild(inlineAdCard);
            }
        });

        updatePaginationControls();
    }

    function updatePaginationControls() {
        if (!pageNumber || !prevBtn || !nextBtn) return;
        const totalPages = Math.ceil(filteredMovies.length / itemsPerPage) || 1;
        pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderMovies();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderMovies();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filteredMovies = moviesList.filter(movie => movie.title.toLowerCase().includes(searchTerm));
            currentPage = 1;
            renderMovies();
        });
    }

    renderMovies();
}

// ==========================================
// 4. PLAYER PAGE LOGIC
// ==========================================
function initPlayerPage() {
    const playerMovieTitle = document.getElementById('player-movie-title');
    const watchOnlineBtn = document.getElementById('watch-online-btn');
    const downloadBtn = document.getElementById('download-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    const movie = moviesList.find(m => m.id === movieId);

    if (movie && playerMovieTitle) {
        playerMovieTitle.textContent = movie.title;
        document.title = `${movie.title} - StreamVerse`;

        // Watch Online: Direct Google Drive Stream Link
        if (watchOnlineBtn) {
            watchOnlineBtn.addEventListener('click', () => {
                window.location.href = getStreamUrl(movie.driveId);
            });
        }

        // Download: Download Page redirect
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                window.location.href = `download.html?id=${movie.id}`;
            });
        }
    } else if (playerMovieTitle) {
        playerMovieTitle.textContent = "Movie Not Found";
        if (watchOnlineBtn) watchOnlineBtn.style.display = "none";
        if (downloadBtn) downloadBtn.style.display = "none";
    }
}

// ==========================================
// 5. DOWNLOAD PAGE LOGIC
// ==========================================
function initDownloadPage() {
    const verifyBtn = document.getElementById('verify-btn');
    const verifyStatus = document.getElementById('verify-status');
    const continueSection = document.getElementById('continue-section');
    const continueBtn = document.getElementById('continue-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    const movie = moviesList.find(m => m.id === movieId);

    if (verifyBtn && continueSection) {
        verifyBtn.addEventListener('click', () => {
            // Unhide status message & continue button (No Auto Scroll)
            verifyStatus.classList.remove('hidden');
            continueSection.classList.remove('hidden');
            verifyBtn.disabled = true;
            verifyBtn.className = "w-full bg-gray-700 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed text-xs uppercase tracking-wider";
            verifyBtn.textContent = "✓ Step 1 Verified";
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (movie && movie.driveId) {
                // 1. Trigger Adsterra Smart Link in a new tab
                window.open("https://www.effectivecpmnetwork.com/fnidem1r8?key=e811a9ad862800948e70aaf5bc5c225f", "_blank");

                // 2. Direct clean download link redirect using helper
                window.location.href = getDownloadUrl(movie.driveId);
            } else {
                alert("Download link error. Please go back to homepage.");
            }
        });
    }
}

// ==========================================
// 6. INITIALIZATION BASED ON PAGE DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('movies-grid')) {
        initIndexPage();
    }
    if (document.getElementById('player-movie-title')) {
        initPlayerPage();
    }
    if (document.getElementById('verify-btn')) {
        initDownloadPage();
    }
});