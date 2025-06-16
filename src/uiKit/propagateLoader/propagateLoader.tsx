import React from 'react';

interface props {
    color?: string;
    size?: string;
}

export const PropagateLoader = ({ color = '#8e51ff', size = '1rem' }: props) => {
    return (
        <>
            <style>
                {`
                    @keyframes propagateLeft {
                        0% {
                            transform:translateX(0)
                        }
                        25% {
                            transform:translateX(-20px)
                        }
                        50% {
                            transform:translateX(-20px)
                        }
                        75% {
                            transform:translateX(-20px)
                        }
                        100% {
                            transform:translateX(0)
                        }
                    }

                    @keyframes propagateLeftFirst {
                        0% {
                            transform:translateX(0)
                        }
                        25% {
                            transform:translateX(-20px)
                        }
                        50% {
                            transform:translateX(-50px)
                        }
                        75% {
                            transform:translateX(-50px)
                            
                        }
                        100% {
                            transform:translateX(0)
                            
                        }
                    }

                    @keyframes propagateLeftSecond {
                        0% {
                            transform:translateX(0)
                        }
                        25% {
                            transform:translateX(-20px)
                        }
                        50% {
                            transform:translateX(-50px)
                        }
                        75% {
                            transform:translateX(-80px)
                            
                        }
                        100% {
                            transform:translateX(0)
                        }
                    }

                    @keyframes propagateRight {
                        0% {
                            transform:translateX(0)
                        }
                        25% {
                            transform:translateX(20px)
                        }
                        50% {
                            transform:translateX(20px)
                        }
                        75% {
                            transform:translateX(20px)
                        }
                        100% {
                            transform:translateX(0)
                        }
                    }

                    @keyframes propagateRightFirst {
                        0% {
                            transform:translateX(0)
                        }
                        25% {
                            transform:translateX(20px)
                        }
                        50% {
                            transform:translateX(50px)
                        }
                        75% {
                            transform:translateX(50px)
                            
                        }
                        100% {
                            transform:translateX(0)
                            
                        }
                    }

                    @keyframes propagateRightSecond {
                        0% {
                            transform:translateX(0)
                        }
                        25% {
                            transform:translateX(20px)
                        }
                        50% {
                            transform:translateX(50px)
                        }
                        75% {
                            transform:translateX(80px)
                            
                        }
                        100% {
                            transform:translateX(0)
                        }
                    }
                `}
            </style>
            <div className={`items-center justify-center flex flex-row gap-2 w-full relative`} style={{height:size}}>
                <div className=' rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ' style={{ backgroundColor: color, width: size, height: size, animation: 'propagateLeft 2s ease-in-out infinite' }}></div>
                <div className=' rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ' style={{ backgroundColor: color, width: size, height: size, animation: 'propagateLeftFirst 2s ease-in-out infinite' }}></div>
                <div className=' rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ' style={{ backgroundColor: color, width: size, height: size, animation: 'propagateLeftSecond 2s ease-in-out infinite' }}></div>
                <div className=' rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ' style={{ backgroundColor: color, width: size, height: size, animation: 'propagateRight 2s ease-in-out infinite' }}></div>
                <div className=' rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ' style={{ backgroundColor: color, width: size, height: size, animation: 'propagateRightFirst 2s ease-in-out infinite' }}></div>
                <div className=' rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ' style={{ backgroundColor: color, width: size, height: size, animation: 'propagateRightSecond 2s ease-in-out infinite' }}></div>
            </div>
        </>
    )
}