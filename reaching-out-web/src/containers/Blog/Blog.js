import React, {Component} from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from 'axios';
import './Blog.css';

class Blog extends Component {
  state = {
    post: [],
    selectedPostId: null
  };

  async componentDidMount() {
    const post = await axios.get('https://jsonplaceholder.typicode.com/posts');
    let updatedPost = post.data.slice(0, 4);
    updatedPost = updatedPost.map(post => {
      return {
        ...post,
        author: 'José Cedeño'
      }
    });
    this.setState({post: updatedPost});
    console.log(this.state.post);
  }

  postSelectedHandler = id => {
    this.setState({selectedPostId: id});
  };

  render() {
    const post = this.state.post.map(post => <Post key={post.id} clicked={() => this.postSelectedHandler(post.id)}
                                                   title={post.title} author={post.author}/>);
    return (
      <div>
        <section className="Posts">
          {post}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId}/>
        </section>
        <section>
          <NewPost/>
        </section>
      </div>
    );
  }
}

export default Blog;