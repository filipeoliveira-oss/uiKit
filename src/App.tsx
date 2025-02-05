import { useState } from "react"
import Drawer from "./components/drawer/drawer"

function App() {

	const [open, setOpen] = useState(false)

	return (
		<div className="">
			<button onClick={() => setOpen(true)}>open dialog</button>

			<Drawer isOpen={open} onClose={() => setOpen(false)} >
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
			</Drawer>
		</div>
	)
}

export default App