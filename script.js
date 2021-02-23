const quoteContainer = document.getElementById('container');
const quoteText = document.getElementById('quote');
const auteurText = document.getElementById('auteur');
const twitterBtn = document.getElementById('btn-twiit'); 
const Newq = document.getElementById('neaveaux');
const another=document.getElementById('another');
const loader = document.getElementById('loader');


function loadingPage() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoading() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


async function getQuoteFromapi() {
    let i=0;
    loadingPage();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
    const data= await response.json();
if (!data.quoteAuthor){
    auteurText.innerText="Unknown";
}else{
   
    auteurText.innerText=data.quoteAuthor;
   
}
another.innerText=`Another ${data.quoteAuthor} quotes`;

if (data.quoteText.length > 120) {
    quoteText.classList.add('longe-text');
} else {
    quoteText.classList.remove('longe-text');
}
 quoteText.innerText=data.quoteText;
 
 removeLoading();
} catch (error) { 
    if (i < 10){
        getQuoteFromapi();
        i = i + 1;
    }
    else{
        alert("oops something is wrong with this page. Please try again .")
    }
}
}


//get quotes from the same author
async function anotherquote(){
    let i=0;
    const proxy = 'https://whispering-tor-04671.herokuapp.com/';
    const api = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxy + api);
    const data= await response.json();
if (data.quoteAuthor=auteurText.textContent ){
    quoteText.innerText=data.quoteText;
}else{
   
    quoteText.innerText="none";
   
}
} catch (error) {    
        if (i < 10){
            anotherquote();  
            i = i + 1;
        }
        else{
            alert("oops something is wrong with this page. Please try again .")
        }
}
}

//pub in twitter
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${auteurText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
Newq.addEventListener('click', getQuoteFromapi);
another.addEventListener('click',anotherquote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuoteFromapi();

