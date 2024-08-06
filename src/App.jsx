import "./App.css";
import UnstyledExamples from "./components/unstyled-examples";
import StyledExamples from "./components/styled-examples";
import CustomExamples from "./components/custom-examples";

function App() {
	return (
		<div className="app">
			<div className="examples">
				<UnstyledExamples />
				<StyledExamples />
				<CustomExamples />
			</div>
		</div>
	);
}

export default App;
