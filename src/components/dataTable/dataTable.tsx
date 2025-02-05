import { AgGridReact } from "ag-grid-react";
import { ComponentProps, forwardRef, Ref } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { CellEditingStoppedEvent, GridApi, RowClickedEvent, themeQuartz } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule, PaginationModule, NumberFilterModule, TextFilterModule, LocaleModule, RowStyleModule, CheckboxEditorModule, ValidationModule, DateFilterModule, } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule, NumberFilterModule, TextFilterModule, LocaleModule, CheckboxEditorModule, RowStyleModule, ValidationModule, DateFilterModule,]);

const AG_GRID_LOCALE_BR = {
    localeText: {
        // Set Filter
        selectAll: "(Selecionar Todos)",
        selectAllSearchResults: "(Selecionar Todos os Resultados da Pesquisa)",
        addCurrentSelectionToFilter: "Adicionar seleção atual ao filtro",
        searchOoo: "Pesquisar...",
        blanks: "(Em Branco)",
        noMatches: "Sem correspondências",

        // Number Filter & Text Filter
        filterOoo: "Filtrar...",
        equals: "Igual",
        notEqual: "Diferente de",
        blank: "Em branco",
        notBlank: "Não está em branco",
        empty: "Escolha um",

        // Number Filter
        lessThan: "Menor que",
        greaterThan: "Maior que",
        lessThanOrEqual: "Menor ou igual a",
        greaterThanOrEqual: "Maior ou igual a",
        inRange: "Entre",
        inRangeStart: "De",
        inRangeEnd: "Para",

        // Text Filter
        contains: "Contém",
        notContains: "Não contém",
        startsWith: "Começa com",
        endsWith: "Termina com",

        // Date Filter
        dateFormatOoo: "yyyy-mm-dd",
        before: "Antes",
        after: "Depois",

        // Filter Conditions
        andCondition: "E",
        orCondition: "OU",

        // Filter Buttons
        applyFilter: "Aplicar",
        resetFilter: "Redefinir",
        clearFilter: "Limpar",
        cancelFilter: "Cancelar",

        // Filter Titles
        textFilter: "Filtro de Texto",
        numberFilter: "Filtro Numérico",
        dateFilter: "Filtro de Data",
        setFilter: "Filtro de Conjunto",

        // Group Column Filter
        groupFilterSelect: "Selecionar campo:",

        // Advanced Filter
        advancedFilterContains: "contém",
        advancedFilterNotContains: "não contém",
        advancedFilterTextEquals: "é igual a",
        advancedFilterTextNotEqual: "não é igual a",
        advancedFilterStartsWith: "começa com",
        advancedFilterEndsWith: "termina com",
        advancedFilterBlank: "está em branco",
        advancedFilterNotBlank: "não está em branco",
        advancedFilterEquals: "=",
        advancedFilterNotEqual: "!=",
        advancedFilterGreaterThan: ">",
        advancedFilterGreaterThanOrEqual: ">=",
        advancedFilterLessThan: "<",
        advancedFilterLessThanOrEqual: "<=",
        advancedFilterTrue: "é verdadeiro",
        advancedFilterFalse: "é falso",
        advancedFilterAnd: "E",
        advancedFilterOr: "OU",
        advancedFilterApply: "Aplicar",
        advancedFilterBuilder: "Construtor",
        advancedFilterValidationMissingColumn: "Coluna está faltando",
        advancedFilterValidationMissingOption: "Opção está faltando",
        advancedFilterValidationMissingValue: "Valor está faltando",
        advancedFilterValidationInvalidColumn: "Coluna não encontrada",
        advancedFilterValidationInvalidOption: "Opção não encontrada",
        advancedFilterValidationMissingQuote:
            "Valor está faltando uma aspa final",
        advancedFilterValidationNotANumber: "Valor não é um número",
        advancedFilterValidationInvalidDate: "Valor não é uma data válida",
        advancedFilterValidationMissingCondition: "Condição está faltando",
        advancedFilterValidationJoinOperatorMismatch:
            "Operadores de junção dentro de uma condição devem ser os mesmos",
        advancedFilterValidationInvalidJoinOperator:
            "Operador de junção não encontrado",
        advancedFilterValidationMissingEndBracket: "Faltando colchete final",
        advancedFilterValidationExtraEndBracket: "Colchetes finais em excesso",
        advancedFilterValidationMessage:
            "Expressão tem um erro. ${variable} - ${variable}.",
        advancedFilterValidationMessageAtEnd:
            "Expressão tem um erro. ${variable} no final da expressão.",
        advancedFilterBuilderTitle: "Filtro Avançado",
        advancedFilterBuilderApply: "Aplicar",
        advancedFilterBuilderCancel: "Cancelar",
        advancedFilterBuilderAddButtonTooltip: "Adicionar Filtro ou Grupo",
        advancedFilterBuilderRemoveButtonTooltip: "Remover",
        advancedFilterBuilderMoveUpButtonTooltip: "Mover para Cima",
        advancedFilterBuilderMoveDownButtonTooltip: "Mover para Baixo",
        advancedFilterBuilderAddJoin: "Adicionar Grupo",
        advancedFilterBuilderAddCondition: "Adicionar Filtro",
        advancedFilterBuilderSelectColumn: "Selecionar uma coluna",
        advancedFilterBuilderSelectOption: "Selecionar uma opção",
        advancedFilterBuilderEnterValue: "Digite um valor...",
        advancedFilterBuilderValidationAlreadyApplied:
            "Filtro atual já aplicado.",
        advancedFilterBuilderValidationIncomplete:
            "Nem todas as condições estão completas.",
        advancedFilterBuilderValidationSelectColumn:
            "Deve selecionar uma coluna.",
        advancedFilterBuilderValidationSelectOption:
            "Deve selecionar uma opção.",
        advancedFilterBuilderValidationEnterValue: "Deve digitar um valor.",

        // Side Bar
        columns: "Colunas",
        filters: "Filtros",

        // columns tool panel
        pivotMode: "Modo Pivot",
        groups: "Agrupamentos de Linhas",
        rowGroupColumnsEmptyMessage:
            "Arraste aqui para definir os grupos de linhas",
        values: "Valores",
        valueColumnsEmptyMessage: "Arraste aqui para agregar",
        pivots: "Rótulos de Colunas",
        pivotColumnsEmptyMessage:
            "Arraste aqui para definir os rótulos das colunas",

        // Header of the Default Group Column
        group: "Grupo",

        // Row Drag
        rowDragRow: "linha",
        rowDragRows: "linhas",

        // Other
        loadingOoo: "Carregando...",
        loadingError: "ERR",
        noRowsToShow: "Sem linhas para mostrar",
        enabled: "Ativado",

        // Menu
        pinColumn: "Fixar Coluna",
        pinLeft: "Fixar à Esquerda",
        pinRight: "Fixar à Direita",
        noPin: "Sem Fixação",
        valueAggregation: "Agregação de Valor",
        noAggregation: "Nenhum",
        autosizeThisColumn: "Autoajustar Esta Coluna",
        autosizeAllColumns: "Autoajustar Todas as Colunas",
        groupBy: "Agrupar por",
        ungroupBy: "Desagrupar por",
        ungroupAll: "Desagrupar Todos",
        addToValues: "Adicionar ${variable} aos valores",
        removeFromValues: "Remover ${variable} dos valores",
        addToLabels: "Adicionar ${variable} aos rótulos",
        removeFromLabels: "Remover ${variable} dos rótulos",
        resetColumns: "Redefinir Colunas",
        expandAll: "Expandir Todos os Grupos de Linhas",
        collapseAll: "Fechar Todos os Grupos de Linhas",
        copy: "Copiar",
        ctrlC: "Ctrl+C",
        ctrlX: "Ctrl+X",
        copyWithHeaders: "Copiar com Cabeçalhos",
        copyWithGroupHeaders: "Copiar com Cabeçalhos de Grupo",
        cut: "Cortar",
        paste: "Colar",
        ctrlV: "Ctrl+V",
        export: "Exportar",
        csvExport: "Exportar CSV",
        excelExport: "Exportar Excel",
        columnFilter: "Filtro de Coluna",
        columnChooser: "Escolher Colunas",
        chooseColumns: "Escolher Colunas",
        sortAscending: "Ordenar Crescente",
        sortDescending: "Ordenar Decrescente",
        sortUnSort: "Limpar Ordenação",

        // Enterprise Menu Aggregation and Status Bar
        sum: "Soma",
        first: "Primeiro",
        last: "Último",
        min: "Mínimo",
        max: "Máximo",
        none: "Nenhum",
        count: "Contar",
        avg: "Média",
        filteredRows: "Filtradas",
        selectedRows: "Selecionadas",
        totalRows: "Total de Linhas",
        totalAndFilteredRows: "Linhas",
        more: "Mais",
        to: "até",
        of: "de",
        page: "Página",
        pageLastRowUnknown: "?",
        nextPage: "Próxima Página",
        lastPage: "Última Página",
        firstPage: "Primeira Página",
        previousPage: "Página Anterior",
        pageSizeSelectorLabel: "Itens por Página:",
        footerTotal: "Total",

        // Pivoting
        pivotColumnGroupTotals: "Total",

        // Enterprise Menu (Charts)
        pivotChartAndPivotMode: "Gráfico de Pivot e Modo Pivot",
        pivotChart: "Gráfico de Pivot",
        chartRange: "Intervalo do Gráfico",
        columnChart: "Coluna",
        groupedColumn: "Agrupada",
        stackedColumn: "Empilhada",
        normalizedColumn: "100% Empilhada",
        barChart: "Barra",
        groupedBar: "Agrupada",
        stackedBar: "Empilhada",
        normalizedBar: "100% Empilhada",
        pieChart: "Pizza",
        pie: "Pizza",
        donut: "Rosca",
        line: "Linha",
        xyChart: "X Y (Dispersão)",
        scatter: "Dispersão",
        bubble: "Bolha",
        areaChart: "Área",
        area: "Área",
        stackedArea: "Empilhada",
        normalizedArea: "100% Empilhada",
        histogramChart: "Histograma",
        polarChart: "Polar",
        radarLine: "Linha de Radar",
        radarArea: "Área de Radar",
        nightingale: "Nightingale",
        radialColumn: "Coluna Radial",
        radialBar: "Barra Radial",
        statisticalChart: "Estatístico",
        boxPlot: "Gráfico de Caixa",
        rangeBar: "Barra de Intervalo",
        rangeArea: "Área de Intervalo",
        hierarchicalChart: "Hierárquico",
        treemap: "Mapa de Árvore",
        sunburst: "Explosão Solar",
        specializedChart: "Especializado",
        waterfall: "Cascata",
        heatmap: "Mapa de Calor",
        combinationChart: "Combinação",
        columnLineCombo: "Coluna & Linha",
        AreaColumnCombo: "Área & Coluna",

        // Charts
        pivotChartTitle: "Gráfico Dinâmico",
        rangeChartTitle: "Gráfico de Intervalo",
        settings: "Gráfico",
        data: "Configurar",
        format: "Personalizar",
        categories: "Categorias",
        defaultCategory: "(Nenhuma)",
        series: "Séries",
        switchCategorySeries: "Trocar Categoria / Série",
        categoryValues: "Valores de Categoria",
        seriesLabels: "Rótulos das Séries",
        aggregate: "Agregado",
        xyValues: "Valores XY",
        paired: "Modo Pareado",
        axis: "Eixo",
        xAxis: "Eixo Horizontal",
        yAxis: "Eixo Vertical",
        polarAxis: "Eixo Polar",
        radiusAxis: "Eixo do Raio",
        navigator: "Navegador",
        zoom: "Zoom",
        animation: "Animação",
        crosshair: "Mira",
        color: "Cor",
        thickness: "Espessura",
        preferredLength: "Comprimento Preferido",
        xType: "Tipo X",
        axisType: "Tipo de Eixo",
        automatic: "Automático",
        category: "Categoria",
        number: "Número",
        time: "Tempo",
        timeFormat: "Formato de Tempo",
        autoRotate: "Rotação Automática",
        labelRotation: "Rotação",
        circle: "Círculo",
        polygon: "Polígono",
        square: "Quadrado",
        cross: "Cruz",
        diamond: "Diamante",
        plus: "Mais",
        triangle: "Triângulo",
        heart: "Coração",
        orientation: "Orientação",
        fixed: "Fixo",
        parallel: "Paralelo",
        perpendicular: "Perpendicular",
        radiusAxisPosition: "Posição",
        ticks: "Marcas",
        gridLines: "Linhas de Grade",
        width: "Largura",
        height: "Altura",
        length: "Comprimento",
        padding: "Preenchimento",
        spacing: "Espaçamento",
        chartStyle: "Estilo do Gráfico",
        title: "Título",
        chartTitles: "Títulos",
        chartTitle: "Título do Gráfico",
        chartSubtitle: "Subtítulo",
        horizontalAxisTitle: "Título do Eixo Horizontal",
        verticalAxisTitle: "Título do Eixo Vertical",
        polarAxisTitle: "Título do Eixo Polar",
        titlePlaceholder: "Título do Gráfico",
        background: "Fundo",
        font: "Fonte",
        weight: "Peso",
        top: "Topo",
        right: "Direita",
        bottom: "Fundo",
        left: "Esquerda",
        labels: "Rótulos",
        calloutLabels: "Rótulos de Chamada",
        sectorLabels: "Rótulos de Setor",
        positionRatio: "Razão de Posição",
        size: "Tamanho",
        shape: "Forma",
        minSize: "Tamanho Mínimo",
        maxSize: "Tamanho Máximo",
        legend: "Legenda",
        position: "Posição",
        markerSize: "Tamanho do Marcador",
        markerStroke: "Contorno do Marcador",
        markerPadding: "Preenchimento do Marcador",
        itemSpacing: "Espaçamento do Item",
        itemPaddingX: "Preenchimento do Item X",
        itemPaddingY: "Preenchimento do Item Y",
        layoutHorizontalSpacing: "Espaçamento Horizontal",
        layoutVerticalSpacing: "Espaçamento Vertical",
        strokeWidth: "Largura do Traço",
        offset: "Deslocamento",
        offsets: "Deslocamentos",
        tooltips: "Dicas de Ferramenta",
        callout: "Chamada",
        markers: "Marcadores",
        shadow: "Sombra",
        blur: "Desfoque",
        xOffset: "Deslocamento X",
        yOffset: "Deslocamento Y",
        lineWidth: "Largura da Linha",
        lineDash: "Tracejado da Linha",
        lineDashOffset: "Deslocamento do Tracejado",
        scrollingZoom: "Rolagem",
        scrollingStep: "Passo da Rolagem",
        selectingZoom: "Selecionando",
        durationMillis: "Duração (ms)",
        crosshairLabel: "Rótulo",
        crosshairSnap: "Ajustar ao Nó",
        normal: "Normal",
        bold: "Negrito",
        italic: "Itálico",
        boldItalic: "Negrito Itálico",
        predefined: "Pré-definido",
        fillOpacity: "Opacidade do Preenchimento",
        strokeColor: "Cor da Linha",
        strokeOpacity: "Opacidade da Linha",
        miniChart: "Mini-Gráfico",
        histogramBinCount: "Contagem de Classes",
        connectorLine: "Linha de Conexão",
        seriesItems: "Itens da Série",
        seriesItemType: "Tipo de Item",
        seriesItemPositive: "Positivo",
        seriesItemNegative: "Negativo",
        seriesItemLabels: "Rótulos dos Itens",
        columnGroup: "Coluna",
        barGroup: "Barra",
        pieGroup: "Pizza",
        lineGroup: "Linha",
        scatterGroup: "XY (Dispersão)",
        areaGroup: "Área",
        polarGroup: "Polar",
        statisticalGroup: "Estatístico",
        hierarchicalGroup: "Hierárquico",
        specializedGroup: "Especializado",
        combinationGroup: "Combinação",
        groupedColumnTooltip: "Agrupado",
        stackedColumnTooltip: "Empilhado",
        normalizedColumnTooltip: "Empilhado 100%",
        groupedBarTooltip: "Agrupado",
        stackedBarTooltip: "Empilhado",
        normalizedBarTooltip: "Empilhado 100%",
        pieTooltip: "Pizza",
        donutTooltip: "Rosquinha",
        lineTooltip: "Linha",
        groupedAreaTooltip: "Área",
        stackedAreaTooltip: "Empilhado",
        normalizedAreaTooltip: "Empilhado 100%",
        scatterTooltip: "Dispersão",
        bubbleTooltip: "Bolha",
        histogramTooltip: "Histograma",
        radialColumnTooltip: "Coluna Radial",
        radialBarTooltip: "Barra Radial",
        radarLineTooltip: "Linha de Radar",
        radarAreaTooltip: "Área de Radar",
        nightingaleTooltip: "Nightingale",
        rangeBarTooltip: "Barra de Intervalo",
        rangeAreaTooltip: "Área de Intervalo",
        boxPlotTooltip: "Box Plot",
        treemapTooltip: "Mapa de Árvore",
        sunburstTooltip: "Raios de Sol",
        waterfallTooltip: "Cascata",
        heatmapTooltip: "Mapa de Calor",
        columnLineComboTooltip: "Coluna & Linha",
        areaColumnComboTooltip: "Área & Coluna",
        customComboTooltip: "Combinação Personalizada",
        innerRadius: "Raio Interno",
        startAngle: "Ângulo Inicial",
        endAngle: "Ângulo Final",
        reverseDirection: "Inverter Direção",
        groupPadding: "Preenchimento do Grupo",
        seriesPadding: "Preenchimento da Série",
        tile: "Azulejo",
        whisker: "Bigode",
        cap: "Tampa",
        capLengthRatio: "Razão do Comprimento",
        labelPlacement: "Posicionamento",
        inside: "Dentro",
        outside: "Fora",
        noDataToChart: "Não há dados disponíveis para serem gráficos.",
        pivotChartRequiresPivotMode:
            "Gráfico Dinâmico requer o Modo Dinâmico ativado.",
        chartSettingsToolbarTooltip: "Menu",
        chartLinkToolbarTooltip: "Vinculado à Grade",
        chartUnlinkToolbarTooltip: "Desvinculado da Grade",
        chartDownloadToolbarTooltip: "Baixar Gráfico",
        chartMenuToolbarTooltip: "Menu",
        chartEdit: "Editar Gráfico",
        chartAdvancedSettings: "Configurações Avançadas",
        chartLink: "Vincular à Grade",
        chartUnlink: "Desvincular da Grade",
        chartDownload: "Baixar Gráfico",
        histogramFrequency: "Frequência",
        seriesChartType: "Tipo de Gráfico da Série",
        seriesType: "Tipo de Série",
        secondaryAxis: "Eixo Secundário",
        seriesAdd: "Adicionar uma série",
        categoryAdd: "Adicionar uma categoria",
        bar: "Barra",
        column: "Coluna",
        histogram: "Histograma",
        advancedSettings: "Configurações Avançadas",
        direction: "Direção",
        horizontal: "Horizontal",
        vertical: "Vertical",
        seriesGroupType: "Tipo de Grupo",
        groupedSeriesGroupType: "Agrupado",
        stackedSeriesGroupType: "Empilhado",
        normalizedSeriesGroupType: "Empilhado 100%",
        legendEnabled: "Habilitado",
        invalidColor: "Valor de cor inválido",
        groupedColumnFull: "Coluna Agrupada",
        stackedColumnFull: "Coluna Empilhada",
        normalizedColumnFull: "Coluna Empilhada 100%",
        groupedBarFull: "Barra Agrupada",
        stackedBarFull: "Barra Empilhada",
        normalizedBarFull: "Barra Empilhada 100%",
        stackedAreaFull: "Área Empilhada",
        normalizedAreaFull: "Área Empilhada 100%",
        customCombo: "Combinação Personalizada",

        // ARIA
        ariaAdvancedFilterBuilderItem:
            "${variable}. Nível ${variable}. Pressione ENTER para editar.",
        ariaAdvancedFilterBuilderItemValidation:
            "${variable}. Nível ${variable}. ${variable} Pressione ENTER para editar.",
        ariaAdvancedFilterBuilderList:
            "Lista de Construtores de Filtros Avançados",
        ariaAdvancedFilterBuilderFilterItem: "Condição do Filtro",
        ariaAdvancedFilterBuilderGroupItem: "Grupo de Filtros",
        ariaAdvancedFilterBuilderColumn: "Coluna",
        ariaAdvancedFilterBuilderOption: "Opção",
        ariaAdvancedFilterBuilderValueP: "Valor",
        ariaAdvancedFilterBuilderJoinOperator: "Operador de Junção",
        ariaAdvancedFilterInput: "Entrada de Filtro Avançado",
        ariaChecked: "marcado",
        ariaColumn: "Coluna",
        ariaColumnGroup: "Grupo de Colunas",
        ariaColumnFiltered: "Coluna Filtrada",
        ariaColumnSelectAll: "Alternar Selecionar Todas as Colunas",
        ariaDateFilterInput: "Entrada de Filtro de Data",
        ariaDefaultListName: "Lista",
        ariaFilterColumnsInput: "Entrada de Colunas de Filtro",
        ariaFilterFromValue: "Filtrar do valor",
        ariaFilterInput: "Entrada de Filtro",
        ariaFilterList: "Lista de Filtros",
        ariaFilterToValue: "Filtrar até o valor",
        ariaFilterValue: "Valor do Filtro",
        ariaFilterMenuOpen: "Abrir Menu de Filtro",
        ariaFilteringOperator: "Operador de Filtragem",
        ariaHidden: "oculto",
        ariaIndeterminate: "indeterminado",
        ariaInputEditor: "Editor de Entrada",
        ariaMenuColumn: "Pressione ALT PARA BAIXO para abrir o menu da coluna",
        ariaFilterColumn: "Pressione CTRL ENTER para abrir o filtro",
        ariaRowDeselect: "Pressione SPACE para desselecionar esta linha",
        ariaRowSelectAll:
            "Pressione SPACE para alternar a seleção de todas as linhas",
        ariaRowToggleSelection:
            "Pressione SPACE para alternar a seleção da linha",
        ariaRowSelect: "Pressione SPACE para selecionar esta linha",
        ariaRowSelectionDisabled:
            "A seleção de linha está desativada para esta linha",
        ariaSearch: "Pesquisar",
        ariaSortableColumn: "Pressione ENTER para classificar",
        ariaToggleVisibility: "Pressione SPACE para alternar a visibilidade",
        ariaToggleCellValue: "Pressione SPACE para alternar o valor da célula",
        ariaUnchecked: "desmarcado",
        ariaVisible: "visível",
        ariaSearchFilterValues: "Pesquisar valores de filtro",
        ariaPageSizeSelectorLabel: "Tamanho da Página",
        ariaChartMenuClose: "Fechar Menu de Edição do Gráfico",
        ariaChartSelected: "Selecionado",
        ariaSkeletonCellLoadingFailed: "Falha no carregamento da linha",
        ariaSkeletonCellLoading: "Carregando dados da linha",

        // ARIA Labels for Drop Zones
        ariaRowGroupDropZonePanelLabel: "Agrupamento de Linhas",
        ariaValuesDropZonePanelLabel: "Valores",
        ariaPivotDropZonePanelLabel: "Rótulos de Colunas",
        ariaDropZoneColumnComponentDescription: "Pressione DELETE para remover",
        ariaDropZoneColumnValueItemDescription:
            "Pressione ENTER para alterar o tipo de agregação",
        ariaDropZoneColumnGroupItemDescription: "Pressione ENTER para ordenar",

        // used for aggregate drop zone, format: {aggregation}{ariaDropZoneColumnComponentAggFuncSeparator}{column name}
        ariaDropZoneColumnComponentAggFuncSeparator: " de ",
        ariaDropZoneColumnComponentSortAscending: "crescente",
        ariaDropZoneColumnComponentSortDescending: "decrescente",
        ariaLabelDialog: "Diálogo",
        ariaLabelColumnMenu: "Menu de Coluna",
        ariaLabelColumnFilter: "Filtro de Coluna",
        ariaLabelCellEditor: "Editor de Célula",
        ariaLabelSelectField: "Selecionar Campo",

        // aria labels for rich select
        ariaLabelRichSelectField: "Campo de Seleção Rica",
        ariaLabelRichSelectToggleSelection:
            "Pressione ESPAÇO para alternar a seleção",
        ariaLabelRichSelectDeselectAllItems:
            "Pressione DELETE para desmarcar todos os itens",
        ariaLabelRichSelectDeleteSelection:
            "Pressione DELETE para desmarcar o item",
        ariaLabelTooltip: "Dica de Ferramenta",
        ariaLabelContextMenu: "Menu Contextual",
        ariaLabelSubMenu: "Submenu",
        ariaLabelAggregationFunction: "Função de Agregação",
        ariaLabelAdvancedFilterAutocomplete: "Autocompletar Filtro Avançado",
        ariaLabelAdvancedFilterBuilderAddField:
            "Adicionar Campo no Construtor de Filtro Avançado",
        ariaLabelAdvancedFilterBuilderColumnSelectField:
            "Selecionar Campo da Coluna no Construtor de Filtro Avançado",
        ariaLabelAdvancedFilterBuilderOptionSelectField:
            "Selecionar Campo de Opção no Construtor de Filtro Avançado",
        ariaLabelAdvancedFilterBuilderJoinSelectField:
            "Selecionar Campo do Operador de Junção no Construtor de Filtro Avançado",

        // ARIA Labels for the Side Bar
        ariaColumnPanelList: "Lista de Colunas",
        ariaFilterPanelList: "Lista de Filtros",

        // Number Format (Status Bar, Pagination Panel)
        thousandSeparator: ".",
        decimalSeparator: ",",

        // Data types
        true: "Verdadeiro",
        false: "Falso",
        invalidDate: "Data Inválida",
        invalidNumber: "Número Inválido",
        january: "Janeiro",
        february: "Fevereiro",
        march: "Março",
        april: "Abril",
        may: "Maio",
        june: "Junho",
        july: "Julho",
        august: "Agosto",
        september: "Setembro",
        october: "Outubro",
        november: "Novembro",
        december: "Dezembro",

        // Time formats
        timeFormatSlashesDDMMYYYY: "DD/MM/YYYY",
        timeFormatSlashesMMDDYYYY: "MM/DD/YYYY",
        timeFormatSlashesDDMMYY: "DD/MM/YY",
        timeFormatSlashesMMDDYY: "MM/DD/YY",
        timeFormatDotsDDMYY: "DD.M.AA",
        timeFormatDotsMDDYY: "M.DD.AA",
        timeFormatDashesYYYYMMDD: "AAAA-MM-DD",
        timeFormatSpacesDDMMMMYYYY: "DD MMMM AAAA",
        timeFormatHHMMSS: "HH:MM:SS",
        timeFormatHHMMSSAmPm: "HH:MM:SS AM/PM",
    },
};
interface DataTableColumnDefinition {
    field: string,
    headerName: string,
    flex: number,
    filter: boolean,
    floatingFilter: boolean,
    resizable: boolean,
    cellRenderer?: (params: any) => React.ReactNode
    cellStyle?: React.CSSProperties | any,
    onCellDoubleClicked?: any,
    onCellClicked?: any,
    valueFormatter?: string | ((params: any) => string),
    editable?: boolean | ((params: any) => boolean),
    tooltipValueGetter?: (p: any) => string,
    hide?: boolean,
    onCellValueChanged?: (event: any) => void,
    filterParams?: { filterPlaceholder: string },
    floatingFilterComponent?: any,
    cellEditor?: ({ value, onValueChange }: any) => Element | React.JSX.Element,
    minWidth?: number
    sort?: 'asc' | 'desc',
    sortedAt?: number
}

