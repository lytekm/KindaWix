import LabeledInput from "../TextEditing/Input";
import { useStyleContext } from "../StyleContext";
import BoxModelInputs from "../TextEditing/BoxModelInputs";
import Dropdown from "@/public/UI/Dropdown";


interface InputConfig {
    handleUpdateStyle: (style: React.CSSProperties) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveStyle: () => void;
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInputs = ({ handleChange, saveStyle, handleColorChange, handleUpdateStyle}:InputConfig) => {
    const { newStyle, getValueWithoutPx } = useStyleContext();

    return(
        <>
        <Dropdown label="Image">
          <LabeledInput
            label="Width"
            name="width"
            type="text"
            value={getValueWithoutPx(newStyle.width)}
            onChange={handleChange}
            onBlur={saveStyle}
            onColorChange={handleColorChange}
          />
        </Dropdown>

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

export default ImageInputs;