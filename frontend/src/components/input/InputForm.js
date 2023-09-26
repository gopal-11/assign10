// frontend/src/components/InputForm.js
import './index.css';

// Component for Inpurt section of app
const InputForm = ({
  optionList,
  selectedOption,
  handleChange,
  handleSubmit,
  inputValue,
  setInputValue,
}) => {
  // input handler
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="input-form">
      <div className="margin-left10">
        {' '}
        <label>User option:</label>
      </div>
      <div className="margin-left10">
        <select
          className="margin-left10"
          value={selectedOption}
          onChange={handleChange}
        >
          {optionList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id} {item.level}
            </option>
          ))}
        </select>
      </div>
      <div className="margin-left10">
        <input value={inputValue} onChange={handleInputValue} />
      </div>
      <button className="margin-left10" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default InputForm;
