import "./App.css";
import UnstyledExamples from "./components/unstyled-examples";
import StyledExamples from "./components/styled-examples";
function App() {
	return (
		<div className="app">
			<div className="examples">
				<UnstyledExamples />
				<StyledExamples />
			</div>
		</div>
	);
}

export default App;
