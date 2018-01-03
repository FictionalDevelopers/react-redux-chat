import { CONNECTION_SUCCEEDED, MESSAGE_RECEIVED } from '../actions/names';

/**
 * @typedef {object} Chat
 * @property {string} roomId
 * @property {string[]} messages
 * */

const initialChats = [];

/**
 * @param {Chat[]} chats
 * @param {string} roomId
 *
 * */
function addChatToState(chats, roomId) {
    let chat = findChat(chats, roomId);
    if (!chat) {
        return [
            ...chats,
            createChat(roomId)
        ]
    }

    return chats;
}

/**
 * @param {Chat[]} chats
 * @param {string} roomId
 *
 * @returns {Chat|null}
 * */
function findChat(chats, roomId) {
    return chats.filter(chat => chat.roomId === roomId)[0] || null;
}

/**
 * @param {string} roomId
 * @returns {Chat}
 * */
function createChat(roomId) {
    return {
        roomId,
        messages: []
    };
}

/**
 * @param {Chat[]} chats
 * @param {string} roomId
 * @param {string} message
 * */
function addMessageToChat(chats, roomId, message) {
    return chats.map(chat => chat.roomId !== roomId
        ? chat
        : ({
            ...chat,
            messages: [
                ...chat.messages,
                message
            ]
        }));
}

export default (state = initialChats, action) => {
    const { type, payload } = action;

    switch (type) {
        case CONNECTION_SUCCEEDED:
            return addChatToState(state, payload.roomId);
        case MESSAGE_RECEIVED: {
            return [
                ...addMessageToChat(state, payload.roomId, payload.message)
            ];
        }
        default :
            return state;
    }
};
