import React from 'react';

const Alert = ({message}) => {
    return (
        <div>
            <div className="error"><strong>Error:</strong> {message}</div>
            <div className="empty-state">
                <h2>Something went wrong</h2>
                <p>Please try again with a different search term</p>
            </div>
        </div>
    )
}

export default Alert;