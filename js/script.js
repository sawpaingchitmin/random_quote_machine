const { useState, useEffect } = React;

const QuoteBox = () => {
    const [quote, setQuote] = useState("");     // State to store the quote text
    const [author, setAuthor] = useState("");   // State to store the author name

    // Function to fetch a random quote from the API
    const fetchQuote = async () => {
        try {
            const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
            // If the response is not OK, throw an error
            if (!response.ok) { 
                throw new Error("API doesn't response");
            }
            const data = await response.json(); // Parse the JSON response
            const quotesArray = data.quotes;    // Access the quotes array
            const randomIndex = Math.floor(Math.random() * quotesArray.length)   // Generate a random index
            const randomQuote = quotesArray[randomIndex];  // Pick a random quote from the array
            
            // If a quote is found, set it in the state
            if (randomQuote) {
                setQuote(randomQuote.quote);
                setAuthor(randomQuote.author);
            } else {
                console.error("No quote found.");
            }     
            
        } catch (error) {
            console.error("Error fetching the quote:", error);  // Log error if fetching fails
        }
    }

    // Use useEffect to fetch the quote when the component mounts
    useEffect(() => {
        fetchQuote();
    }, []); // Empty dependency array means this runs only once on mount

    
    return (
        <div id="quote-box">
            <div id="text">"{quote}"</div>       {/* Display the quote */}
            <div id="author">- {author}</div>    {/* Display the author of the quote */}
            <button id="new-quote" onClick={fetchQuote}>New Quote</button>  {/* Button to fetch a new quote when clicked */}

            {/* Link to share the quote on Twitter */}
            <a 
                id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
                target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-twitter"></i>
            </a>
        </div>
    );
};

// Render the QuoteBox component inside the element with the ID 'wrapper'
ReactDOM.createRoot(document.getElementById("wrapper")).render(<QuoteBox />);