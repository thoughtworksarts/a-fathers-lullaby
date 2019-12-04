import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './ParticipateForm.css'

const ParticipateForm = (props) => {

    const perspectiveOptions = [{key: 'Parent', text: 'Parent', value:'Parent'},
        {key: 'Child', text: 'Child', value:'Child'}]

    // const handleChange = (event) => {
    //     // console.log("Previous Location: ", location)
    //     setLocation(event.target.value)
    //     // console.log("Changed Location ", location)
    // }

    // const handleSubmit = (event) => {
    //     alert("Submitted Location: ", location)
    // }


    return (
        <div className='ParticipateForm'>
            <div className='InstructionBold'>Let's build your entry.</div>
            <div className='Instruction'>Enter information to help categorize your story.</div>
            <div>
                <Dropdown
                    placeholder='Select a Perspective'
                    fluid
                    selection
                    options={perspectiveOptions}
                    />
            </div>

            <div className='InstructionBold'>Create your Entry.</div>
            <div className='Instruction'>You can record your voice now.</div>

        </div>
    )
}

export default ParticipateForm