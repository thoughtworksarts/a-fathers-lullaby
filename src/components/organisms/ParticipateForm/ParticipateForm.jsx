import React, { useState } from 'react'
import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap'
import './ParticipateForm.css'

const ParticipateForm = (props) => {
  const [perspective, setPerspective] = useState({ tag: null, string: ' -- SELECT -- ' })
  const [relationship, setRelationship] = useState({ tag: null, string: ' -- SELECT -- ' })
  const [prompt, setPrompt] = useState({ tag: null, string: ' -- SELECT -- ' })

  const tagToString = {
    280: 'What needs to change?',
    272: 'Share a memory or a life story related to a lullaby.',
    276: 'What does it mean for a father to be present for his child?',
    277: 'What is the impact of missing fathers on the community and children left behind?',
    278: 'I know someone incarcerated.',
    279: 'I do not know someone incarcerated.',
    275: 'Child',
    274: 'Parent',
    273: 'Sing a lullaby or song that reminds you of childhood.'
  }

  const perspectiveHandler = (key) => {
    setPerspective({ tag: key, string: tagToString[key] })
  }

  const relationshipHandler = (key) => {
    setRelationship({ tag: key, string: tagToString[key] })
  }

  const promptHandler = (key) => {
    setPrompt({ tag: key, string: tagToString[key] })
  }

  return (
    <div className='ParticipateForm'>
      <div className='InstructionBold'>Let's build your entry.</div>
      <div className='Instruction'>Enter information to help categorize your story.</div>
      <div className='metadata-questions'>

        <ButtonToolbar className='button-toolbar'>
          <div className='meta-data-question'>
            <div className='meta-data-instructions'>What perspective are you speaking from?</div>
            <DropdownButton
              size='small'
              title={perspective.string}
              variant='secondary'
              id='dropdown-basic-button-perspective'

            >

              <Dropdown.Item eventKey='274' onSelect={(eventKey) => perspectiveHandler(eventKey)}>Parent</Dropdown.Item>
              <Dropdown.Item eventKey='275' onSelect={(eventKey) => perspectiveHandler(eventKey)}>Child</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className='meta-data-question'>
            <div className='meta-data-instructions'>Relationship to mass incarceration?</div>
            <DropdownButton
              id='dropdown-basic-button-relationship'
              title={relationship.string}
              variant='secondary'
            >
              <Dropdown.Item eventKey='278' onSelect={(eventKey) => relationshipHandler(eventKey)}>I know someone incarcerated.</Dropdown.Item>
              <Dropdown.Item eventKey='279' onSelect={(eventKey) => relationshipHandler(eventKey)}>I do not know someone incarcerated.</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className='meta-data-question'>

            <div className='meta-data-instructions'>Story Prompts.</div>
            <DropdownButton
              id='dropdown-basic-button-prompt' title={prompt.string}
              variant='secondary'
            >
              <Dropdown.Item eventKey='273' onSelect={(eventKey) => promptHandler(eventKey)}>Sing a lullaby or song that reminds you of childhood.</Dropdown.Item>
              <Dropdown.Item eventKey='272' onSelect={(eventKey) => promptHandler(eventKey)}>Share a memory or life story related to a lullaby. </Dropdown.Item>
              <Dropdown.Item eventKey='276' onSelect={(eventKey) => promptHandler(eventKey)}>What does it mean for a father to be present for his child?</Dropdown.Item>
              <Dropdown.Item eventKey='277' onSelect={(eventKey) => promptHandler(eventKey)}>What is the impact of missing fathers on the community and children left behind? </Dropdown.Item>
              <Dropdown.Item eventKey='280' onSelect={(eventKey) => promptHandler(eventKey)}>What needs to change?</Dropdown.Item>
            </DropdownButton>
          </div>
        </ButtonToolbar>
      </div>
    </div>
  )
}

export default ParticipateForm
