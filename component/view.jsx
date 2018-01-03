import React from "react";
import PropTypes from 'prop-types';

class ChatView extends React.Component {
    static propTypes = {
        chat: PropTypes.shape({
            id: PropTypes.string,
            messages: PropTypes.arrayOf(PropTypes.object)
        })
    };

    componentDidMount() {
        this.props.connectToChat();
    }

    render() {
        return this.props.render(this.props.chat.roomId, this.props.chat.messages, this.sendMessage);
    }

    /**
     * @param {string} message
     * */
    sendMessage = (message) => {
        if (!!message) {
            this.props.sendMessage(message);
        }
    };
}

export default ChatView;
