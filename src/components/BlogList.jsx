import Blog from "./Blog";



function BlogList({ blogs, listTitle }) {


    return (
        <div >
            <h2>{listTitle}</h2>
            {blogs.map(blog =>
                <Blog title={blog.title} body={blogs.body} author={blog.author} id={blog.id} key={blog.id} />)}
        </div>
    );
}

export default BlogList;