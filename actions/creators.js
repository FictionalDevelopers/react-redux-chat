import {
    CONNECTION_CLOSED,
    CONNECTION_FAILED,
    CONNECTION_REQUESTED,
    CONNECTION_SUCCEEDED,
    MESSAGE_RECEIVED,
    MESSAGE_SEND_REQUEST
} from "./names";

/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {object} [payload]
 */

/**
 * @param {string} roomId
 *
 * @returns {Action}
 * */
export const connectToChatRequested = (roomId) => ({
    type: CONNECTION_REQUESTED,
    payload: { roomId }
});

/**
 * @param {string} roomId
 *
 * @returns {Action}
 * */
export const connectToChatSucceeded = (roomId) => ({
    type: CONNECTION_SUCCEEDED,
    payload: { roomId }
});

/**
 * @param {string} roomId
 *
 * @returns {Action}
 * */
export const connectToChatFailed = (roomId) => ({
    type: CONNECTION_FAILED,
    payload: { roomId }
});

/**
 * @param {string} roomId
 *
 * @returns {Action}
 * */
export const connectionToChatClosed = (roomId) => ({
    type: CONNECTION_CLOSED,
    payload: { roomId }
});

/**
 * @param {string} roomId
 * @param {string} message
 *
 * @returns {Action}
 * */
export const messageReceived = (roomId, message) => ({
    type: MESSAGE_RECEIVED,
    payload: {
        roomId,
        message
    }
});

/**
 * @param {string} url
 * @param {string} message
 *
 * @returns {Action}
 * */
export const sendMessage = (url, message) => ({
    type: MESSAGE_SEND_REQUEST,
    payload: {
        url,
        message
    }
});
