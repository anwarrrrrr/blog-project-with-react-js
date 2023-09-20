import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Create() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");

  const [isPending, setIsPending] = useState(false); // Added isPending state

  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Access the history object

  // Determine whether you're in "edit" mode based on the presence of id
  const isEditMode = !!id;

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
      if (isEditMode) {
        // If in "edit" mode, send a PUT or PATCH request to update the existing blog post
        const response = await fetch(`http://localhost:8000/blogs/${id}`, {
          method: "PUT", // Use PUT or PATCH for updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        });

        if (response.ok) {
          console.log(`Blog with ID ${id} updated successfully!`);
          navigate(`/blogs/${id}`);
        } else {
          console.error(`Error updating blog with ID ${id}.`);
        }
      } else {
        // If in "create" mode, send a POST request to create a new blog post
        const response = await fetch("http://localhost:8000/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        });

        if (response.ok) {
          const newBlog = await response.json(); // Parse the response to get the newly created blog
          console.log("New blog created:", newBlog);

          // Redirect to the new blog's URL
          navigate(`/blogs/${newBlog.id}`);
        } else {
          console.error("Error creating a new blog.");
        }
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    } finally {
      setIsPending(false); // Set isPending to false after the request completes
      console.log("im still here");
    }
    // navigate("/");
  };

  useEffect(() => {
    // Fetch the existing blog post data based on the id
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/blogs/${id}`);
        if (response.ok) {
          const blogData = await response.json();
          setTitle(blogData.title);
          setBody(blogData.body);
          setAuthor(blogData.author);
        } else {
          // Handle the error and set the error message
          setError("Error fetching blog data. Please try again later.");
      }
  } catch (error) {
      // Handle network errors and set the error message
      setError("Network error. Please check your internet connection.");
  }

    };

    // Call the fetchBlogData function when id changes (component mounts or id changes)
    if (isEditMode) {
      fetchBlogData();
    }
  }, [id, isEditMode]);

  return (
    <div className="create">
      
      {!error && (<form onSubmit={handleSubmit}>
      <h2>Create Blog</h2>
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
        <label htmlFor="textarea">Body</label>
        <textarea
          id="textarea"
          name="body"
          rows="10"
          cols="50"
          placeholder="Enter body"
          value={body}
          onChange={handleChange}
          required
        ></textarea>
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

        {isPending ? (
          <p>Sending data, please wait ...</p>
        ) : (
          <button type="submit">{isEditMode ? "Save" : "Add Blog"}</button>
        )}
        {/* <h2>{error}</h2> */}
      </form>)}
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default Create;