interface IDataTable {
    rowData: Array<any> | null,
    columnDefs: Array<DataTableColumnDefinition>,
    onRowClick?: Function
    props?: any,
    onCellEditingStopped?: Function,
    isLoading?: boolean,
    rowSelection?: any,
    pagination?: boolean,
    suppressColumnVirtualisation?: boolean
    tableref?: Ref<any>
    pageSize?: number,
    paginationPageSizeSelector?: Array<number>
    
}

const table = tv({
    base: 'h-fit w-full overflow-auto z-10'
})

type tableProps = ComponentProps<'div'> & VariantProps<typeof table> & IDataTable

const DataTable = forwardRef<HTMLDivElement, tableProps>(
    ({ className, tableref, rowData, columnDefs, onRowClick, onCellEditingStopped, isLoading = false, rowSelection, pagination = true, suppressColumnVirtualisation = false, pageSize = 10, paginationPageSizeSelector = [10, 20, 30], ...props }, ref) => {
        return (
            <div className={table({ className })} ref={ref}>
                <AgGridReact<any>
                    ref={tableref}
                    rowData={rowData}
                    theme={themeQuartz}
                    columnDefs={columnDefs}
                    pagination={pagination}
                    paginationPageSize={pageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    localeText={AG_GRID_LOCALE_BR.localeText}
                    domLayout="autoHeight"
                    onRowClicked={(e: RowClickedEvent<any, any>) => onRowClick && onRowClick(e)}
                    onCellEditingStopped={(e: CellEditingStoppedEvent<any, any>) => onCellEditingStopped && onCellEditingStopped(e)}
                    tooltipShowDelay={500}
                    tooltipInteraction
                    loading={isLoading}
                    rowSelection={rowSelection && rowSelection}
                    suppressDragLeaveHidesColumns={true}
                    rowClass={onRowClick ? 'cursor-pointer' : ''}
                    suppressColumnVirtualisation={suppressColumnVirtualisation}
                    {...props}
                />
            </div>
        )
    }
)

export default DataTable