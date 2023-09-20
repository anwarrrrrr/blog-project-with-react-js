import { useNavigate } from 'react-router-dom';

// const Create = () => {
//     return <div className="create">
//         <h2>Create a new blog</h2>

//     </div>;
// }

// export default Create;

import { useState } from "react";

function Create() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");

    const [isPending, setIsPending] = useState(false); // Added isPending state

    const navigate_ = useNavigate(); // Access the history object


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "body") {
            setBody(value);
        } else if (name === "author") {
            setAuthor(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true); // Set isPending to true while the request is pending

        const blog = { title, body, author };
            try {
                const response = await fetch("http://localhost:8000/blogs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(blog),
                });

                if (response.ok) {
                    // Handle success, e.g., show a success 
                    const newBlog = await response.json(); // Parse the response to get the newly created blog
                    console.log('New blog created:', newBlog);

                // Redirect to the new blog's URL
                    navigate_(`/blogs/${newBlog.id}`);

                } else {
                    // Handle errors, e.g., show an error message
                    alert("Error sending data.");
                }
            } catch (error) {
                // Handle network errors
                console.error("Network error:", error);
            } finally {
               // setIsPending(false); // Set isPending to false after the request completes
                console.log('im still here')

            }
        // navigate_("/");

    };
    return (
        <div className="create">
            <h2>Sample Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text_field">Title</label>
                <input
                    type="text"
                    id="text_field"
                    name="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <label htmlFor="textarea">Body</label>
                <textarea
                    id="textarea"
                    name="body"
                    rows="4"
                    cols="50"
                    placeholder="Enter body"
                    value={body}
                    onChange={handleChange}
                    required
                ></textarea>
                <br />
                <br />
                <label htmlFor="select_option">Author</label>
                <select
                    id="select_option"
                    name="author"
                    value={author}
                    onChange={handleChange}
                    required
                >
                    <option value="mario">mario</option>
                    <option value="yushi">yushi</option>
                </select>
                <br />
                <br />
                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && <p>Sending data, please wait...</p>}{" "}
            </form>
            {/* Loading message when isPending is true */}
        </div>
    );
}

export default Create;
