import { useState } from "react"
import { Dropdown } from "./components/dropdown/dropdown"

function App() {
	const [value, setValue] = useState('')

	const a = [
		{id:1, text:'texto 1'},
		{id:2, text:'texto 2', url:'url'},
		{id:3, text:'texto 3', photo:'photo'},
	]

	return (
		<div className="p-48">
			<Dropdown onChangeValue={(e:any) => {setValue(e), alert(e)}} value={value} content={[1,2,3]} />
		</div>
	)
}

export default App