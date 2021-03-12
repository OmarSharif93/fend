/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


//Define Global Variables
//Selecting all the Sections 
const sections = document.querySelectorAll('section');

//Making a Document Fragment
const fragment = document.createDocumentFragment();


// End Global Variables


//Start Helper Functions
//Remove class 'your-active-class' from all sections
function removeActiveClass() {
    sections.forEach(section => {
        section.classList.remove('your-active-class');
    })
}
// End Helper Functions


//Begin Main Functions
// build the nav
function buildNav() {

    //Getting the first list 
    const list = document.querySelector('ul');

    for (const section of sections) {
        //Making const that holds the 'data' value   
        const anchorText = section.getAttribute('data-nav');

        //Making const that holds the 'id' value 
        const anchorLink = section.getAttribute('id');

        //Creating 'li' element 
        const listItem = document.createElement('li');

        //Creating an Anchor Element
        const aElement = document.createElement('a');

        //Populating the 'a' Element
        //add text
        aElement.text = anchorText;
        //add Link
        aElement.setAttribute('href', '#' + anchorLink);
        //add style class
        aElement.setAttribute('class', 'menu__link')


        //Appending the 'a' element to the 'li' element
        listItem.appendChild(aElement);

        //Appending the 'li' elements to the Document fragment
        fragment.appendChild(listItem);
    }
    //Appending the Document Fragment to the 
    list.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
function toggleActiveState() {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                //Calling remove Active class
                removeActiveClass();

                //Add the active class to the current intersecting section
                entry.target.classList.add('your-active-class');
            }
        })
    }, { threshold: 0.8 });

    //observing Sections
    sections.forEach(section => {
        observer.observe(section);
    })
}

//End Main Functions

// Build menu 
buildNav();

//Events
// Set sections as active
window.addEventListener('scroll', toggleActiveState);

//Smooth Scroll
function scrollToSection(event) {
    event.preventDefault();
    //Getting the Current Section
    sections.forEach(section => {
        if ('#' + section.getAttribute('id') === event.target.getAttribute('href')) {
            //Smoothing the scroll
            section.scrollIntoView({ behavior: "smooth", block: "center" });

        }
    })
}

//add Event Listener to every link
const navLinks = document.querySelectorAll('a').forEach(navLink => {
    navLink.addEventListener('click', scrollToSection);
})



