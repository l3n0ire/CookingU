import React, { Component } from 'react';
import Pusher from 'pusher-js';
import ChatBubble from '../general/ChatBubble';
import './styles/RecipeChat.css';


export default class RecipeChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',
            conversation: [],
        };
    }

    componentDidMount() {
        const pusher = new Pusher('1d505f54c72a221936fc', {
            cluster: 'mt1',
            encrypted: true,
        });

        const channel = pusher.subscribe('bot');
        channel.bind('bot-response', data => {
            const msg = {
                text: data.message,
                user: 'ai',
            };
            this.setState({
                conversation: [...this.state.conversation, msg],
            });
        });
    }

    handleChange = event => {
        this.setState({ userMessage: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.userMessage.trim()) return;

        const msg = {
            text: this.state.userMessage,
            user: 'human',
        };

        this.setState({
            conversation: [...this.state.conversation, msg],
        });

        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: this.state.userMessage,
            }),
        });

        this.setState({ userMessage: '' });
    };
    
    render() {

        const chat = this.state.conversation.map((e, index) =>
            <ChatBubble key={index} text={e.text} i={index} className={e.user} />
        );

        return (
            <div>
                <h1>React Chatbot</h1>
                <div className="chat-window">
                    <div className="conversation-view">{chat}</div>
                    <div className="message-box">
                        <form onSubmit={this.handleSubmit}>
                            <input
                                value={this.state.userMessage}
                                onInput={this.handleChange}
                                className="text-input"
                                type="text"
                                autoFocus
                                placeholder="Type your message and hit Enter to send"
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
