import React, {Component} from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from 'axios';
import './Blog.css';

class Blog extends Component {
  state = {
    post: [],
    selectedPostId: null,
    errors: false
  };

  async componentDidMount() {
    try {
      const post = await axios.get('/posts/');
      let updatedPost = post.data.slice(0, 4);
      updatedPost = updatedPost.map(post => {
        return {
          ...post,
          author: 'José Cedeño'
        }
      });
      this.setState({post: updatedPost});
    } catch (err) {
      console.log('Paso por aca'+err);
      this.setState({errors: true});
    }
  }

  postSelectedHandler = id => {
    this.setState({selectedPostId: id});
  };

  render() {
    let post = <p>Something went wrong!!</p>;
    if (!this.state.errors)
      post = this.state.post.map(post => <Post key={post.id}
                                               clicked={() => this.postSelectedHandler(post.id)}
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
