let inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const ulEl = document.querySelector('.ulEl');
const deleteBtn = document.querySelector('#delete-btn');
const tabBtn = document.querySelector("#tab-btn");
let myLinks = [];
const myLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (myLocalStorage) {
    myLinks = myLocalStorage;
    renderLinks();
}

function renderLinks() {
    let listitems ='';
    for (let i = 0; i < myLinks.length; i++) {
        listitems += `
        <li>
            <a href="https://${myLinks[i]}" target="_blank" > ${myLinks[i]} </a>
        </li>`
    }

    ulEl.innerHTML = listitems;

}


inputBtn.addEventListener('click', function () {

    myLinks.push(inputEl.value);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    
    // let li = document.createElement('li');
    // li.textContent = myLinks[myLinks.length-1];
    // ulEl.append(li);

    inputEl.value = '';
    renderLinks();
   
});



deleteBtn.addEventListener("click", function () {
    localStorage.clear();
    myLinks = [];
    renderLinks();
});

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active:true, currentWindow:true, function (tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        renderLinks();
        console.log(tabs[0].url);
    }})

});