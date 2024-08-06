import withAIEnhancer from "./ai-enhancer-hoc";
import PropTypes from "prop-types";

// Regular components
const Input = ({ value, onChange, placeholder }) => <input type="text" value={value} onChange={onChange} placeholder={placeholder} />;
const TextArea = ({ value, onChange, placeholder }) => <textarea value={value} onChange={onChange} placeholder={placeholder} />;

// Custom input component
const CustomInput = ({ value, onChange, placeholder }) => (
	<div className="custom-input">
		<input type="text" value={value} onChange={onChange} placeholder={placeholder} />
		<span className="custom-input-icon">🔍</span>
	</div>
);

// Enhanced components
const AIEnhancedInput = withAIEnhancer(Input);
const AIEnhancedTextArea = withAIEnhancer(TextArea);
const AIEnhancedCustomInput = withAIEnhancer(CustomInput);

const UnstyledExamples = () => {
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
		<div>
			<h1>AI Input Enhancer</h1>

			<h2>Regular Input</h2>
			<Input placeholder="Type here..." onChange={handleInputChange} />

			<h2>AI-Enhanced Input (All enhancements)</h2>
			<AIEnhancedInput placeholder="Type here for AI suggestions..." onChange={handleInputChange} />

			<h2>AI-Enhanced TextArea (Only translate and improve)</h2>
			<AIEnhancedTextArea placeholder="Type here for AI suggestions..." onChange={handleInputChange} enabledEnhancements={["translate", "improve"]} />

			<h2>AI-Enhanced Custom Input (Custom buttons and only rephrase and summarize)</h2>
			<AIEnhancedCustomInput
				placeholder="Custom input with AI enhancements..."
				onChange={handleInputChange}
				enhancementButtons={customEnhancementButtons}
				renderEnhancementButtons={renderCustomButtons}
				enabledEnhancements={["rephrase", "summarize"]}
			/>
		</div>
	);
};

CustomInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
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
