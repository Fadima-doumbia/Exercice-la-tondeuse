import React, { useState } from 'react';
import axios from 'axios';
import DeleteArticle from './DeleteArticle';

const Article = (articleProps) => {
    // const url = "http://localhost:3004/articles";
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditContent] = useState("");

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour:"numeric",
            minute: "numeric",
            second:"numeric"
        });
        return newDate;
    }

    const handleEdit = () => {
        const data = {
            author: articleProps.articleProps.author,
            content:editedContent ? editedContent : articleProps.articleProps.content,//si je valide la modification sans avoir rien changér dans le texte, il prendra en compte le texte avant l'edit (sinon il va ecraser l'ancien texte)
            date: articleProps.articleProps.date
        }
        axios.put('http://localhost:3004/articles/' + articleProps.articleProps.id, data)
        .then(() => {

            setIsEditing(false);
        })
    }

    return (
        <div className='article' style={{background: isEditing ? "#f3feff" : "white"}}>
            <div className='card-article'>
                <h3>{articleProps.articleProps.author}</h3>
                <em>Posté le {dateParser(articleProps.articleProps.date)}</em>
            </div>
            {/* switche textara and p */}
            {isEditing ? (
                <textarea onChange={(e) => setEditContent(e.target.value)} 
                autoFocus 
                // affiche le texte modifier si l'on veut remodifier apres une modification
                defaultValue={editedContent ? editedContent : articleProps.articleProps.content}
                ></textarea>
            ) : (
                <p>{editedContent ? editedContent : articleProps.articleProps.content}</p>
            )}

            <div className='btn-container'>
                {isEditing ? (//si on edit aafficher valiser sinon afficher edit
                    <button onClick={handleEdit}>Valider</button>
                ) : (
                    <button
                    onClick={() => setIsEditing(true)}//pour switcher d'un p à une textearea pendant l'edit du texte 
                    >Edit</button>
                )}
                <DeleteArticle id={articleProps.articleProps.id} />
            </div>
        </div>
    );
};

export default Article;