import React from 'react';

interface Props {
    color?: string;
    size?: string;
}

export const PulseLoader = ({ color = '#8e51ff', size = '1rem' }: Props) => {
    return (
        <>
            <style>
                {`
          @keyframes pulseCycle {
            0%{
              transform: scale(0);
            }
            20% {
              transform: scale(1);
            }
            40% {
              transform: scale(0);
            }
              100% {
              transform: scale(0);
            }
          }
        `}
            </style>
            <div className="items-center justify-center flex flex-row gap-2 w-full h-fit">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{
                        backgroundColor: color,
                        width: size,
                        height: size,
                        animation: 'pulseCycle 1.5s infinite ease-in-out',
                        animationDelay: '0s',
                    }}
                />
                <div
                    className="w-4 h-4 rounded-full"
                    style={{
                        backgroundColor: color,
                        width: size,
                        height: size,
                        animation: 'pulseCycle 1.5s infinite ease-in-out',
                        animationDelay: '0.3s',
                        transform:'scale(0)'
                    }}
                />
                <div
                    className="w-4 h-4 rounded-full"
                    style={{
                        backgroundColor: color,
                        width: size,
                        height: size,
                        animation: 'pulseCycle 1.5s infinite ease-in-out',
                        animationDelay: '0.6s',
                        transform:'scale(0)'

                    }}
                />
            </div>
        </>
    );
};