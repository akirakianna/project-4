import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import styled from 'styled-components'

import { IconButton, Modal } from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import angry from '../assets/angry.svg'
import ecstatic from '../assets/ecstatic.svg'
import happy from '../assets/happy.svg'
import neutral from '../assets/neutral.svg'
import sad from '../assets/sad.svg'
import RedditPostCard from './RedditPostEmbedded'


const Account = () => {

  const { user } = useContext(UserContext)
  const [open, setOpen] = React.useState(false)
  const emojis = { angry, happy, sad, neutral, ecstatic }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Image = styled.img`
    width: 30vw;
  `

  return (
    <main>
      <Image src={emojis[user.emotion]} alt={user.emotion}/>
      <h1>{user.username}</h1>
      <h2>{Math.round(user.aggregate_sentiment * 100)}</h2>
      <IconButton onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <h3>Viewed Posts</h3>
      {user.viewed_posts?.map((post, i) => <RedditPostCard key={i} post={post} />)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <h2>
        Sentiment Score
        </h2>
      </Modal>
    </main>
  )
}


export default Account