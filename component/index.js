import { connect } from "react-redux";

import {
    connectionToChatClosed,
    connectToChatFailed,
    connectToChatRequested,
    connectToChatSucceeded,
    messageReceived,
    sendMessage
} from "../actions/creators";

import SocketClient from "../services/socket";
import ChatView from "./view";

const mapStateToProps = ({ chatReducer }, { options, query }) => {
    const socketClient = new SocketClient({ options, query });
    return {
        chat: chatReducer.find(chat => chat.roomId === socketClient.getRoomId()) || {},
        socketClient
    }
};

const mapDispatchToProps = (dispatch) => ({
    connectToChat: async function () {
        const roomId = this.socketClient.getRoomId();

        dispatch(connectToChatRequested(roomId));

        this.socketClient.onConnect(() => this.onConnection(roomId));
        this.socketClient.onDisconnect(() => this.onError(roomId));
        this.socketClient.onError(() => this.onDisconnection(roomId));
    },
    /**
     * @param {string} roomId
     * */
    onConnection(roomId) {
        dispatch(connectToChatSucceeded(roomId));
        this.socketClient.subscribe(SocketClient.MESSAGE_EVENT_NAME, (message) => this.onMessage(roomId, message));
    },
    /**
     * @param {string} roomId
     * */
    onDisconnection(roomId) {
        dispatch(connectionToChatClosed(roomId));
    },
    /**
     * @param {string} roomId
     * */
    onError(roomId) {
        dispatch(connectToChatFailed(roomId));
    },
    /**
     * @param {string} roomId
     * @param {string} message
     * */
    onMessage(roomId, message) {
        dispatch(messageReceived(roomId, message));
    },
    /**
     * @param {string} message
     * */
    sendMessage(message) {
        const socketUrl = this.socketClient.getUrl();
        dispatch(sendMessage(socketUrl, message));
        this.socketClient.sendMessage(message);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
