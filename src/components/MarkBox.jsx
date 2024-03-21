import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const MarkBox = ({ handleSubmit }) => {
  const [marks, setMarks] = useState('');

  const handleChange = (event) => {
    setMarks(event.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(marks); // Pass marks value to the parent component
    setMarks(''); // Clear the input field after submission
  };

  return (
    <div>
      <input
        type="number"
        value={marks}
        onChange={handleChange}
        style={{ width: "50px", marginTop: "-50px" }}
      />
      <button onClick={handleFormSubmit}>
        <FaCheck style={{ color: "green" }} />
      </button>
    </div>
  );
};

export default MarkBox;
