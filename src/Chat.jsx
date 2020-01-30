import React, { Component } from 'react'
import PropTypes from 'prop-types'
import man from './man.png'
import manS from './man-s.png'
import chatbotMsgs from './chatbot-messages.json'

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
      nextChatbotMsg: 0,
    }
  }

  handleTextChange = e => this.setState({ text: e.target.value })
  handleThankyou = e => this.setState({ thankyou: true })

  appendMessage = (message) => {
    this.setState({
      messages: [...this.state.messages, message]
    }, () => {
      this.messages.scrollTo(0, this.messages.scrollHeight)
    })
  }

  createChatbotMsg = () => {
    const { nextChatbotMsg } = this.state;
    const nextText = chatbotMsgs[nextChatbotMsg]
    this.setState({ nextChatbotMsg: nextChatbotMsg + 1 > (chatbotMsgs.length - 1) ? 0 : nextChatbotMsg + 1 })
    return {
      isChatbot: true,
      text: nextText,
    }
  }

  handleChatSubmit = (e) => {
    e.preventDefault()
    this.appendMessage({ isChatbot: false, text: this.state.text })
    setTimeout(() => { 
      const cbMsg = this.createChatbotMsg()
      this.appendMessage(cbMsg)
    }, CHATBOT_WAIT)
    this.setState({ text: '' })
  }

  render() {
    return this.state.thankyou ? <h1>Thank you!</h1> : (
      <div className="chat">
        <div className="screen">
          <ul className="messages" ref={ref => this.messages = ref}>
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