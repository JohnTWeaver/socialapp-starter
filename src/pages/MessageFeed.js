import React from "react";
import DataService from "../dataService";
import { userIsAuthenticated } from "../redux/HOCs";
import "./MessageFeed.css";

// import { message, Result } from "antd";
import Message from "../components/message/Message";
import CreateMessage from "./CreateMessage";

class MessageFeed extends React.Component {
  constructor(props) {
    super(props);
    this.client = new DataService();
  }

  state = { messages: [] };

  componentDidMount() {
    if (this.props.limit === 5) {
      this.client.getMessages().then((response) =>
        this.setState({
          messages: response.data.messages,
        })
      );
    } else
      this.interval = setInterval(() => {
        this.client.getMessages(10).then((response) =>
          this.setState({
            messages: response.data.messages,
          })
        );
      }, 2000);
  }

  // this.client
  // .getMessages()
  // .then((response) => this.setState({ messages: response.data.messages }));
  //}

  // setInterval(componentDidMount(), 5000);
  render() {
    if (this.state.messages.length === 0) {
      return (
        <div className="loading">
          <h3>loading</h3>
        </div>
      );
    }
    // return (
    //   <div style={{ fontSize: "25px", fontStyle: "inherit", fontFamily: "revert" }} className="messagefeed" >
    //     {/* <Menu isAuthenticated={this.props.isAuthenticated} /> */}
    //     {/* messages go here test */}

    return (
      <div className="messagefeed">
        {console.log(this.props)}
        <CreateMessage />
        <ul>
          {this.state.messages.map((messageObject) => (
            <Message key={messageObject.id} {...messageObject} />
          ))}
          {/* {console.log(this.props)} */}
        </ul>
      </div>
    );
  }
}

export default userIsAuthenticated(MessageFeed);
