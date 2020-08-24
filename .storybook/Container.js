import React from 'react';

function Container({ story }) {
	return (
		<React.StrictMode>
			<div
				style={{
					padding: '3em',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{story()}
			</div>
		</React.StrictMode>
	);
}

export default Container;
