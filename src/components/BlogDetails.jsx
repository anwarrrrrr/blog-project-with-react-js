import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";

const BlogDetails = () => {
    const { id } = useParams();
    const {
        data: blog,
        isLoading,
        failed,
    } = useFetch("http://localhost:8000/blogs/" + id);
    const [backHome, setBackHome] = useState('');
    const [isDeleted, setIsDeleted] = useState(false); // State to track deletion status

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/blogs/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`Item with ID ${id} deleted successfully!`);
                setIsDeleted(true); // Set deletion status to true
                setBackHome('Go back to the Home Page');
                // You can perform any desired action after successful deletion
            } else {
                console.error(`Error deleting item with ID ${id}.`);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {failed && <h2>{failed}</h2>}
            {isDeleted ? (
                <div>
                    <h2>Blog post deleted successfully!</h2>
                    <Link to='/'>{backHome}</Link>
                </div>
            ) : (
                blog && (
                    <article>
                        <h2>{blog.title}</h2>
                        <p>written by {blog.author}</p>
                        <div>{blog.body}</div>
                        <button onClick={() => handleDelete(blog.id)}>Delete</button>
                    </article>
                )
            )}
        </div>
    );
};

export default BlogDetails;
