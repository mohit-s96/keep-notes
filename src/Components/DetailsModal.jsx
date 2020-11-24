import React from 'react'

function DetailsModal(props) {
    const handleClick = () => {
        props.handler();
    }
    return (
        <>
        <div className="overlay" onClick={handleClick}></div>
        <div className="modal-container">
            <div className="heading-modal">
                <h2>{props.details.title_field}</h2>
            </div>
            <div className="date-modal">
                <h3>{props.details.date_field}</h3>
            </div>
            <div className="modal-note">
                <p>
                    {props.details.note_field}
                </p>
            </div>
        </div>
        </>
    )
}

export default DetailsModal