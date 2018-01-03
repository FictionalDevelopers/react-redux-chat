import io from "socket.io-client";

/**
 * @typedef {object} Options
 * @property {string} url
 * @property {string} [namespace]
 * @property {string} [displayName]
 * @property {string} [id]
 * */

const sockets = {};

class SocketClient {
    static MESSAGE_EVENT_NAME = "message";

    /**
     * @param {Options} options
     * @param {object} [query]
     */
    constructor({options, query}) {
        this.url = this.generateUrl(options.url, options.namespace);
        this.roomId = this.generateRoomId(this.url, query);
        this.displayName = options.displayName || 'unknown';

        if (!sockets[this.roomId]) {
            this.socket = io(this.url, {
                query
            });
            sockets[this.roomId] = this.socket;
        } else {
            this.socket = sockets[this.roomId];
        }
    }

    /**
     * @param {string} base
     * @param {object} [namespace]
     * @returns {string}
     */
    generateUrl = (base, namespace = '') => {
        if (base.charAt(base.length - 1) !== '/') {
            base += '/';
        }
        return base + namespace;
    };

    /**
     * @param {string} url
     * @param {object} [query]
     * @returns {string} roomId
     */
    generateRoomId = (url, query) => {
        let participants;
        let roomId = url;

        if (query && query.participants && Array.isArray(query.participants)) {
            participants = [...query.participants];
            participants.sort();
            roomId += '|' + participants.join('|');
        }

        return roomId;
    };

    /**
     * @param {function} callback
     * */
    onConnect(callback) {
        this.subscribe("connect", () => {
            callback();
        });
    }

    /**
     * @param {function} callback
     * */
    onError(callback) {
        this.subscribe("error", () => {
            callback();
        });
    }

    /**
     * @param {function} callback
     * */
    onDisconnect(callback) {
        this.subscribe("disconnect", () => {
            callback();
        });
    }

    /**
     * @returns {string}
     */
    getRoomId = () => {
        return this.roomId;
    };

    /**
     * @returns {string}
     * */
    getUrl = () => {
        return this.url
    };

    getSocket = () => {
        return this.socket;
    };

    /**
     * @param {string} eventName
     * @param {function} callback
     */
    subscribe = (eventName, callback) => {
        this.socket.on(eventName, callback);
    };

    /**
     * @param {string} content
     * @param {string} [eventName]
     */
    sendMessage = (content, eventName = SocketClient.MESSAGE_EVENT_NAME) => {
        this.socket.emit(eventName, {
            from: {
                roomId: this.roomId,
                displayName: this.displayName
            },
            content
        });
    };

    close = () => {
        this.socket.close();
        delete sockets[this.url];
    }

}

export default SocketClient;
