import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import StoryPlaylist from './StoryPlaylist'
import { shallow } from 'enzyme'

describe('StoryPlaylist', () => {
  it('matches snapshot', () => {
    const storyPlaylistComponent = shallow(<Router><StoryPlaylist /></Router>)
    expect(storyPlaylistComponent).toMatchSnapshot()
  })
})
