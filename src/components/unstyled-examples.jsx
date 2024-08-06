import { withAIEnhancer } from "../lib"; // mocking npm package import
import PropTypes from "prop-types";

// Regular components
const Input = ({ value, onChange, placeholder }) => <input type="text" value={value} onChange={onChange} placeholder={placeholder} />;
const TextArea = ({ value, onChange, placeholder }) => <textarea value={value} onChange={onChange} placeholder={placeholder} />;

// Enhanced components
const AIEnhancedInput = withAIEnhancer(Input);
const AIEnhancedTextArea = withAIEnhancer(TextArea);

const UnstyledExamples = () => {
	const handleInputChange = (e) => {
		console.log("Input changed:", e.target.value);
	};

	return (
		<div>
			<h1>👉 Unstyled Examples</h1>
			<h4>Regular Input</h4>
			<Input placeholder="Type here..." onChange={handleInputChange} />

			<h4>AI-Enhanced Input (All enhancements)</h4>
			<AIEnhancedInput placeholder="Type here for AI suggestions..." onChange={handleInputChange} />

			<h4>AI-Enhanced TextArea (Only rephrase and improve)</h4>
			<AIEnhancedTextArea placeholder="Type here for AI suggestions..." onChange={handleInputChange} enabledEnhancements={["rephrase", "improve"]} />
		</div>
	);
};

TextArea.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
};

Input.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
};
export default UnstyledExamples;
