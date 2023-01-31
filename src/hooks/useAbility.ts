import React, { useEffect, useState } from 'react';

export const useAbility = (cd: number, turn: boolean) => {
  const [cdCurrent, setCdCurrent] = useState(0);

  useEffect(() => {
    if (cdCurrent > 0 && turn) {
      setCdCurrent((prev) => (prev -= 1));
    }
  }, [turn]);

  const isAvailable = () => {
    return cdCurrent === 0;
  };

  const activate = () => {
    setCdCurrent(cd);
  };

  return {
    isAvailable,
    activate,
    cdCurrent,
  };
};
