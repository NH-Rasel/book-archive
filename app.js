// search book from input field
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}

// show the search result
const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (docs.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
             <h1 style="margin-left:450px" class="text-nowrap text-center text-muted w-auto">No Search Result :(</h1>
        `;
        searchResult.appendChild(div);
    }
    else if (docs.length > 0) {
        docs.length = 20;
        docs?.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/{cover_i}-M.jpg" class="card-img-top w-75 m-3 ps-4 pt-4" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text"><span class="fw-bold text-secondary">Authors: </span>${book.author_name ? book.author_name : ''}</p>
                        <p class="card-text text-muted">Publisher: ${book.publisher ? book.publisher : ''}</p>
                        <p class="card-text text-muted">First Published: ${book.first_publish_year ? book.first_publish_year : ''}</p>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        })
    }
}
