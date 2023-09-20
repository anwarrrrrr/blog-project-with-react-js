// import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";
function Home() {
    const {
        data: blogs,
        isLoading,
        failed,
    } = useFetch("http://localhost:8000/blogs");

    return (
        <div className="home">
            {isLoading && <div>Loading...</div>}
            {failed && <h2> {failed} </h2>}
            {blogs && <BlogList blogs={blogs} listTitle="All Blogs" />}
            {blogs && (
                <BlogList
                    blogs={blogs.filter((blog) => blog.author === "mario")}
                    listTitle="Mario's Blogs"
                />
            )}
        </div>
    );
}

export default Home;
