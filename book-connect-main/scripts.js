// It imports constants (BOOKS_PER_PAGE), arrays (authors, genres), and an object (books) from a file named "data.js".
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

 // The page variable is set to 1, and the matches variable is assigned the books.
let page = 1;
let matches = books;

// It creates an object named html that stores references to various HTML elements using document.querySelector().
const html = {
    search: {
        dialog: document.querySelector('[data-search-overlay]'),
        authors: document.querySelector('[data-search-authors]'),
        genres: document.querySelector('[data-search-genres]'),
        title: document.querySelector('[data-search-title]'),
        button: document.querySelector('[data-header-search]'),
        cancel: document.querySelector('[data-search-cancel]'),
    },
    settings: {
        dialog: document.querySelector('[data-settings-overlay]'),
        button: document.querySelector('[data-header-settings]'),
        cancel: document.querySelector('[data-settings-cancel]'),
        theme: document.querySelector('[data-settings-theme]'),
        save: document.querySelector('[data-settings-form]'),

    },
    list: {
        button: document.querySelector('[data-list-button]'),
        active: document.querySelector('[data-list-active]'),
        close: document.querySelector('[data-list-close]'),
        blur: document.querySelector('[data-list-blur]'),
        title: document.querySelector('[data-list-title]'),
        subtitle: document.querySelector('[data-list-subtitle]'),
        description: document.querySelector('[data-list-description]'),
        image: document.querySelector('[data-list-image]'),
        parent: document.querySelector('[data-list-items]'),
        message:document.querySelector('[data-list-message]'),
    },

}
// It defines event handlers for search toggles, and saves in the handleSearchToggle functions.
const handleSearchToggle = (event) => {
   event.preventDefault();
  
    if (html.search.dialog.hasAttribute('open')) {
        html.search.dialog.removeAttribute('open')
    } else {
        html.search.dialog.setAttribute('open',true)
    }
}
// It attaches the event handlers to corresponding HTML elements using addEventListener().
html.search.button.addEventListener('click', handleSearchToggle)
html.search.cancel.addEventListener('click', handleSearchToggle)


// It defines event handlers for  settings toggles, and saves in the handleSettingsToggle functions.
const handleSettingsToggle = (event) => {
    event.preventDefault();
    if (html.settings.dialog.hasAttribute('open')) {
        html.settings.dialog.removeAttribute('open')
    } else {
        html.settings.dialog.setAttribute('open', true)
    }
}
// It attaches the event handlers to corresponding HTML elements using addEventListener().
html.settings.button.addEventListener('click', handleSettingsToggle)
html.settings.cancel.addEventListener('click', handleSettingsToggle)


// It defines an event handler for saving settings in the handleSettingsSave function.
const handleSettingsSave = (event) => {
    event.preventDefault();
    if (html.settings.theme.value == "night") {
        document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
        document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } if (html.settings.theme.value == "day") {
        document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
        document.documentElement.style.setProperty("--color-light", "255, 255, 255");
    }
    html.settings.dialog.removeAttribute('open')
}
// It attaches the handleSettingsSave event handler to the settings form's submit event.
html.settings.save.addEventListener('submit', handleSettingsSave);

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = ''
genreHtml.appendChild(firstGenreElement)

document.querySelector('[data-search-genres]').appendChild(genreHtml);

// It defines functions to create HTML options for genres, createGenreOptionsHtml.
const createGenreOptionsHtml = () => {
    
    const fragment = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    fragment.appendChild(firstGenreElement);

    for (const [key, value] of Object.entries(genres)) {
        const option = document.createElement('option')
        option.value = key;
        option.innerText = value;
        fragment.appendChild(option)
    }

    html.search.genres.appendChild(fragment)
}


// // It attaches event listeners to the genres HTML elements, which trigger the corresponding functions to populate the options.
html.search.genres.addEventListener('click', createGenreOptionsHtml)


/*it creates an empty document fragment. Then it creates an option element with a 
value of ‘any’ and an empty string as its text. The option element is then appended to the document fragment. 
Finally, the document fragment is appended to the element with the attribute data-search-authors in the HTML document1.*/

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = ''
authorsHtml.appendChild(firstAuthorElement)

document.querySelector('[data-search-authors]').appendChild(authorsHtml);

// // It defines functions to create HTML options for authors, createAuthorOptionsHtml.
const createAuthorOptionsHtml = () => {
    const fragment = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    fragment.appendChild(firstAuthorElement);
    

    for (const [key, value] of Object.entries(authors)) {
        const option = document.createElement('option')
        option.value = key;
        option.innerText = value;
        fragment.appendChild(option)
    }
    html.search.authors.appendChild(fragment)
}
// // It attaches event listeners to the authors HTML elements, which trigger the corresponding functions to populate the options.
html.search.authors.addEventListener('click', createAuthorOptionsHtml)

