import { ComponentType, FC } from 'react';
import { useAppSelector } from '../utils';
import { userSelectors } from '../slices/user';
import { Navigate, useLocation } from 'react-router-dom';

export const WithProtection = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<P> = (props) => {
		const accessToken = useAppSelector(userSelectors.getAccessToken);
		const location = useLocation();

		const authPaths = ['/signin', '/signup'];
		if (!accessToken && !authPaths.includes(location.pathname)) {
			return (
				<Navigate
					to='/signin'
					state={{
						from: location.pathname,
					}}
				/>
			);
		}

		return <WrappedComponent {...props} />;
	};

	ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
