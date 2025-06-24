import type { IAfterGuiAttachedParams, IDoesFilterPassParams } from "ag-grid-community";
import type { CustomFilterProps } from "ag-grid-react";
import { useGridFilter } from "ag-grid-react";
import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CustomDropdownFilterProps extends CustomFilterProps {
  options: string[]; // List of filter options
}

const CustomDropdownFilter = ({ model, onModelChange, options,getValue }: CustomDropdownFilterProps) => {
  const [closeFilter, setCloseFilter] = useState<(() => void) | undefined>();
  const [unappliedModel, setUnappliedModel] = useState(model);

  // Filtering logic
  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      // const value = params.data[filterField]; // Adjust field if necessary
      const value = getValue(params.node)
      return unappliedModel ? String(value).toLowerCase() === String(unappliedModel).toLowerCase() : true;
    },
    [unappliedModel]
  );


  // Attach filter handlers
  const afterGuiAttached = useCallback(({ hidePopup }: IAfterGuiAttachedParams) => {
    setCloseFilter(() => hidePopup);
  }, []);

  useGridFilter({
    doesFilterPass,
    afterGuiAttached,
  });

  // Sync incoming model changes
  useEffect(() => {
    setUnappliedModel(model);
  }, [model]);

  // Handle option selection
  const onOptionChange = useCallback(({ value}: {value:string}) => {
    onModelChange(value === "Todos" ? null : value);
  }, []);

  // Apply filter and close popup
  const onClick = () => {
    onModelChange(unappliedModel);
    if (closeFilter) {
      closeFilter();
    }
  };

  return (
    <div className="shadow-2xl flex flex-col gap-2 p-1">
      <div>Selecione uma opção</div>
      <div key={'Todos'} onClick={() => onOptionChange({ value: 'Todos' })} className={`cursor-pointer capitalize hover:bg-mainBrown/30 p-0.5 flex flex-row justify-between ${unappliedModel === null ? 'bg-mainBrown/30' :'bg-transparent'}`}>
            <span className="w-full ">{'Todos'}</span>
            {unappliedModel === null && <Check/>}
        </div>
      {options.sort().map((option) => (
        <div key={option} onClick={() => onOptionChange({ value: option })} className={`cursor-pointer capitalize hover:bg-mainBrown/30 p-0.5 flex flex-row justify-between ${unappliedModel == option ? 'bg-mainBrown/30' :'bg-transparent'}`}>
            <span className="w-full ">{option}</span>
            {unappliedModel === option && <Check/>}
        </div>
      ))}
      {/* <Button size="sm" onClick={onClick}>Aplicar</Button> */}
    </div>
  );
};

export default CustomDropdownFilter;
