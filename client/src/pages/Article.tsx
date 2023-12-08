import React from "react";
import { useParams } from "react-router-dom";

function Article() {
    const { articleId } = useParams();
    return (
        <div>
            <h1>Article</h1>
            <p>This is the article page for article id {articleId}</p>
        </div>
    );
}
export default Article;