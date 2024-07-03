import LabeledInput from "./Input";
import FontStyleControls from "./FontStyle";

interface InputConfig {
    inputConfigs: {
        label: string;
        name: string;
        type: string;
        value: string;
    }[];
    currentStyle: React.CSSProperties;
    handleUpdateStyle: (style: React.CSSProperties) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveStyle: () => void;
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const TextInputs = ({inputConfigs, currentStyle, handleUpdateStyle, handleChange, saveStyle, handleColorChange}:InputConfig) => {
    return(
        <>
        {inputConfigs.map((config) => (
            <LabeledInput
              key={config.name}
              label={config.label}
              name={config.name}
              type={config.type}
              value={config.value}
              onChange={handleChange}
              onBlur={saveStyle}
              onColorChange={handleColorChange}
            />
          ))}
          <FontStyleControls currentStyle={currentStyle} onUpdateStyle={handleUpdateStyle} />
        </>
    )
}

export default TextInputs;