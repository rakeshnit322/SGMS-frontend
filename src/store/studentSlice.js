import { ACTIONS } from './actiontypes.js';

export const initialState = {
    students: [],
    loading: false,
    error: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_STUDENTS:
            return {
                ...state,
                students: action.payload,
                loading: false
            };
        case ACTIONS.ADD_STUDENTS:
            return {
                ...state,
                students: [...state.students, ...action.payload],
                loading: false
            };
        case ACTIONS.UPDATE_STUDENT:
            return {
                ...state,
                students: state.students.map(student => 
                    student.student_id === action.payload.student_id 
                        ? action.payload 
                        : student
                )
            };
        case ACTIONS.DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => 
                    student.student_id !== action.payload
                )
            };
        case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ACTIONS.RESET_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};