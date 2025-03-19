const { useState, useEffect } = React;

const QuoteBox = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const fetchQuote = async () => {
        try {
            const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
            if (!response.ok) {
                throw new Error("API doesn't response");
            }
            const data = await response.json();
            console.log(data);
            const quotesArray = data.quotes;  // Access the quotes array
            console.log(quotesArray)
            const randomIndex = Math.floor(Math.random() * quotesArray.length)
            console.log("Random Index:", randomIndex)
            const randomQuote = quotesArray[randomIndex];  // Pick a random quote from the array
           
            if (randomQuote) {
                setQuote(randomQuote.quote);
                setAuthor(randomQuote.author);
            } else {
                console.error("No quote found.");
            }     
            
        } catch (error) {
            console.error("Error fetching the quote:", error);
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div id="quote-box">
            <div id="text">"{quote}"</div>
            <div id="author">- {author}</div>
            <button id="new-quote" onClick={fetchQuote}>New Quote</button>
            <a 
                id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
                target="_blank" rel="noopener noreferrer">
            Tweet
            </a>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("wrapper")).render(<QuoteBox />);