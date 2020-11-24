import {SET_NOTE, SET_NOTE_ERROR, RESET_EDIT, EDIT_NOTE, UPDATE_NOTE, SET_TITLE_ERROR, CLEAR_ERRORS, SET_FROM_LOCAL_STORAGE, DELETE_NOTE} from '../types';
export const setNewNote = body  => dispatch =>{
    let errors = false;
    if(body.title_field.length > 20 || body.title_field.trim().length === 0){
        dispatch({type: SET_TITLE_ERROR});
        errors = true;
    }
    if(body.note_field.length > 400 || body.note_field.trim().length === 0){
        dispatch({type: SET_NOTE_ERROR});
        errors = true;
    }
    if(!errors){
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: RESET_EDIT});
        dispatch({
            type: SET_NOTE,
            payload: body
        });
        let notes = [];
        let note = body;
        notes = JSON.parse(localStorage.getItem('notes'));
        if(notes){
            notes.push(note)
            localStorage.setItem('notes', JSON.stringify(notes));
        }
        else{
            notes = [];
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }
}
export const setEditState = body => dispatch => {
        dispatch({
            type: UPDATE_NOTE,
            payload: body
        });
}
export const editNoteState = body => dispatch => {
    dispatch({type: CLEAR_ERRORS});
    dispatch({
        type: EDIT_NOTE,
        payload: body
    });
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes = notes.map(x => {
        if(x.id === body.id){
            x.date_field = body.date_field;
            x.title_field = body.title_field;
            x.note_field = body.note_field;
            return x;
        }
        else{
            return x;
        }
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}
export const setFromLocal = (notes) => dispatch => {
    if(notes.length > 0){
        dispatch({type: SET_FROM_LOCAL_STORAGE, payload: notes})
    }
}
export const deleteNote = id => dispatch => {
    dispatch({type: DELETE_NOTE, payload: id});
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes = notes.filter(x => x.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
}