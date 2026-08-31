import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [trialOpen, setTrialOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(null);
  const [featureDetailOpen, setFeatureDetailOpen] = useState(null);
  const [featureSlideshowOpen, setFeatureSlideshowOpen] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'trial-landing' | 'trial-demo'

  const openTrial = useCallback(() => setTrialOpen(true), []);
  const closeTrial = useCallback(() => setTrialOpen(false), []);
  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const openVideo = useCallback((video) => setVideoOpen(video), []);
  const closeVideo = useCallback(() => setVideoOpen(null), []);
  const openFeatureDetail = useCallback((key) => setFeatureDetailOpen(key), []);
  const closeFeatureDetail = useCallback(() => setFeatureDetailOpen(null), []);
  const openFeatureSlideshow = useCallback((key) => setFeatureSlideshowOpen(key), []);
  const closeFeatureSlideshow = useCallback(() => setFeatureSlideshowOpen(null), []);
  const goTrial = useCallback(() => {
    setTrialOpen(false);
    setView('trial-landing');
  }, []);
  const goTrialDemo = useCallback(() => {
    setTrialOpen(false);
    setView('trial-demo');
  }, []);
  const goHome = useCallback(() => setView('home'), []);

  const value = useMemo(
    () => ({
      trialOpen, openTrial, closeTrial,
      demoOpen, openDemo, closeDemo,
      contactOpen, openContact, closeContact,
      videoOpen, openVideo, closeVideo,
      featureDetailOpen, openFeatureDetail, closeFeatureDetail,
      featureSlideshowOpen, openFeatureSlideshow, closeFeatureSlideshow,
      view, goTrial, goTrialDemo, goHome,
    }),
    [trialOpen, openTrial, closeTrial, demoOpen, openDemo, closeDemo,
     contactOpen, openContact, closeContact,
     videoOpen, openVideo, closeVideo,
     featureDetailOpen, openFeatureDetail, closeFeatureDetail,
     featureSlideshowOpen, openFeatureSlideshow, closeFeatureSlideshow,
     view, goTrial, goTrialDemo, goHome]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}