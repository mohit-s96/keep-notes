import React from 'react';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import store from '../redux/store';
import PropTypes from 'prop-types';
import {SET_TITLE_ERROR, SET_NOTE_ERROR} from '../redux/types';
import {setNewNote, editNoteState} from '../redux/actions/actions';
import Calendar from 'react-calendar';
import '../Component Styles/form.css';
import 'react-calendar/dist/Calendar.css';

function NoteForm(props) {
    const [value, setValue] = useState(new Date());
    const initialState = {
        date_field: value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear(),
        title_field: '', 
        note_field: '', 
        id: ''
    }
    const [state, setState] = useState(initialState);
    const [calendarState, setCalendarState] = useState(false);
    const handleChange = e => {
        setState({...state, [e.target.id]: e.target.value})
    }
    const handleSubmit = () => {
        const body = {...state};
        let errors = false;
        if(body.title_field.length > 20 || body.title_field.trim().length === 0){
            store.dispatch({type: SET_TITLE_ERROR});
            errors = true;
        }
        if(body.note_field.length > 400 || body.note_field.trim().length === 0){
            store.dispatch({type: SET_NOTE_ERROR});
            errors = true;
        }
        if(!errors){
            body.id = parseInt(Math.random()*100000000);
            setState(initialState);
            showCards();
            props.setNewNote(body);
        }
    }
    const discard = () => {
        setState({
            ...state,
            date_field: value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear(),
            title_field: '', 
            note_field: '', 
        });
    }
    function onChange(nextValue) {  
        setValue(nextValue);
        setCalendarState(!calendarState);
    }
    const toggleCalendar = () => {
        setCalendarState(!calendarState);
    }
    const handleEdit = () => {
        let error = false;
        if(state.title_field.length > 20 || state.title_field.trim().length === 0){
            store.dispatch({type: SET_TITLE_ERROR});
            error = true;
        }
        if(state.note_field.length > 400 || state.note_field.trim().length === 0){
            store.dispatch({type: SET_NOTE_ERROR});
            error = true;
        }
        if(!error){
            showCards();
            console.log(state);
            let body = {...state};
            props.editNoteState(body);
            setState(initialState);
        }
    }
    const showCards = () => {
        if(window.screen.width <= 600){
            document.querySelector('.note-wrapper').style.display = 'block';
            document.querySelector('.form-wrapper').style.display = 'none';
        }
    }
    useEffect(() => {
        setState({date_field: props.editState.date || value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear(), title_field: props.editState.title, note_field: props.editState.note, id: props.editState.id})
    }, [props.editState])
    useEffect(() => {
        setState({...state, date_field: value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear()})
    }, [value]);
    return (
        <div className="form-wrapper">
            <div className="form-heading">
                <h2>Add a note</h2>
            </div>
            <div className="inner-form-wrapper">
                <form id="form-hook">
                    <div className="input-wrapper">
                        {
                            calendarState && <Calendar
                                                onChange={onChange}
                                                value={value}
                                            />
                        }
                        <label htmlFor="date_field">Date</label>
                        <div className="date-wrapper">
                            <span className="date-icon" onClick={toggleCalendar}><i className="far fa-calendar-alt fa-3x" onClick={toggleCalendar}></i></span>
                            <input type="text" className="text-field date-text" id="date_field" value={value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear()} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="title_field">Title</label>
                        <input type="text" className="text-field" id="title_field" onChange={handleChange} value={state.title_field || ''}/>
                        {
                            // props.errors && (props.errors.title===true) && <div className="input-error">Error in title</div>
                            props.errors ? props.errors.title ? <div className="input-error">Error in title</div> : null : null
                        }
                    </div>
                    <div className="input-wrapper note-area">
                        <label htmlFor="note_field">Note</label>
                        <textarea type="text" className="text-field note-field" id="note_field" onChange={handleChange} value={state.note_field || ''}/>
                        {
                            props.errors && (props.errors.note ===true)&& <div className="input-error">Error in note</div>
                        }
                    </div>
                </form>
                <div className="action-buttons-wrapper">
                    {
                        (!props.isEdit && <button className="btn" onClick={handleSubmit}>Add Note</button>)
                        ||
                        (<button className="btn" onClick={handleEdit}>Save Edit</button>)
                    }
                    {
                        (window.screen.width <= 600) && <span className="mobile-add-btn back-arrow" onClick={showCards}>←</span>
                    }
                    <button className="btn remove-btn" onClick={discard}>Discard</button>
                </div>
            </div>
        </div>
    )
}
NoteForm.propTypes = {
    setNewNote: PropTypes.func.isRequired,
    editNoteState: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    editState: PropTypes.object.isRequired,
    isEdit: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    errors: state.data.errors,
    editState: state.data.editState,
    isEdit: state.data.isEdit
});
const mapActionsToProps = {
    setNewNote,
    editNoteState
}
export default connect(mapStateToProps, mapActionsToProps)(NoteForm);
