import { useState, useEffect } from "react";

import * as ScreenOrientation from "expo-screen-orientation";

export const useScreenOrientation = () => {
  const [currentOrientation, setCurrentOrientation] = useState<number>(0);

  useEffect(() => {
    getCurrentOrientation();

    return () => {
      unlockOrientation();
    }
  }, []);

  const lockToLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const lockToLandscapeLeft = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
    await getCurrentOrientation();
  };

  const lockToLandscapeRight = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  };

  const lockToPortrait = async () => {
    
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
    await getCurrentOrientation();
    
  };

  const lockToPortraitDown = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_DOWN
    );
  };

  const lockToPortraitUp = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  const getCurrentOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationLockAsync();
    setCurrentOrientation(orientation);
  };

  const toggleScreenOrientation = async () => {
    if (currentOrientation === ScreenOrientation.OrientationLock.PORTRAIT_UP) {
      await lockToLandscapeLeft();

      setCurrentOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    } else {
      await lockToPortraitUp();
      setCurrentOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  };

  const unlockOrientation = async () => {
    await ScreenOrientation.unlockAsync();
  };


  return {
    currentOrientation,

    getCurrentOrientation,
    lockToLandscape,
    lockToLandscapeLeft,
    lockToLandscapeRight,
    lockToPortrait,
    lockToPortraitDown,
    lockToPortraitUp,
    toggleScreenOrientation,
    unlockOrientation,
  };
};

