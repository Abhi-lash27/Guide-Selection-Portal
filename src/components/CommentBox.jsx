import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const CommentBox = ({ handleSubmit }) => {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(comment); // Pass comment value to the parent component
    setComment(''); // Clear the input field after submission
  };

  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={handleChange}
        style={{ width: "100px", marginTop: "20px" }}
      />
      <button onClick={handleFormSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CommentBox;
