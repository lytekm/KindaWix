import FontStyleControls from "./FontStyle";
import BoxModelInputs from "./BoxModelInputs";


interface InputConfig {
    handleUpdateStyle: (style: React.CSSProperties) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveStyle: () => void;
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const TextInputs = ({ handleUpdateStyle, handleChange, saveStyle, handleColorChange}:InputConfig) => {

    return(
        <>
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