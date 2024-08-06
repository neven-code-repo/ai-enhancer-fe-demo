import { withAIEnhancer } from "../lib"; // mocking npm package import
import PropTypes from "prop-types";
import "../styles/styled-examples.css";

// Regular components
const Input = ({ value, onChange, placeholder, className }) => <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={className} />;
const TextArea = ({ value, onChange, placeholder, className }) => <textarea value={value} onChange={onChange} placeholder={placeholder} className={className} />;

// Enhanced components
const AIEnhancedInput = withAIEnhancer(Input);
const AIEnhancedTextArea = withAIEnhancer(TextArea);

const StyledExamples = () => {
	const handleInputChange = (e) => {
		console.log("Input changed:", e.target.value);
	};
	return (
		<div className="styled-examples">
			<h1>🎨 Styled Examples</h1>

			<h4>Modern Input</h4>
			<Input placeholder="Type here..." onChange={handleInputChange} className="modern-input" />

			<h4>AI-Enhanced Input (All enhancements)</h4>
			<AIEnhancedInput placeholder="Type here for AI suggestions..." onChange={handleInputChange} className="modern-input" buttonClassName="modern-button" />

			<h4>AI-Enhanced TextArea (Only translate and improve)</h4>
			<AIEnhancedTextArea
				placeholder="Type here for AI suggestions..."
				onChange={handleInputChange}
				enabledEnhancements={["translate", "improve"]}
				className="modern-textarea"
				buttonClassName="pill-button"
			/>
		</div>
	);
};

TextArea.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string,
};

Input.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string,
};
export default StyledExamples;
