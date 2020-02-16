import React, { Component } from 'react';
import ReactVoiceInput from 'react-voice-input'
import Pusher from 'pusher-js';
import ChatBubble from '../general/ChatBubble';
import RecipeCard from '../general/RecipeCard';
import './styles/RecipeChat.css';

export default class RecipeChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',
            conversation: [],
            equipment: [],
            ingredients: [],
            currentInstruction: [],
            instructions: [],
            currentI: 0,
            hasRecipe: false,
            listening: false,
        };
        this.onResult = this.onResult.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
    }

    pushMSGandPlay(message) {
        const msg = {
            text: message,
            user: 'ai',
        };
        this.setState({
            conversation: [...this.state.conversation, msg],
        });
    }

    resetInstructions() {
        this.setState({
            equipment: [],
            instructions: [],
            currentInstruction: [],
            currentI: 0,
            hasRecipe: false
        });
    }

    componentDidMount() {
        const pusher = new Pusher('1d505f54c72a221936fc', {
            cluster: 'mt1',
            encrypted: true,
        });


        const channel = pusher.subscribe('bot');
        channel.bind('bot-response', data => {
            this.pushMSGandPlay(data.message);
        });

        channel.bind('give-instruction', data => {
            if (!this.state.hasRecipe) {
                this.setState({
                    hasRecipe: true,
                    instructions: data.instructions,
                });
                this.setState({
                    currentInstruction: [`${this.state.instructions[this.state.currentI].step}`],
                    //equipment: this.state.instructions[this.state.currentI].equipment,
                    //ingredients: this.state.instructions[this.state.currentI].ingredients,
                });
                this.pushMSGandPlay(data.message);
                this.pushMSGandPlay(this.state.currentInstruction[0]);
            }

        });

        channel.bind('next-instruction', data => {
            if (this.state.hasRecipe) {
                if (this.state.currentI + 1 < this.state.instructions.length) {
                    let stringNext = (this.state.instructions[this.state.currentI + 1].step).toString()
                    let currentArray = this.state.currentInstruction
                    this.setState({
                        currentInstruction: [stringNext, ...currentArray],
                        currentI: this.state.currentI + 1,
                    });
                    this.pushMSGandPlay(this.state.currentInstruction[0]);
                }
                else {
                    this.pushMSGandPlay("Were done!");
                    this.resetInstructions();
                }
            }
        });

        channel.bind('exit-instructions', data => {
            if (this.state.hasRecipe) {
                this.pushMSGandPlay(data.message);
                this.resetInstructions();
            }

        });

        channel.bind('repeat-instruction', data => {
            if (this.state.hasRecipe) {
                this.pushMSGandPlay(data.message);
                this.pushMSGandPlay(this.state.currentInstruction[0]);
            }
        });
    }

    onInputChange = (event) => {
        this.setState({ userMessage: event.target.value })
    }

    onResult(result) {
        this.setState({
            userMessage: result
        })
    }

    onEnd = () => {
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
    }

    render() {
        const chat = this.state.conversation.map((e, index) =>
            <ChatBubble key={index} text={e.text} i={index} className={e.user} />
        );

        const instruct = Array.isArray(this.state.currentInstruction) && this.state.currentInstruction.map((item, k) => 
            <RecipeCard key={k} instruction={item} equipment={this.state.equipment} ingredients={this.state.ingredients} />
        );

        return (
            <div>
                <h1>CookingU Cooks With U</h1>
                <div className="container">
                    <div className="chat-window">
                        <div className="conversation-view">{chat}</div>
                        <div className="message-box">
                            <ReactVoiceInput
                                onResult={this.onResult}
                                onEnd={this.onEnd}>
                                <input id="main-inputbox" type='text' value={this.state.userMessage} onChange={this.onInputChange} />
                            </ReactVoiceInput>
                        </div>
                    </div>
                    <div className="recipeCards">
                        {instruct}
                    </div>
                </div>
            </div>
        )
    }
}