import { useState } from "react"
import ActionsMenu from "./components/uiKit/actionsMenu"

function App() {

	const [open, setOpen] = useState(false)

	return (
		<div className="p-48">
			<button onClick={() => setOpen(true)}>open dialog</button>

			<ActionsMenu position="bottom">
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</ActionsMenu>
		</div>
	)
}

export default App