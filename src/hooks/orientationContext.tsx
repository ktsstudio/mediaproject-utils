import * as React from 'react';

import { useOrientationChange } from './index';

const OrientationContext = React.createContext({
  isLandscape: false,
});

interface Props {
  isMobile: boolean;
  children: React.ReactNode;
}

/**
 * Передает контекст с полем isLandscape, указывающим на текущую ориентацию экрана.
 * @param {boolean} isMobile
 * @param {React.ReactNode} children
 */
export const OrientationProvider: React.FC<Props> = ({
  isMobile,
  children,
}: Props) => {
  const isLandscape = useOrientationChange(isMobile);

  return (
    <OrientationContext.Provider value={{ isLandscape }}>
      {children}
    </OrientationContext.Provider>
  );
};

/**
 * Берет из контекста, передаваемого OrientationProvider, поле isLandscape,
 * указывающее на текущую ориентацию экрана.
 */
export const useOrientationContext = (): boolean =>
  React.useContext(OrientationContext).isLandscape;
