import { withAIEnhancer } from "../lib"; // mocking npm package import
import PropTypes from "prop-types";
import "../styles/styled-examples.css";

// Custom input component
const CustomInput = ({ value, onChange, placeholder, className }) => (
	<div className={`custom-input ${className}`}>
		<input type="text" value={value} onChange={onChange} placeholder={placeholder} />
		<span className="custom-input-icon">🔍</span>
	</div>
);

// Custom textarea component
const CustomTextArea = ({ value, onChange, placeholder, className }) => (
	<div className={`custom-textarea ${className}`}>
		<textarea value={value} onChange={onChange} placeholder={placeholder} />
		<span className="custom-textarea-icon">🔍</span>
	</div>
);

// Enhanced custom components
const AIEnhancedCustomInput = withAIEnhancer(CustomInput);
const AIEnhancedCustomTextArea = withAIEnhancer(CustomTextArea);

const CustomExamples = () => {
	const handleInputChange = (e) => {
		console.log("Input changed:", e.target.value);
	};

	const customEnhancementButtons = [
		{ label: "CST Translate", type: "translate", icon: "🌐" },
		{ label: "CST Rephrase", type: "rephrase", icon: "🔄" },
		{ label: "CST Improve", type: "improve", icon: "✨" },
		{ label: "CST Summarize", type: "summarize", icon: "📝" },
	];

	const renderCustomButtons = (buttons, applyEnhancement, isProcessing) => (
		<div className="custom-buttons">
			{buttons.map((button) => (
				<button key={button.type} onClick={() => applyEnhancement(button.type)} disabled={isProcessing} className="custom-button">
					{button.icon} {button.label}
				</button>
			))}
		</div>
	);

	return (
		<div className="styled-examples">
			<h1>🎨 Custom Examples</h1>
			<h4>Custom Input with Custom AI Enhancement Buttons</h4>
			<AIEnhancedCustomInput
				placeholder="Custom input with custom AI buttons..."
				onChange={handleInputChange}
				enhancementButtons={customEnhancementButtons}
				renderEnhancementButtons={renderCustomButtons}
				className="neon-input"
			/>

			<h4>Custom TextArea with Custom AI Enhancement Buttons</h4>
			<AIEnhancedCustomTextArea
				placeholder="Custom textarea with custom AI buttons..."
				onChange={handleInputChange}
				enhancementButtons={customEnhancementButtons}
				renderEnhancementButtons={renderCustomButtons}
				className="neon-textarea"
			/>
		</div>
	);
};

CustomInput.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string,
};

CustomTextArea.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default CustomExamples;
