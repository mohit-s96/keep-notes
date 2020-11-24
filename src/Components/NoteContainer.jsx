import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../Component Styles/notecontainer.css';
import '../Component Styles/mobile.css';
import SingleNoteCard from './SingleNoteCard';

function NoteContainer(props) {
    const themes = ['E23D5B', 'A7313F', 'E2698D', 'FF5F5F'];
    const showMobileForm = () => {
        document.querySelector('.note-wrapper').style.display = 'none';
        document.querySelector('.form-wrapper').style.display = 'flex';
    }
    return (
        <div className="note-wrapper">
            <div className="inner-note-wrapper">
                {
                    props.notes
                    ?
                    props.notes.length
                    ?
                    props.notes.map(x => {
                        return(
                            <SingleNoteCard details={x} key={x.id} theme={themes[parseInt(Math.random()*themes.length)]}/>
                        )
                    })
                    :
                    <div className="no-notes">No notes created yet...create one to see it here!!</div>
                    :
                    null
                }
                {
                    (window.screen.width <= 600) && <span className="mobile-add-btn" onClick={showMobileForm}>+</span>
                }
            </div>
        </div>
    )
}
NoteContainer.propTypes = {
    notes: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    notes: state.data.notes
});
export default connect(mapStateToProps)(NoteContainer);
