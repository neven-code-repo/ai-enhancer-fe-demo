import { withAIEnhancer } from "../lib"; // mocking npm package import
import PropTypes from "prop-types";
//import css
import "../styles/styled-examples.css";

// Regular components
const Input = ({ value, onChange, placeholder, className }) => <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={className} />;

const TextArea = ({ value, onChange, placeholder, className }) => <textarea value={value} onChange={onChange} placeholder={placeholder} className={className} />;

// Custom input component
const CustomInput = ({ value, onChange, placeholder, className }) => (
	<div className={`custom-input ${className}`}>
		<input type="text" value={value} onChange={onChange} placeholder={placeholder} />
		<span className="custom-input-icon">🔍</span>
	</div>
);

// Enhanced components
const AIEnhancedInput = withAIEnhancer(Input);
const AIEnhancedTextArea = withAIEnhancer(TextArea);
const AIEnhancedCustomInput = withAIEnhancer(CustomInput);

const StyledExamples = () => {
	const handleInputChange = (e) => {
		console.log("Input changed:", e.target.value);
	};

	const customEnhancementButtons = [
		{ label: "🌐 Translate", type: "translate" },
		{ label: "🔄 Rephrase", type: "rephrase" },
		{ label: "✨ Improve", type: "improve" },
		{ label: "📝 Summarize", type: "summarize" },
	];

	const renderCustomButtons = (buttons, applyEnhancement, isProcessing) => (
		<div className="custom-buttons">
			{buttons.map((button) => (
				<button key={button.type} onClick={() => applyEnhancement(button.type)} disabled={isProcessing} className="custom-button">
					{button.label}
				</button>
			))}
		</div>
	);

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

			<h4>AI-Enhanced Custom Input (Custom buttons and only rephrase and summarize)</h4>
			<AIEnhancedCustomInput
				placeholder="Custom input with AI enhancements..."
				onChange={handleInputChange}
				enhancementButtons={customEnhancementButtons}
				renderEnhancementButtons={renderCustomButtons}
				enabledEnhancements={["rephrase", "summarize"]}
				className="neon-input"
			/>
		</div>
	);
};

CustomInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string,
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
