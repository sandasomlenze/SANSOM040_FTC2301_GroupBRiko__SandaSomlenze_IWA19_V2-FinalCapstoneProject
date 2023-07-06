// It imports constants (BOOKS_PER_PAGE), arrays (authors, genres), and an object (books) from a file named "data.js".
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

// It creates an object named html that stores references to various HTML elements using document.querySelector().
const html = {
    search: {
        dialog: document.querySelector('[data-search-overlay]'),
        authors: document.querySelector('[data-search-authors]'),
        genres: document.querySelector('[data-search-genres]'),
        title: document.querySelector('[data-search-title]'),
        button: document.querySelector('[data-header-search]'),
        cancel: document.querySelector('[data-search-cancel]'),
        form: document.querySelector('[data-search-form]'),
        submit: document.querySelector('[data-search-submit]')
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


// It defines functions to create HTML options for genres, createGenreOptionsHtml.
const createGenreOptionsHtml = () => {
    
    const fragment = document.createDocumentFragment();

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

// // It defines functions to create HTML options for authors, createAuthorOptionsHtml.
const createAuthorOptionsHtml = () => {
    const fragment = document.createDocumentFragment();

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


const sortBooks = (event) => {
    event.preventDefault();
    //extract search overlay values
    const search = { 
        "title" : html.search.title.value,
        "genre" : html.search.genres.value,
        "author" : html.search.authors.value }
    
    }
html.search.button.addEventListener('click',sortBooks)



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

