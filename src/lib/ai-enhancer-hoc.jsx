import { useState, useCallback } from "react";
import PropTypes from "prop-types";

const withAIEnhancement = (WrappedComponent) => {
	function AIEnhancedComponent({ onChange, value: propValue, enhancementButtons, renderEnhancementButtons, enabledEnhancements, buttonClassName, ...props }) {
		const [value, setValue] = useState(propValue || "");
		const [isProcessing, setIsProcessing] = useState(false);

		const handleChange = useCallback(
			(event) => {
				const newValue = event.target ? event.target.value : event;
				setValue(newValue);
				if (onChange) {
					onChange(event);
				}
			},
			[onChange]
		);

		const applyAIEnhancement = useCallback(
			async (enhancementType) => {
				setIsProcessing(true);
				try {
					const enhancedText = await simulateAIEnhancement(value, enhancementType);
					setValue(enhancedText);
					if (onChange) {
						onChange({ target: { value: enhancedText } });
					}
				} catch (error) {
					console.error("AI enhancement failed:", error);
				} finally {
					setIsProcessing(false);
				}
			},
			[value, onChange]
		);

		const simulateAIEnhancement = async (text, type) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			switch (type) {
				case "translate":
					return `Translated: ${text}`;
				case "rephrase":
					return `Rephrased: ${text}`;
				case "improve":
					return `Improved: ${text}`;
				case "summarize":
					return `Summarized: ${text}`;
				default:
					return text;
			}
		};

		const defaultEnhancementButtons = [
			{ label: "Translate", type: "translate", icon: "🌐" },
			{ label: "Rephrase", type: "rephrase", icon: "🔄" },
			{ label: "Improve", type: "improve", icon: "✨" },
			{ label: "Summarize", type: "summarize", icon: "📝" },
		];

		const buttons = enhancementButtons || defaultEnhancementButtons;
		const enabledButtons = buttons.filter((button) => (enabledEnhancements ? enabledEnhancements.includes(button.type) : true));

		return (
			<div>
				<WrappedComponent {...props} value={value} onChange={handleChange} disabled={isProcessing} />
				{renderEnhancementButtons ? (
					renderEnhancementButtons(enabledButtons, applyAIEnhancement, isProcessing, buttonClassName)
				) : (
					<div>
						{enabledButtons.map((button) => (
							<button key={button.type} onClick={() => applyAIEnhancement(button.type)} disabled={isProcessing} className={buttonClassName || "custom-button"}>
								{button.icon && <span className="button-icon">{button.icon}</span>}
								{button.label}
							</button>
						))}
					</div>
				)}
				{isProcessing && <p>Processing...</p>}
			</div>
		);
	}

	AIEnhancedComponent.propTypes = {
		onChange: PropTypes.func,
		value: PropTypes.string,
		enhancementButtons: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				type: PropTypes.string.isRequired,
				icon: PropTypes.string,
			})
		),
		renderEnhancementButtons: PropTypes.func,
		enabledEnhancements: PropTypes.arrayOf(PropTypes.string),
		buttonClassName: PropTypes.string,
	};

	return AIEnhancedComponent;
};

export default withAIEnhancement;
