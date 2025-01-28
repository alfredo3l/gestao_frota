'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from './Header';

const ClientHeader = (props: React.ComponentProps<typeof Header>) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <Header {...props} isMobile={isMobile} />;
};

export default dynamic(() => Promise.resolve(ClientHeader), {
  ssr: false
}); 