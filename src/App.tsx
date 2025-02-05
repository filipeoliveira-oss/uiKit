import { useState } from "react"
import Modal from "./components/modal/modal"

function App() {

	const [open, setOpen] = useState(false)

	return (
		<div className="">
			<button onClick={() => setOpen(true)}>open dialog</button>

			<Modal isOpen={open} onClose={() => setOpen(false)} title="123">
				<div className="w-full h-full flex flex-col gap-4 overflow-auto">
					{Array.from({ length: 400 }, (_, index) => index).map((each) => {
						return (
							<div className="flex flex-row gap-5">
								<input className="w-96 h-8 bg-red-500" value={`this is a input ${each}`}/>
								<input className="w-96 h-8 bg-red-500" value={`this is a input ${each}`}/>
							</div>
						)
					})}
				</div>
			</Modal>
		</div>
	)
}

export default App
