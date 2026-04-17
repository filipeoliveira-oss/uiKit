'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import OrderList from "@/uiKit/components/orderList/orderList"

export default function OrderListPage() {

    const [items, setItems] = useState<any[]>(
        Array.from({ length: 10 }, (_, i) => `Item ${i}`)
    )

    const Item = (item:any) =>{ return( <div className="w-96 h-fit shadow p-2"> {item} </div> ) }

    const code =
`import OrderList from "@/uiKit/components/orderList/orderList"

export default function Example() {
  const [items, setItems] = useState([
    "Item 0",
    "Item 1",
    "Item 2"
  ])

  const Item = (item) => (
    <div className="p-2 shadow rounded-xl">
      {item}
    </div>
  )

  return (
    <OrderList
      value={items}
      changeValue={setItems}
      itemTemplate={Item}
    />
  )
}`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Order List"
            componentCodeName="orderList"
            description="Componente para ordenação de listas, permitindo reorganizar itens manualmente, com suporte a drag and drop e templates personalizados."
            code={code}
            preview={<OrderList changeValue={(e) => setItems(e)} itemTemplate={Item} value={items} />}
            props={[
                {
                    propName: "value",
                    type: "Array<any>",
                    default: "-",
                    description: "Lista atual de itens",
                    required: true
                },
                {
                    propName: "changeValue",
                    type: "(items: Array<any>) => void",
                    default: "-",
                    description: "Função chamada ao alterar a ordem dos itens",
                    required: true
                },
                {
                    propName: "itemTemplate",
                    type: "(item: any) => React.ReactNode",
                    default: "-",
                    description: "Template utilizado para renderizar cada item da lista",
                    required: true
                },
                {
                    propName: "dragAndDrop",
                    type: "boolean",
                    default: "false",
                    description: "Define se a ordenação por drag and drop estará habilitada",
                    required: false
                },
                {
                    propName: "maxHeight",
                    type: "string",
                    default: "500px",
                    description: "Altura máxima da lista com scroll automático",
                    required: false
                },
                {
                    propName: "header",
                    type: "React.ReactNode",
                    default: "-",
                    description: "Elemento exibido como cabeçalho da lista",
                    required: false
                },
                {
                    propName: "showArrows",
                    type: "Boolean",
                    default: "true",
                    description: "Se as setas devem ser mostradas",
                    required: false
                }
            ]}
        />
    )
}