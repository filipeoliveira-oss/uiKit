import { useState } from "react"
import Modal from "./components/uiKit/modal"
import DataTable from "./components/dataTable/dataTable"

function App() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="p-48">
			<DataTable columnDefs={[]} rowData={[]}/>
		</div>
	)
}

export default App