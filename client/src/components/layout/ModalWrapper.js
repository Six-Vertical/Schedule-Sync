import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react';

const ModalWrapper = forwardRef(({children}, ref) => {
	const [isShown, setIsShown] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			openModal: () => open(),
			close: () => close()
		};
	});

	const open = () => {
		setIsShown(true);
	};

	const close = () => {
		setIsShown(false);
	};

	useEffect(() => {
		const handleEsc = (e) => {
			if (e.keyCode === 27) {
				close();
			}
		};
		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, []);

	const dynammicModalClass = () => (isShown ? {display: 'block'} : '');

	return isShown ? (
		<div className='modal' style={dynammicModalClass()} id='channelModal'>
			<div className='modal-dialog modal-dialog-centered' role='document'>
				<div className='modal-content'>{children}</div>
			</div>
		</div>
	) : null;
});

export default ModalWrapper;
