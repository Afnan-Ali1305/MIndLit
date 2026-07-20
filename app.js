// ==========================================
// 1. MOVIE DATA LIST
// ==========================================
const moviesList = [
    { id: 1, title: "Chhota Bheem Aur Krishna", thumbnail: "thumbnails/1.webp", videoUrl: "https://drive.google.com/file/d/1-G0WxhERhkCbZhciWmrrmiSDDXJSZdht/preview" },
    { id: 2, title: "Chhota Bheem & Krishna In Patliputra City Of Dead ", thumbnail: "thumbnails/2.webp", videoUrl: "https://drive.google.com/file/d/1vBya42znalQuwvPdjaaj8xwtyiDm-g7p/preview" },
    { id: 3, title: "Chhota Bheem And Krishna In Mayanagari ", thumbnail: "thumbnails/3.webp", videoUrl: "https://drive.google.com/file/d/1IsFA_YRibu4nf1FiwF9WteRbQnGKpOYp/preview" },
    { id: 4, title: "Chhota Bheem and Hatim: The Legend of the First Jinn", thumbnail: "thumbnails/4.webp", videoUrl: "https://drive.google.com/file/d/1uPGJ8IvtDOtWhwraJzpQHcAjUlHQITJT/preview" },
    { id: 5, title: "Frozen (2013)", thumbnail: "thumbnails/5.webp", videoUrl: "https://drive.google.com/file/d/1g9t3xn15hy4C-tLpblZCEQRcW520LrbP/preview" },
];

let currentPage = 1;
const itemsPerPage = 12;
let filteredMovies = [...moviesList];

// ==========================================
// 2. INDEX PAGE LOGIC
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

        // Agar koi movie search mein nahi milti toh Smart Link wala button show hoga (High Revenue Trick)
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
            // Movie Card Elements
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

            // Grid Inline Ad Injection (Safe Social Bar/Direct Ads standard configuration iframe)
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
            if (currentPage > 1) { currentPage--; renderMovies(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
            if (currentPage < totalPages) { currentPage++; renderMovies(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
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
// 3. PLAYER PAGE LOGIC (Modified Button Interface)
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

        // Watch Online: Direct video link opening
        if (watchOnlineBtn) {
            watchOnlineBtn.addEventListener('click', () => {
                window.location.href = movie.videoUrl;
            });
        }

        // Download: Open high CTR blog validation page passing ID
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
// 4. DOWNLOAD PAGE VERIFICATION LOGIC (No Auto Scroll + Direct Download Fixed)
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
            // Sirf message show hoga aur section unhide hoga, NO AUTO SCROLL
            verifyStatus.classList.remove('hidden');
            continueSection.classList.remove('hidden');
            verifyBtn.disabled = true;
            verifyBtn.className = "w-full bg-gray-700 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed text-xs uppercase tracking-wider";
            verifyBtn.textContent = "✓ Step 1 Verified";
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (movie) {
                // 1. Adsterra Smart Link trigger in a new tab
                window.open("https://www.effectivecpmnetwork.com/fnidem1r8?key=e811a9ad862800948e70aaf5bc5c225f", "_blank");
                
                // 2. Google drive preview link ko direct download link mein transform karne ki logic
                let origUrl = movie.videoUrl;
                let downloadUrl = origUrl;

                if (origUrl.includes('drive.google.com')) {
                    // Extracting the File ID from link structure
                    let fileId = "";
                    const matches = origUrl.match(/\/d\/([a-zA-Z0-9_-]+)\//);
                    if (matches && matches[1]) {
                        fileId = matches[1];
                    } else {
                        const fileIdParam = new URLSearchParams(new URL(origUrl).search).get('id');
                        if (fileIdParam) fileId = fileIdParam;
                    }

                    if (fileId) {
                        // Force download URL mapping instead of web player stream
                        downloadUrl = `https://docs.google.com/uc?export=download&id=${fileId}`;
                    }
                }
                
                // Redirection execution for download bypass
                window.location.href = downloadUrl;
            } else {
                alert("Download link error. Please go back to homepage.");
            }
        });
    }
}