# React/Redux chat 
Chat module based on Socket-io.client
## Usage example

```jsx
const ChatView = (props) => (
    <div>
        <button
            onClick={props.sendMessage}
        >
            Send
        </button>
        <ul>
            {props.messages.map((message, index) => (
                <li key={index}>
                    <span>{message.content}</span>
                </li>
            ))}
        </ul>
    </div>
);
```
```jsx
<Chat
    options={{
        url: 'ws://localhost:3000',
        namespace: 'private',
        displayName: `StormBoop`
    }}
    query={{
        participants: [
            'firstOne',
            'secondOne'
        ]
    }}
    render={(id, messages, sendMessage) => {
        if (!id || !messages) {
            return null;
        }

        return (
            <ChatView
                sendMessage={() => {
                    sendMessage('Super Message');
                }}
                messages={messages}
            />
        );
    }}
  />
```
