import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePrevious } from './use-previous';
import { Mixpanel } from '@/analytics/browser';

const usePageViewTracking = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const previousPath = usePrevious(currentPath);

  useEffect(() => {
    if (!previousPath) {
      Mixpanel.track('page_visited', {
        current_page: currentPath,
        previous_page: 'Direct',
        query: router.query
      });
    } else if (previousPath) {
      Mixpanel.track('page_visited', {
        current_page: currentPath,
        previous_page: previousPath,
        query: router.query
      });
    }
  }, [currentPath, previousPath]);
};

export default usePageViewTracking;
