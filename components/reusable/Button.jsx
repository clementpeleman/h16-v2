function Button({ title, isDisabled }) {
	return <button disabled={isDisabled}>{title}</button>;
}

export default Button;
