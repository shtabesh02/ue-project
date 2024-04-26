import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaCircleXmark } from "react-icons/fa6";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ExtraInfoForm from "./ExtraInfoForm";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setErrors({
				confirmPassword:
					"Confirm Password field must be the same as the Password field",
			});
		}

		const serverResponse = await dispatch(
			thunkSignup({
				email,
				username,
				password,
			}),
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			closeModal();
		}
	};

	return (
		<>
			<h1 className="LoginModal__header">Sign Up</h1>
			<form onSubmit={handleSubmit} className="LoginModal">
				{errors.server && (
					<p>
						<FaCircleXmark />
						{errors.server}
					</p>
				)}
				<label>Email</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				{errors.email && (
					<p>
						<FaCircleXmark />
						{errors.email}
					</p>
				)}
				<label>Phone</label>
				<input
					type="text"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
				/>
				{errors.phone && (
					<p>
						<FaCircleXmark />
						{errors.phone}
					</p>
				)}
				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				{errors.username && (
					<p>
						<FaCircleXmark />
						{errors.username}
					</p>
				)}
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{errors.password && (
					<p>
						<FaCircleXmark />
						{errors.password}
					</p>
				)}
				<label>Confirm Password</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				{errors.confirmPassword && (
					<p>
						<FaCircleXmark />
						{errors.confirmPassword}
					</p>
				)}
				<OpenModalButton
					buttonText="Next >"
					modalComponent={<ExtraInfoForm />}
				/>
				{/* <button type="submit">Sign Up</button> */}
			</form>
		</>
	);
}

export default SignupFormModal;