let index = 0;
const fragment = document.createDocumentFragment();
const area = html.list.parent


// It defines a function named showBooks that populates the HTML with book previews.
const showBooks = (object) => {
    
    const extracted = books.slice(index, index + BOOKS_PER_PAGE);

    for (let i = index; i < index + BOOKS_PER_PAGE; i++) {
        const book = books[i]
        const image = book.image
        const title = book.title
        const authorId = book.author
        const id = book.id

        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('id', id)

        element.innerHTML =
            `<img class="preview__image" src=${image}>
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[authorId]}</div>
                </div> `;
        fragment.appendChild(element);
    };

    index = index + extracted.length;
    area.appendChild(fragment)

    const booksLeft = Object.keys(books).length - index
    html.list.button.innerHTML = `Show More (${booksLeft})`;

    
html.list.button.addEventListener('click', showBooks)
}

// It attaches the showBooks function to the window's load event.
window.addEventListener("load", showBooks(books))


// It defines a function named preview that displays detailed information about a selected book.
const preview = (id) => {
    const book = books.find(book => book.id === id)
    const blurImage = html.list.blur;
    blurImage.src = book.image
    const image = html.list.image
    image.src = book.image
    const title = html.list.title
    title.innerHTML = book.title
    const subtitle = html.list.subtitle;
    const date = new Date(book.published)
    const year = date.getFullYear()
    subtitle.innerHTML = `${authors[book.author]} (${year})`;
    const description = html.list.description;
    description.innerHTML = book.description;

    if (html.list.active.hasAttribute('open')) {
        html.list.active.removeAttribute('open')
    } else {
        html.list.active.setAttribute('open',true)
    }
   
}
// It attaches an event listener to the document's click event to handle book preview clicks.
document.addEventListener("click", (event) => {
    if (event.target.closest(".preview") == null) { return }
    else {
        const bookElement = event.target.closest(".preview")
        if (bookElement.hasAttribute('id')) {
            const previewId = bookElement.id;
            if (typeof previewId !== "string") { return }
            preview(previewId)
        }
    }

});
// It attaches the closePreview function to the close button's click event.
const closePreview = (event) => { event.preventDefault(); html.list.active.removeAttribute('open') }

html.list.close.addEventListener('click', closePreview);
// It defines an event handler for closing the book preview in the closePreview function


/*This code adds an event listener to the form with the attribute data-search-form to listen for the submit event. 
The event.preventDefault() method is called to prevent the default form submission behavior.*/
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()


/*Here, a new FormData object is created using the form element that triggered the event (event.target). The form data is 
then converted to an object using Object.fromEntries, which creates key-value pairs from the form data.*/

    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)

    // An empty array called result is initialized to store the books that match the search criteria.
    const result = []


/*This section iterates through the books array and checks if each book matches the search criteria. The genreMatch variable
is initially set based on whether the selected genre in the filters is "any." Then, a loop checks each genre of the book 
and sets genreMatch to true if a match is found.*/
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }



/*The book's title must either be empty or contain the search term (case-insensitive).
The book's author must match the selected author in the filters or be set to "any."
The book's genres must match the selected genre in the filters or genreMatch must be true (indicating a match for the "any" genre).*/

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    // The page variable is set to 1, and the matches variable is assigned the result array.
    page = 1;
    matches = result

    
    /*This code adds or removes the CSS class list__message_show from an element with the 
    attribute data-list-message based on the number of matches in the result array. If 
    there is more than one match, the class is added, otherwise it is removed.*/
    if (result.length > 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    /*The HTML content of the element with the attribute data-list-items is cleared, and a 
    new empty DocumentFragment is created to hold the new elements.*/
    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment()


    /*This loop iterates over the subset of result array from index 0 to BOOKS_PER_PAGE (a 
    constant value) and creates a button element for each book. The button element has a class 
    preview, a data-preview attribute with the book's ID, and contains an image, title, and author information.
    The newly created elements are appended to the DocumentFragment (newItems) using appendChild.*/
    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    /*The DocumentFragment (newItems) is appended to the element with the attribute 
    data-list-items. The disabled property of the element with the attribute data-
    list-button is set based on whether there are more matches beyond the current page.*/
    document.querySelector('[data-list-items]').appendChild(newItems)
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1


/*The inner HTML of the element with the attribute data-list-button is updated to display the "Show more" text and the 
remaining number of matches.*/
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `
   /* This code scrolls the window to the top with a smooth behavior and sets the open property 
    of the element with the attribute data-search-overlay to false, presumably closing an overlay or modal.*/
    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false
})

