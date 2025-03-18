const { useState, useEffect } = React;

const QuoteBox = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const fetchQuote = async () => {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
    }

    useEffect(() => {
        fetchQuote();
    }, []);
}