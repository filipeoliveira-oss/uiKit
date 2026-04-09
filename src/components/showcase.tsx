"use client"

import { Button } from "@/uiKit/components/button/button"
import Checkbox from "@/uiKit/components/checkBox/checkBox"
import { Chips } from "@/uiKit/components/chips/chips"
import Dropdown from "@/uiKit/components/dropdown/dropdown"
import InputSwitch from "@/uiKit/components/inputSwitch/inputSwitch"
import Modal from "@/uiKit/components/modal/modal"
import { Copy, Check, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"



export default function Showcase() {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
	const [checkBox, setCheckbox] = useState(false)
	const [chips, setChips] = useState<Array<string>>([])
	const [modal, setModal] = useState(false)
	const [dropdown, setDropdown] = useState('')
	const [inputSwitch, setInputSwitch] = useState(false)

	const handleCopy = (index: number, textoToCopy: string) => {
		navigator.clipboard.writeText(textoToCopy);
		setCopiedIndex(index)
		setTimeout(() => setCopiedIndex(null), 2000)
	}

	const showcaseComponents = [
		{
			name: "Button",
			cli: 'npx fouikit add button',
			preview: (
				<div className="flex flex-wrap gap-2">
					<Button variant="primary">Primary</Button>
					<Button variant="outline">Outline</Button>
				</div>
			),
		},
		{
			name: "Checkbox",
			cli: 'npx fouikit add',
			preview: (
				<Checkbox setValue={(e) => { setCheckbox(e) }} value={checkBox} />
			),
		},
		{
			name: "Chips",
			cli: 'npx fouikit add',
			description: 'Separe o texto por vírgulas',
			preview: (
				<Chips changeValue={setChips} value={chips} separator="," />
			),
		},
		{
			name: "Modal",
			cli: 'npx fouikit add',
			preview: (
				<>
					<Button onClick={() => setModal(true)}>Mostrar Modal</Button>
					<Modal isOpen={modal} onClose={() => setModal(false)} >
						<span>Esse é o modal</span>
					</Modal>
				</>
			),
		},
		{
			name: "Dropdown",
			cli: 'npx fouikit add',
			preview: (
				<Dropdown onChangeValue={setDropdown} value={dropdown} options={['Opção 1', 'Opção 2', 'Opção 3']} />
			),
		},
		{
			name: "Switch",
			cli: 'npx fouikit add',
			preview: (
				<InputSwitch onChangeChecked={setInputSwitch} checked={inputSwitch} />
			),
		},
	]

	return (
		<section id="components" className="border-t border-border bg-secondary/30 py-20 md:py-28">
			<div className="container mx-auto max-w-6xl px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
						Componentes em destaque
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Uma prévia do que você encontra. Cada componente é customizável e pronto para produção.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{showcaseComponents.map((component, index) => (
						<div
							key={component.name}
							className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
						>
							<div className="mb-4 flex items-center justify-between">
								<h3 className="font-medium">{component.name}</h3>
								<div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Eye className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										onClick={() => handleCopy(index, component.cli)}
									>
										{copiedIndex === index ? (
											<Check className="h-4 w-4 text-green-500" />
										) : (
											<Copy className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>

							{component.description && <span>{component.description}</span>}
							<div className="flex min-h-[80px] items-center justify-center rounded-lg bg-secondary/50 p-4 flex-col gap-2">
								{component.preview}
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<Link href={'/components'}>
						<Button size="default" variant="outline" className="gap-2">
							Ver todos os componentes
						</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
