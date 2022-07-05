import '../styles/globals.css'
import "pure-react-carousel/dist/react-carousel.es.css";
import { StoreProvider } from '../utils/store/Store';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import { useProgressStore } from '../utils/store/useProgressStore';
import { useEffect } from 'react';
import Progress from '../components/progress/Progress';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    }
    const handleStop = () => {
      setIsAnimating(false);
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router]);

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Progress isAnimating={isAnimating} />
        {Component.auth ? (
          <>
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          </>
        ) : (
          <>
            <Component {...pageProps} />
          </>
        )}
      </StoreProvider>
    </SessionProvider>
  )
}

function Auth({ children, adminOnly }) {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/unauthorized?message=Lütfen giriş yapınız."
    },
  })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (adminOnly && !session.user.isAdmin) {
    return window.location.href = "/unauthorized?message=Yetkiniz yok."
  }

  return children
}

export default MyApp;
