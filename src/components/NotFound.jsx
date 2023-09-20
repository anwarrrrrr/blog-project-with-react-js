import { Link } from "react-router-dom";

function NotFound() {
    return (
      <div class="not-found">
        <h2>404 - Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p> <br />
        <Link to='/'>Back to the Home Page</Link>
      </div>
    );
  }
  
  export default NotFound;