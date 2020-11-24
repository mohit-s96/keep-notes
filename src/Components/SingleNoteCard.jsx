import React from 'react';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DetailsModal from './DetailsModal';
import {setEditState, deleteNote} from '../redux/actions/actions';

function SingleNoteCard(props) {
    const [state, setState] = useState(false);
    const setDivCenter = function () {

        var div = document.querySelector('.modal-container');
        var Mheight = div.offsetHeight;
        var Wheight = window.innerHeight;
        div.style.top = ((Wheight - Mheight ) / 2 +window.pageYOffset ) + "px";
    };
    const setOverlay = () => {
        var overlay = document.querySelector('.overlay');
        var height = document.querySelector('html').scrollHeight;
        overlay.style.height = height + 'px';
    }
    const showMobileForm = () => {
        document.querySelector('.note-wrapper').style.display = 'none';
        document.querySelector('.form-wrapper').style.display = 'flex';
    }
    const handleClick = () => {
        if(window.screen.width <= 600){
            showMobileForm();
        }
        props.setEditState(props.details);
    }
    const showCardModal = (e) => {
        if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SPAN'){
            setState(!state);
        }
    }
    const handler = () => {
        setState(!state)
    }
    const deleteNote = (id) => {
        props.deleteNote(id);
    }
    useEffect(() => {
        if(state && window.screen.width <= 600){
            setOverlay();
            setDivCenter();
        }
        else if(state){
            setOverlay();
        }
    }, [state])
    return (
        <div className={`single-note-wrapper ${props.theme}`} onClick={showCardModal}>
            <span onClick={() => deleteNote(props.details.id)}>X</span>
            <h3>{props.details.title_field}</h3>
            <h4>{props.details.date_field}</h4>
            <button onClick={handleClick}>Edit</button>
            {
                state && <DetailsModal details={props.details} handler={handler}/>
            }
        </div>
    )
}
SingleNoteCard.propTypes = {
    setEditState: PropTypes.func.isRequired
};
export default connect(null, {setEditState, deleteNote})(SingleNoteCard);
