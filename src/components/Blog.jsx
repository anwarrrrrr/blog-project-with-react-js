import { Link } from "react-router-dom";


function Blog({ title, body, author, id }) {
    return (

        <div className="blog-preview">
            <Link to={'blogs/' + id}>
                <h2>{title}</h2>
                <p>written by {author}</p>
            </Link>
        </div>

    );
}

export default Blog;