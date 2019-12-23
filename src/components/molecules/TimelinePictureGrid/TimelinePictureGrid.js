import React from 'react'
import TimelinePicture from '../TimelinePicture/TimelinePicture'
import './TimelinePictureGrid.css'

class TimelinePictureGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const gridType = "grid" + this.props.pictureArray.length;

        return (
            <div className={"timeline-picture-grid " + gridType}>
                {this.props.pictureArray.map((picture, index) => {
                    return <div key={index}>
                        <TimelinePicture picture={picture} altText={this.props.altText} />
                    </div>
                })}
            </div>
        )
    }
}

export default TimelinePictureGrid