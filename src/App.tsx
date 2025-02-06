import { useState } from "react"
import { Dropdown } from "./components/dropdown/dropdown"
import CurrencyInput from "./components/currencyInput/currencyInput"
import MaskInput from "./components/maskInput/maskInput"

function App() {
	const [value, setValue] = useState('')

	const a = [
		{id:1, text:'texto 1'},
		{id:2, text:'texto 2', url:'url'},
		{id:3, text:'texto 3', photo:'photo'},
	]

	return (
		<div className="p-48">
			<MaskInput value={value} onChangeValue={(e) => {setValue(e.target.value)}} type="text"/>
		</div>
	)
}

export default App