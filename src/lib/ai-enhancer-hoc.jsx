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
			// Sanitize and escape the input text
			const sanitizeText = (inputText) => {
				return inputText
					.replace(/\\/g, "\\\\") // Escape backslashes
					.replace(/"/g, '\\"') // Escape double quotes
					.replace(/\n/g, "\\n") // Escape newlines
					.replace(/\r/g, "\\r") // Escape carriage returns
					.replace(/\t/g, "\\t") // Escape tabs
					.replace(/\f/g, "\\f") // Escape form feeds
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;");
			};

			const sanitizedText = sanitizeText(text);

			const query = `
				query {
					enhanceText(text: "${sanitizedText}", type: "${type}") {
						result
					}
				}
			`;

			const variables = {
				input: {
					text,
					enhancementType: type,
				},
			};

			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/graphql`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ query, variables }),
					mode: "cors",
				});

				if (!response.ok) {
					const errorText = await response.text();
					console.error("Server response:", errorText);
					throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
				}

				const result = await response.json();

				if (result.errors) {
					throw new Error(result.errors[0].message);
				}

				// Sanitize the result by removing quotes
				const sanitizedResult = result.data.enhanceText.result.replace(/^"|"$/g, "");

				return sanitizedResult;
			} catch (error) {
				console.error("Error enhancing text:", error);
				return text; // Return original text if enhancement fails
			}
		};

		const defaultEnhancementButtons = [
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
