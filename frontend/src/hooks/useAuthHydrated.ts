'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';

export default function useAuthHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(useAuthStore.persist.hasHydrated());
    return useAuthStore.persist.onFinishHydration(() => setHasHydrated(true));
  }, []);

  return hasHydrated;
}
