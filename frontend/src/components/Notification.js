const Notification = ({ message, className }) => {
  if (message === null) {
    return null;
  } else {
    return (
      <div className={className}>
        {message}
      </div>
    );
  }
};

export default Notification;
