const scriptURL = 'https://script.google.com/macros/s/AKfycbyjd1KWn9FiN53To5DBf3xM_vrgudsNrpqgNevRrR0fL6FvNLaENaOKtjPnhXZl4KAy/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})


function download(file, text) {
 
    //creating an invisible element

    var element = document.createElement('a');
    element.setAttribute('href',
        'data:text/plain;charset=utf-8, ');
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

// Start file download.

document.getElementById("btn")
    .addEventListener("click", function () {

        var filename = "lulu.png";

        download(filename);
    }, false);