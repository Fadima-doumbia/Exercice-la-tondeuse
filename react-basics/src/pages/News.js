import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios  from 'axios';
import Article from '../components/Article';
const News = () => {
    const url = "http://localhost:3004/articles";
    const [newsData, setNewsData] =  useState([])
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
      getData();
    
    }, []);
    
    const getData = () => {
        axios.get(url).then((res) => 
        setNewsData(res.data))
    }

    const handleSubmit = (e) => {//avant envois 
        e.preventDefault();

        if (content.length < 40) {
            setError(true);

        } else {
            axios.post(url, {//envoi formulaire
                author:author,
                content: content,
                date: Date.now(),
                // author, on peut ecrire comme ca si l'index et la variable ont exactement le meme nom
                // content,
                // date: Date.now(),
            }).then(() => {//apres envois du formulaire vider les input
                setError(false);
                setAuthor("");
                setContent("");
                getData(); //auto actualisation
            })
        }
    }


    return (
        <div className='news-container'>
            <Navigation />
            <Logo />
            <h1>News</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                onChange={(e) => setAuthor(e.target.value)} 
                type="text" 
                placeholder='Nom'
                value={author} />
                <textarea 
                style={{border: error ? "1px solid red" : "1px solid #61dafb"}}
                onChange={(e) => setContent (e.target.value)} 
                placeholder='Message'
                value={content}//pour vider les input apres le post
                ></textarea>
                {error && <p>Veillez écrire un minimum de140 caractère</p>}
                <input type="submit" value="Envoyer"></input>
            </form>

            <ul>
                {newsData
                .sort((a,b) => b.date - a.date)
                .map((article) => 
                    <Article key={article.id} articleProps={article} />)}
                <li></li>
            </ul>
        </div>
    );
};

export default News;