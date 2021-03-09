import { useEffect, useState } from "react";
import axios from "../util/axios-instance";

function PostOverview() {
  const [postState, setPostState] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/posts/");
        setPostState(data);
      } catch (err) {
        console.log(err, err.message);
      }
    })();
  }, []);

  const Posts = () => {
    if (postState) {
      const posts = postState.map(post => (
        <div className='post' key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <img src={post.headerImage} alt={post.title} />
        </div>
      ));
      return posts;
    } else {
      return <h1>...loading</h1>;
    }
  };

  return (
    <div className='post-overview'>
      <h1>Overview</h1>
      <Posts />
    </div>
  );
}

export default PostOverview;
