import LabeledInput from "../TextInputs/Input";


interface InputConfig {
    inputConfigs: {
        label: string;
        name: string;
        type: string;
        value: string;
    }[];
    handleUpdateStyle: (style: React.CSSProperties) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveStyle: () => void;
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInputs = ({inputConfigs, handleChange, saveStyle, handleColorChange}:InputConfig) => {
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
        </>
    )
}

export default ImageInputs;