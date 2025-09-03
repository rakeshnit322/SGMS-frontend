import { createContext, useContext, useReducer } from 'react';
import { reducer, initialState } from './studentSlice.js';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StudentContext.Provider value={{ state, dispatch }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudentContext must be used within StudentProvider');
    }
    return context;
};