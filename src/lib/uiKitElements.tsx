'use client'
import { BarLoader } from "@/uiKit/loaders/barLoader/barLoader";
import { BeatLoader } from "@/uiKit/loaders/beatLoader/beatLoader";
import { ClipLoader } from "@/uiKit/loaders/clipLoader/clipLoader";
import { DotLoader } from "@/uiKit/loaders/dotLoader/dotLoader";
import { FadeLoader } from "@/uiKit/loaders/fadeLoader/fadeLoader";
import { GridLoader } from "@/uiKit/loaders/gridLoader/gridLoader";
import { PropagateLoader } from "@/uiKit/loaders/propagateLoader/propagateLoader";
import { PuffLoader } from "@/uiKit/loaders/puffLoader/puffLoader";
import { PulseLoader } from "@/uiKit/loaders/pulseLoader/pulseLoader";
import { ScaleLoader } from "@/uiKit/loaders/scaleLoader/scaleLoader";
import { Component, Hammer } from "lucide-react";
import React from "react";

export interface IUikitElements {
    title: string;
    url: string;
    description: string;
    component: () => React.ReactNode;
}

function Hook() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.586 11.414l-5.93 5.93a1 1 0 01-8-8l3.137-3.137a.707.707 0 011.207.5V10M20.414 8.586L22 7" />
            <circle cx={19} cy={10} r={2} />
        </svg>
    )
}

export const docsList = [
    {component:() => <></>, description:'docs', title:'Introdução', url:'/docs/introduction'},
    {component:() => <></>, description:'docs', title:'Instalação', url:'/docs/installation'},
]as const satisfies IUikitElements[];

export const componentsList = [
    { url: "/components/actionMenu", title: "Action Menu", description: "Menu contextual com ações rápidas para itens.", component: () =><Component strokeWidth={1.5} />  },
    { url: "/components/autoComplete", title: "Auto complete", description: "Campo de busca com sugestões dinâmicas.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/button", title: "Button", description: "Botão interativo para ações do usuário.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/calendar", title: "Calendar", description: "Seletor visual de datas.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/carousel", title: "Carousel", description: "Slider horizontal para navegação de conteúdo.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/checkbox", title: "Checkbox", description: "Controle para seleção múltipla de opções.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/chips", title: "Chips", description: "Elementos compactos para exibir ou selecionar itens.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/currencyInput", title: "Currency Input", description: "Input com formatação automática de valores monetários.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/dataTable", title: "Data Table", description: "Tabela avançada com ordenação e filtros.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/dataView", title: "Data View", description: "Exibição flexível de dados em diferentes layouts.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/drawer", title: "Drawer", description: "Painel deslizante lateral.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/dropdown", title: "Dropdown", description: "Lista suspensa para seleção de opções.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/inputOtp", title: "Input Otp", description: "Campo para inserção de códigos OTP.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/inputSwitch", title: "Input Switch", description: "Alternador binário (ligado/desligado).", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/inputTextArea", title: "Input Text Area", description: "Campo para textos longos.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/maskInput", title: "Mask Input", description: "Input com máscara para formatação de dados.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/modal", title: "Modal", description: "Janela sobreposta para foco em conteúdo.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/orderList", title: "Order List", description: "Lista ordenável com drag and drop.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/radioGroup", title: "Radio Group", description: "Grupo de seleção única entre opções.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/rating", title: "Rating", description: "Sistema de avaliação por estrelas ou níveis.", component: () => <Component strokeWidth={1.5} /> },
    { url: "/components/tooltip", title: "Tooltip", description: "Dica exibida ao passar o mouse.", component: () => <Component strokeWidth={1.5} /> },
] as const satisfies IUikitElements[];

export const hooksList = [
    { url: "/hooks/useDebounce", title: "useDebounce", description: "Retarda a atualização de um valor.", component: () => <Hook/> },
    { url: "/hooks/useDebounceCallback", title: "useDebounceCallback", description: "Debounce aplicado a funções.", component: () => <Hook/>  },
    { url: "/hooks/useDocumentTitle", title: "useDocumentTitle", description: "Atualiza o título da página dinamicamente.", component: () => <Hook/>  },
    { url: "/hooks/useInputFocus", title: "useInputFocus", description: "Gerencia foco em inputs facilmente.", component: () => <Hook/>  },
    { url: "/hooks/useIsMobile", title: "useIsMobile", description: "Detecta se o dispositivo é mobile.", component: () => <Hook/>  },
    { url: "/hooks/useMousePosition", title: "useMousePosition", description: "Rastreia a posição do mouse.", component: () => <Hook/>  },
    { url: "/hooks/useOnClickOutside", title: "useOnClickOutside", description: "Detecta cliques fora de um elemento.", component: () => <Hook/>  },
] as const satisfies IUikitElements[];

export const utilitiesList = [
    { url: '/utilities/dbSchemaDesigner', title: "Database Schema Designer", description: "Ferramenta para modelagem de banco de dados.", component: () => <Hammer strokeWidth={1.5}/> },
    { url: '/utilities/imageConverter', title: "Conversor de imagem", description: "Ferramenta para converter imagens.", component: () => <Hammer strokeWidth={1.5}/> },
    { url: '/utilities/mindForge', title: "Mind Forge", description: "Organizador visual de ideias e fluxos.", component: () => <Hammer strokeWidth={1.5}/> },
    { url: '/utilities/peerDrop', title: "Peer Drop", description: "Compartilhamento de arquivos entre dispositivos.", component: () => <Hammer strokeWidth={1.5}/> },
    { url: '/utilities/pomodoro', title: "Pomodoro", description: "Timer de produtividade que alterna entre períodos de foco e pausas curtas.", component: () => <Hammer strokeWidth={1.5}/> },
] as const satisfies IUikitElements[];

export const loadersList = [
    { url: '/loaders/barLoader', title: "Bar Loader", description: "Loader em formato de barras animadas.", component: () => <BarLoader /> },
    { url: '/loaders/beatLoader', title: "Beat Loader", description: "Animação pulsante estilo batida.", component: () => <BeatLoader /> },
    { url: '/loaders/clipLoader', title: "Clip Loader", description: "Spinner circular simples.", component: () => <ClipLoader /> },
    { url: '/loaders/dotLoader', title: "Dot Loader", description: "Pontos animados em sequência.", component: () => <DotLoader /> },
    { url: '/loaders/fadeLoader', title: "Fade Loader", description: "Animação com efeito de fade.", component: () => <FadeLoader /> },
    { url: '/loaders/gridLoader', title: "Grid Loader", description: "Grade animada com múltiplos elementos.", component: () => <GridLoader /> },
    { url: '/loaders/propagateLoader', title: "Propagate Loader", description: "Animação de expansão em ondas.", component: () => <PropagateLoader /> },
    { url: '/loaders/puffLoader', title: "Puff Loader", description: "Efeito de expansão suave (puff).", component: () => <PuffLoader /> },
    { url: '/loaders/pulseLoader', title: "Pulse Loader", description: "Animação de pulsação contínua.", component: () => <PulseLoader /> },
    { url: '/loaders/scaleLoader', title: "Scale Loader", description: "Barras com efeito de escala vertical.", component: () => <ScaleLoader /> }
] as const satisfies IUikitElements[];