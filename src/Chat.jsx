import React, { Component } from 'react'
import PropTypes from 'prop-types'
import man from './man.png'
import manS from './man-s.png'

const CHATBOT_WAIT = 1000;

class ChatbotMessage extends Component {
  componentDidMount() {
    const { audio } = this.props;
    audio.playSentence(this.props.text, audio.manSampleMap)
  }

  render() {
    return (
      <div className="chatbot-message">
        <div className="limited">
          <img src={man} alt="" />
        </div>
        <div className="text">
          {this.props.text}
        </div>
      </div>
    )
  }
}

const HumanMessage = ({ text }) => (
  <div className="human-message">
    <div className="limited">
      <img src={manS} alt="" />
    </div>
    <div className="text">
      {text}
    </div>
  </div>
)

const Message = ({
  isChatbot,
  text,
  audio,
}) => {
  return (
    <li className="message">
      {isChatbot
        ? <ChatbotMessage text={text} audio={audio} />
        : <HumanMessage text={text} />}
    </li>
  )
}

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      text: '',
      thankyou: false,
    }
  }

  handleTextChange = e => this.setState({ text: e.target.value })
  handleThankyou = e => this.setState({ thankyou: true })

  appendMessage = (message) => {
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  appendHumanMessage = text => {
    const message = { text, isChatbot: false }
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  handleChatSubmit = (e) => {
    e.preventDefault()
    this.appendHumanMessage(this.state.text)
    setTimeout(() => { 
      this.appendMessage({ isChatbot: true, text: 'Hello world' })
    }, CHATBOT_WAIT)
    this.setState({ text: '' })
  }

  render() {
    return this.state.thankyou ? <h1>Thank you!</h1> : (
      <div className="chat">
        <div className="screen">
          <ul className="messages">
            {this.state.messages.map((m, i) => {
              return (
                <Message
                  key={`${i}-${m.text}`}
                  {...m}
                  audio={this.props.audio}
                />
              )
            })}
          </ul>
          <div className="text-container">
            <form onSubmit={this.handleChatSubmit}>
              <input type="text" onChange={this.handleTextChange} value={this.state.text} />
            </form>
          </div>
        </div>
        <div className="bottom"><div className="iphone-btn" onClick={this.handleThankyou}></div></div>
      </div>
    )
  }
}

Chat.propTypes = { audio: PropTypes.object }

export default Chat