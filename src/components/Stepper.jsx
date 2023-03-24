import React from 'react';

const Stepper = ({ days }) => {
	return (
		<div className='flex flex-col gap-2 w-full'>
			{days.map(({ place, attractions, description, photos }, index) => {
				return (
					<div className='flex gap-4 mb-4 max-w-full'>
						<div className='flex flex-col gap-5'>
							<div className=' relative bg-primary aspect-square w-10 h-10 flex items-center justify-center text-white rounded-full'>
								{index + 1}
								<span className='hidden md:block absolute left-[-90%] rotate-[-90deg] font-semibold text-black'>
									Day
								</span>
							</div>
							<div className='w-10 flex-1'>
								<div className='w-[2px] h-full bg-primaryDark/50 mx-auto' />
							</div>
						</div>
						{/* content */}
						<div className='flex flex-col gap-4 mb-4 w-full'>
							<div className='h-10 flex items-center text-lg font-semibold'>
								{place}
							</div>
							<div className='flex gap-2  flex-wrap'>
								{attractions.map(att => (
									<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
										{att}
									</span>
								))}
							</div>
							<div className='text-lg mr-6'>{description}</div>
							<div className='flex gap-1 sm:gap-2  md:gap-4 mr-6 flex-wrap'>
								{photos.map(photo => {
									return (
										<div
											className='w-[40%] sm:w-28 md:w-36 lg:w-48 aspect-[3/1.75] rounded-md border-2 border-slate-300'
											style={{
												backgroundImage: `url('${photo}')`,
												backgroundSize: 'cover',
											}}
										/>
									);
								})}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Stepper;
