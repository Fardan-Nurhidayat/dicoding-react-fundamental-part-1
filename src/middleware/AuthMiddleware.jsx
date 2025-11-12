import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { getUserProfile } from "@utils/api";

function AuthMiddleware({ children }) {
	const location = useLocation();
	const [status, setStatus] = useState("pending");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		let isActive = true;

		async function verifyAuthentication() {
			if (typeof window === "undefined") {
				return;
			}

			const token = localStorage.getItem("accessToken");

			if (!token) {
				setStatus("unauthenticated");
				return;
			}

			try {
				// Hit profile endpoint to ensure the stored token is still valid.
				await getUserProfile();

				if (isActive) {
					setStatus("authenticated");
				}
			} catch (error) {
				if (isActive) {
					const message = error instanceof Error ? error.message : "Unable to authenticate";
					setErrorMessage(message);
					setStatus("unauthenticated");
				}

				if (typeof window !== "undefined") {
					localStorage.removeItem("accessToken");
					localStorage.removeItem("userEmail");
				}
			}
		}

		verifyAuthentication();

		return () => {
			isActive = false;
		};
	}, []);

	if (status === "pending") {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center gap-3 text-sm text-gray-600 dark:text-gray-400" role="status">
					<span className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
					<span>Checking authentication&hellip;</span>
				</div>
			</div>
		);
	}

	if (status === "unauthenticated") {
		return (
			<Navigate
				replace
				to="/login"
				state={{ from: location, error: errorMessage }}
			/>
		);
	}

		if (status === "authenticated" && typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
			return (
				<Navigate
					replace
					to="/login"
					state={{ from: location }}
				/>
			);
		}

	return children ?? <Outlet />;
}

export default AuthMiddleware;
