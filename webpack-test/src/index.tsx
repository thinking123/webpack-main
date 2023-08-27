import React from 'react'
import ReactDom from 'react-dom'

// import Svg from './svg/icon.svg'
import style from './index.module.less'




const App = () => {

	return (
		<div className={style.url}>
			{/* <Svg/> */}
		</div>
	)
}


ReactDom.render(<App/> , document.getElementById('root'))
