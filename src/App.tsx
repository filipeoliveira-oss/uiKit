import { useState } from "react"
import Modal from "./components/uiKit/modal"

function App() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="p-48">
			<button onClick={() => setIsOpen(true)}>opne</button>
			<Modal isOpen ={isOpen} onClose={() => setIsOpen(false)} disableAnimation >

			</Modal>
		</div>
	)
}

export default App