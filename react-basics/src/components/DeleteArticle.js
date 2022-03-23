import axios from 'axios';
import React from 'react';

const DeleteArticle = ({id}) => {//({id}) est pareille que props.id
    const handleDelete = () => {
        console.log("yes !");
        axios.delete('http://localhost:3004/articles/' + id)
    }

    return (
        <button 
            onClick={() => {
                if(window.confirm("Voulez-vous supprimer cet article ?")) {
                    handleDelete();
                }
            }}
        >
            supprimer
        </button>
    );
};

export default DeleteArticle;