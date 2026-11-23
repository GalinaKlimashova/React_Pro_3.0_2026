import { Link, To } from 'react-router-dom';
import LogoSvg from '../assets/logo.svg?url';

export interface LogoProps {
	to?: To;
	alt?: string;
	className?: string;
}

export const Logo = ({ to = '/', alt = 'Logo', className }: LogoProps) => {
	return (
		<Link to={to}>
			<img src={LogoSvg} alt={alt} className={className} />
		</Link>
	);
};
