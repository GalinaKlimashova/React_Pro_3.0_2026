import classNames from 'classnames';
import s from './Loader.module.css';

export const Loader = () => {
	return (
		<div className={classNames(s['wrapper'])}>
			<div className={classNames(s['loader'])}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
