"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Life" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/work", label: "Work" },
  { href: "/cv", label: "CV" },
] as const;

type Scene = {
  key: "home" | "life" | "thoughts" | "work" | "cv";
  image: string;
  position: string;
};

const scenes: Record<Scene["key"], Scene> = {
  home: {
    key: "home",
    image: "https://images.unsplash.com/photo-1470115266183-2a0f4cf63cbc?auto=format&fit=crop&w=3000&q=88",
    position: "center 50%",
  },
  life: {
    key: "life",
    image: "https://images.unsplash.com/photo-1783780163466-52762d104c8a?auto=format&fit=crop&w=3000&q=88",
    position: "center 52%",
  },
  thoughts: {
    key: "thoughts",
    image: "https://images.unsplash.com/photo-1781813745733-36af0d892101?auto=format&fit=crop&w=3000&q=88",
    position: "center 45%",
  },
  work: {
    key: "work",
    image: "https://images.unsplash.com/photo-1783588608994-1e2efa299061?auto=format&fit=crop&w=3000&q=88",
    position: "center 48%",
  },
  cv: {
    key: "cv",
    image: "https://images.unsplash.com/photo-1762564048520-6638d810e548?auto=format&fit=crop&w=3000&q=88",
    position: "center 44%",
  },
};

function sceneForPath(pathname: string): Scene {
  if (pathname.startsWith("/life")) return scenes.life;
  if (pathname.startsWith("/thoughts")) return scenes.thoughts;
  if (pathname.startsWith("/work")) return scenes.work;
  if (pathname.startsWith("/cv")) return scenes.cv;
  return scenes.home;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const routeTimerRef = useRef<number | null>(null);
  const sceneTimerRef = useRef<number | null>(null);
  const phaseTimerRef = useRef<number | null>(null);
  const sceneRef = useRef<Scene>(sceneForPath(pathname));
  const previousPathRef = useRef(pathname);

  const [currentScene, setCurrentScene] = useState<Scene>(() => sceneForPath(pathname));
  const [previousScene, setPreviousScene] = useState<Scene | null>(null);
  const [phase, setPhase] = useState<"idle" | "leaving" | "entering">("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const measureIndicator = () => {
    const nav = navRef.current;
    const activeItem = navigation.find((item) => isActivePath(pathname, item.href));
    const link = activeItem ? linkRefs.current[activeItem.href] : null;
    if (!nav || !link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - navRect.left + nav.scrollLeft,
      width: linkRect.width,
      visible: true,
    });
  };

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(measureIndicator);
    window.addEventListener("resize", measureIndicator);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureIndicator);
    };
  }, [pathname]);

  useEffect(() => {
    const nextScene = sceneForPath(pathname);
    if (nextScene.key !== sceneRef.current.key) {
      setPreviousScene(sceneRef.current);
      sceneRef.current = nextScene;
      setCurrentScene(nextScene);

      if (sceneTimerRef.current) window.clearTimeout(sceneTimerRef.current);
      sceneTimerRef.current = window.setTimeout(() => setPreviousScene(null), reducedMotion ? 0 : 1200);
    }

    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname;
      if (!reducedMotion) {
        setPhase("entering");
        if (phaseTimerRef.current) window.clearTimeout(phaseTimerRef.current);
        phaseTimerRef.current = window.setTimeout(() => setPhase("idle"), 760);
      } else {
        setPhase("idle");
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, reducedMotion]);

  useEffect(() => {
    return () => {
      if (routeTimerRef.current) window.clearTimeout(routeTimerRef.current);
      if (sceneTimerRef.current) window.clearTimeout(sceneTimerRef.current);
      if (phaseTimerRef.current) window.clearTimeout(phaseTimerRef.current);
    };
  }, []);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (isActivePath(pathname, href)) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    if (routeTimerRef.current) window.clearTimeout(routeTimerRef.current);

    if (reducedMotion) {
      router.push(href);
      return;
    }

    setPhase("leaving");
    routeTimerRef.current = window.setTimeout(() => router.push(href), 210);
  };

  return (
    <div className={`site-frame scene-${currentScene.key} transition-${phase}`}>
      <div className="scene-stack" aria-hidden="true">
        {previousScene ? (
          <div
            className="scene-background scene-background-previous"
            style={{
              backgroundImage: `url(${previousScene.image})`,
              backgroundPosition: previousScene.position,
            }}
          />
        ) : null}
        <div
          key={currentScene.key}
          className="scene-background scene-background-current"
          style={{
            backgroundImage: `url(${currentScene.image})`,
            backgroundPosition: currentScene.position,
          }}
        />
        <div className="scene-atmosphere" />
        <div className="scene-grain" />
      </div>

      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation" ref={navRef}>
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              width: indicator.width,
              transform: `translate3d(${indicator.left}px, 0, 0)`,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                ref={(node) => {
                  linkRefs.current[item.href] = node;
                }}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={(event) => navigate(event, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>

      <main className="site-main">
        <div className="route-veil" aria-hidden="true" />
        {children}
      </main>
    </div>
  );
}
