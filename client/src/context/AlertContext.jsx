import { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null); // State: { message, type }

    const showAlert = (message, type = 'success') => {
        setAlert({ message, type });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    const alertStyles = {
        success: 'alert-success',
        error: 'alert-error',
        info: 'alert-info',
        warning: 'alert-warning'
    }

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alert && (
                <div className='toast z-50'>
                    <div role='alert' className={`alert ${alertStyles[alert.type]}`}>
                        {alert.type === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        <span>{alert.message}</span>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    )
}