import { useState } from "react"
import { Dropdown } from "./components/dropdown/dropdown"
import CurrencyInput from "./components/currencyInput/currencyInput"

function App() {
	const [value, setValue] = useState('')

	const a = [
		{id:1, text:'texto 1'},
		{id:2, text:'texto 2', url:'url'},
		{id:3, text:'texto 3', photo:'photo'},
	]

	return (
		<div className="p-48">
			<CurrencyInput value={null} onChangeValue={(e) => {}}/>
		</div>
	)
}

export default App