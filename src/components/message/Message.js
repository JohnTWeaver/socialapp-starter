import React from "react";
import DataService from "../../dataService";
import { Link, Route } from "react-router-dom";
import profilepic from "../defualtpicture/freeiconlibrary.jpg";
import "./Message.css";
class Message extends React.Component {
  constructor(props) {
    super(props);
    // const client = new DataService();

    this.client = new DataService();
    this.state = {
      likeCount: this.props.likes.length,
      picture: null,
      userlikes: [],
      // username: this.props.username,
      // picture: "",
    };
  }
  // let temp = this.client.getUsername();
  // this.setState({ username: temp });

  handleLike = () => {
    // const client = new DataService();
    const username = this.client.getUsername();
    if (this.props.likes.some((like) => like.username === username)) return;
    this.client.postLike(this.props.id).then((like) => {
      console.log("liked");
      this.setState((newState) => ({ likeCount: newState.likeCount + 1 }));
    });
    // .catch(() => {
    //   alert("Already liked");
    // });
  };

  handlediLike = () => {
    // const client = new DataService();
    const username = this.client.getUsername();
    this.client.removeLike(this.props.id).then(() => {
      console.log("dislike");
      this.setState((newState) => ({ likeCount: newState.likeCount - 1 }));
    });
    // .catch(() => {
    //   alert("Already liked");
    // });
  };

  componentDidMount() {
    const usrnme = this.props.username;
    // console.log(usrnme);
    // console.log(usrnme);
    this.client
      .getPicture(usrnme)
      .then((result) => {
        // console.log(result);
        this.setState({
          picture: `https://socialapp-api.herokuapp.com/users/${usrnme}/picture`,
        });
      })
      .catch(() => {
        this.setState({
          picture: profilepic,
        });
      });

    this.client.getMessage(this.props.id).then((response) => {
      this.setState({
        userlikes: response.data.likes,
      });
    });
  }

  render() {
    return (
      <li
        style={{ paddingTop: "20px", fontSize: "20px", fontFamily: "serif" }}
        className="Message"
      >
        {/* {console.log(this.state.likes)} */}
        <Route>
          <Link to="/SearchUser">
            <img
              style={{ width: "50px", height: "50px", borderRadius: "60px" }}
              className="userprofile"
              alt="user-pic"
              src={this.state.picture}
            />
          </Link>
        </Route>
        {/* <img className="userprofile" alt="user-pic" src={this.state.pic} /> */}
        Posted by: {this.props.username}
        <br />
        {this.props.text}
        <br />
        <div
          style={{ fontSize: "30px", textAlign: "right" }}
          className="like-counter"
        >
          😊 {this.props.likes.length}
        </div>{" "}
        {/* <form> */}
        <button
          style={{
            background: "transparent",
            border: "none",
            fontSize: "30px",
            textAlign: "right",
          }}
          onClick={this.handleLike}
        >
          👍
        </button>
        {/* <button
          style={{
            background: "transparent",
            border: "none",
            fontSize: "30px",
            textAlign: "right",
          }}
          onClick={this.handlediLike}
        >
          👎
        </button> */}
        {/* </form> */}
      </li>
    );
  }
}
export default Message;
