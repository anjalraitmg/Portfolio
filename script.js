// List of websites to display
const websites = [
    { name: "Example 1", url: "https://www.example1.com" },
   // { name: "Example 2", url: "https://www.example2.com" },
    //{ name: "Example 3", url: "https://www.example3.com" },
  //  { name: "Example 4", url: "https://www.example4.com" },
   // { name: "Example 5", url: "https://www.example5.com" }
];

// Function to create buttons dynamically
function generateButtons() {
    const linksContainer = document.querySelector('.links-container');
    linksContainer.innerHTML = '';  // Clear existing links

    websites.forEach(website => {
        const button = document.createElement('button');
        button.classList.add('site-button');
        button.textContent = website.name;
        button.onclick = () => window.location.href = website.url;
        linksContainer.appendChild(button);
    });
}

// Call the function to generate buttons on page load
generateButtons();
