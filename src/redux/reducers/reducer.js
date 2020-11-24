import {SET_NOTE, CLEAR_ERRORS, RESET_EDIT, UPDATE_NOTE, EDIT_NOTE, SET_NOTE_ERROR, SET_FROM_LOCAL_STORAGE, SET_TITLE_ERROR, DELETE_NOTE} from '../types';
const initialState = {
    errors: {
        title: false,
        note: false
    },
    notes: [],
    editState: {
        date: '',
        title: '',
        note: '',
        id: ''
    },
    isEdit: false
}
export default function dataReducer(state = initialState, action){
    switch(action.type){
        case DELETE_NOTE:
            const deleteNotes = state.notes.filter(x => x.id !== action.payload);
            return{
                ...state,
                notes: [...deleteNotes]
            }
        case SET_FROM_LOCAL_STORAGE:
            return{
                ...state,
                notes: [...action.payload]
            }
        case EDIT_NOTE:
            let newNotes = state.notes.map(x => {
                if(x.id === action.payload.id){
                    let y = {};
                    y.date_field = action.payload.date_field;
                    y.title_field = action.payload.title_field;
                    y.note_field = action.payload.note_field;
                    y.id = x.id;
                    return y;
                }
                else{
                    return x;
                }
            })
            return{
                ...state,
                isEdit: false,
                notes: [...newNotes]
            }
        case RESET_EDIT:
            return{
                ...state,
                editState: {
                    date: '',
                    title: '',
                    note: '',
                    id: ''
                }
            }
        case UPDATE_NOTE:
             let editState = {
                date: action.payload.date_field,
                title: action.payload.title_field,
                note: action.payload.note_field,
                id: action.payload.id
            }
            return{
                ...state,
                isEdit: true,
                editState
            }
        case SET_NOTE:
            const notes = [...state.notes, action.payload] 
            return{
                ...state,
                notes
            }
        case SET_NOTE_ERROR:
            // let errors = {...state.errors, note: true};
            return{
                ...state,
                errors: {
                    ...state.errors,
                    note: true
                }
            }
        case SET_TITLE_ERROR:
            // leterrors = {...state.errors, title: true};
            return{
                ...state,
                errors: {
                    ...state.errors,
                    title: true
                }
            }
        case CLEAR_ERRORS:
            // errors = {title: false, note: false};
            return{
                ...state,
                errors: {
                    title: false,
                    note: false
                }
            }
        default:
            return state
    }
}