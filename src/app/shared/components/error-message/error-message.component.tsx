import React from "react";

const ErrorMessage: React.FC<{ message: Array<string> }> = ({
  message = [],
}: {
  message: Array<string>;
}) => {
  return (
    <React.Fragment>
      {Array.isArray(message) && message.length && (
        <div className="error-container">
          <h4 className="title">Errors:</h4>
          <ul className="list">
            {message.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default ErrorMessage;
