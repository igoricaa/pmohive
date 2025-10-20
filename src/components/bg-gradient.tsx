'use client';

const BackgroundGradient = () => {
  return (
    <div className='w-screen h-screen fixed overflow-hidden top-0 left-0 -z-20 gradient__bg'>
      <svg xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur
              in='SourceGraphic'
              stdDeviation='10'
              result='blur'
            />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8'
              result='goo'
            />
            <feBlend in='SourceGraphic' in2='goo' />
          </filter>
        </defs>
      </svg>

      <div className='w-full h-full filter url(#goo) blur-2xl bg-container'>
        <div className='gradient__bg__g3'></div>/
      </div>
    </div>
  );
};

export default BackgroundGradient;
