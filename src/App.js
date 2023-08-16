import React, { useEffect, useState } from 'react';

import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Thread,
  Window,
  LoadingIndicator,
  ChannelHeader,
  /* ChatAutoComplete,
  SendButton,
  useMessageInputContext,
  useTranslationContext,
  FileUploadIcon,
  AttachmentPreviewList */
} from 'stream-chat-react';
// import { FileUploadButton, ImageDropzone } from 'react-file-utils';

import 'stream-chat-react/dist/css/index.css';
import './style.css';

const apiKey = process.env.REACT_APP_STREAM_API_KEY

const user = {
  id: 'rdj-real',
  image: 'https://i.imgflip.com/4/3kpnjs.png',
}

export default function App() {
  const [client, setClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [channel2, setChannel2] = useState(null)

    useEffect(() => {
      async function init() {
        const chatClient = StreamChat.getInstance(apiKey)

        await chatClient.connectUser(user, chatClient.devToken(user.id))

        const channel = chatClient.channel('messaging', 'art-chat', {
          members: [user.id]
        })

        await channel.watch()

        setChannel(channel)
        setClient(chatClient)
      }

      init()

      if (client) return () => client.disconnectUser()
    }, [])

    useEffect(() => {
      async function init() {
        const chatClient = StreamChat.getInstance(apiKey)

        await chatClient.connectUser(user, chatClient.devToken(user.id))

        const channel2 = chatClient.channel('images', 'image-board', {
          members: [user.id]
        })

        await channel2.watch()

        setChannel2(channel2)
        setClient(chatClient)
      }

      init()

      if (client) return () => client.disconnectUser()
    }, [])

    if(!channel || !client) return <LoadingIndicator />

    /*
    const CustomMessageInput = () => {
      const { t } = useTranslationContext();
     
      const {
        handleSubmit,
      } = useMessageInputContext();
     
      return (
        <div
          className='str-chat__input-flat str-chat__input-flat--send-button-active'>
          <ImageDropzone>
          <div className='str-chat__input-flat-wrapper'>
            <AttachmentPreviewList />
            <div className='str-chat__input-flat--textarea-wrapper'>
              <ChatAutoComplete />
              <div className='str-chat__fileupload-wrapper' data-testid='fileinput'>
                <FileUploadButton>
                  <span className='str-chat__input-flat-fileupload'>
                    <FileUploadIcon />
                  </span>
                </FileUploadButton>
              </div>
            </div>
            <SendButton sendMessage={handleSubmit} />
          </div>
          </ImageDropzone>
        </div>
      );
     };
     */

     const CustomEmoji = () => {
      return null;
     }

    return (
    <Chat client={client} theme="messaging dark">
      <Channel channel = {channel}>
        <Window>
          <ChannelHeader />
          <MessageList hideDeletedMessages='true'/>
          <MessageInput />
        </Window>
      </Channel>
      <Channel channel = {channel2} EmojiIcon={CustomEmoji} EmojiPicker={CustomEmoji}>
        <Window >
          <MessageList hideDeletedMessages='true'/>
          <MessageInput disabled='true'/>
        </Window>
        <Thread />
      </Channel>

    </Chat>
    )
}

