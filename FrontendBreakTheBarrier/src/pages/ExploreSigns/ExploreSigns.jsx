import React from 'react'
import './ExploreSigns.scss'
import i1 from '../../assets/images/1.jpeg';
import i2 from '../../assets/images/2.jpeg';
import i3 from '../../assets/images/3.jpeg';
import i4 from '../../assets/images/4.jpeg';
import i5 from '../../assets/images/5.jpeg';
import i6 from '../../assets/images/6.jpeg';
import i7 from '../../assets/images/7.jpeg';
import i8 from '../../assets/images/8.jpeg';
import i9 from '../../assets/images/9.mp4';
import i10 from '../../assets/images/10.mp4';


const ExploreSigns = () => {
	return (
		<div className='explore_signs_container'>
			<div className='img'>
				<img src={i1} alt="" />
			</div>
			<div className='img'>
				<img src={i2} alt="" />
			</div>
			<div className='img'>
				<img src={i3} alt="" />
			</div>
			<div className='img'>
				<img src={i4} alt="" />
			</div>
			<div className='img'>
				<img src={i5} alt="" />
			</div>
			<div className='img'>
				<img src={i6} alt="" />
			</div>
			<div className='video'>
				<video src={i9} muted loop autoPlay type="video/mp4" alt="" />
			</div>
			<div className='video'>
				<video src={i10} muted loop autoPlay type="video/mp4" alt="" />
			</div>
			<div className='img'>
				<img src={i7} alt="" />
			</div>
			<div className='img'>
				<img src={i8} alt="" />
			</div>
		</div>
	)
}

export default ExploreSigns