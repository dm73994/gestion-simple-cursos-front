import './formStyles.css';

interface InputFormProps {
  type: "text" | "number" | "date";
  label: string;
  error?: string;
  props: any;
}

const InputForm = ({ type, label, error, props }: InputFormProps) => {
  return (
    <div className={`input-form ${error ? "has-error" : ""}`}>
      <label className="input-label" htmlFor={label}>
        {label}
      </label>

      <input id={label} type={type} className="input-control" {...props} />

      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default InputForm;
