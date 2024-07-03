import FontStyleControls from "./FontStyle";
import BoxModelInputs from "./BoxModelInputs";
import LabeledInput from "./Input";
import Dropdown from "@/public/UI/Dropdown";
import { useStyleContext } from "../StyleContext";


interface InputConfig {
    handleUpdateStyle: (style: React.CSSProperties) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveStyle: () => void;
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const TextInputs = ({ handleUpdateStyle, handleChange, saveStyle, handleColorChange}:InputConfig) => {

    const { newStyle, currentStyle } = useStyleContext();
    return(
        <>
          <Dropdown label="Background Color">
            <LabeledInput
              label="Background Color"
              name="backgroundColor"
              type="color"
              value={currentStyle.backgroundColor?.toString() || '#ffffff'}
              onChange={handleColorChange}
              onBlur={() => {}}
              onColorChange={handleColorChange}
            />
          </Dropdown>
          <FontStyleControls onUpdateStyle={handleUpdateStyle} />
          <BoxModelInputs
            type="Border"
            handleUpdateStyle={handleUpdateStyle}
            handleChange={handleChange}
            saveStyle={saveStyle}
            handleColorChange={handleColorChange}
          />
          <BoxModelInputs
            type="Margin"
            handleUpdateStyle={handleUpdateStyle}
            handleChange={handleChange}
            saveStyle={saveStyle}
            handleColorChange={handleColorChange}
          />
          <BoxModelInputs
            type="Padding"
            handleUpdateStyle={handleUpdateStyle}
            handleChange={handleChange}
            saveStyle={saveStyle}
            handleColorChange={handleColorChange}
          />
        </>
    )
}

export default TextInputs;