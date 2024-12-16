import { useCallback, useEffect, useState } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import '../styles/spaceAnimations.css';

export default function SpaceBackground() {
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    const newAsteroids = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 15,
      duration: Math.random() * 30 + 20,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotation: Math.random() * 360,
    }));
    setAsteroids(newAsteroids);
  }, []);

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <div id="space-container" className="fixed inset-0 w-full h-full opacity-60">
      <div className="absolute inset-0 bg-space">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 1500
                }
              },
              color: {
                value: ["#ffffff", "#f1f1f1", "#ececec"]
              },
              opacity: {
                value: 0.6,
                random: true,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.1,
                  sync: false
                }
              },
              size: {
                value: 1.5,
                random: true,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                  sync: false
                }
              },
              move: {
                enable: true,
                speed: 0.1,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "out"
                }
              }
            },
            detectRetina: true
          }}
        />

        <div className="celestial-container">
          <div className="sun-glow" />
          <div className="solar-system">
            <div className="orbit mercury-orbit">
              <div className="planet mercury" />
            </div>
            <div className="orbit venus-orbit">
              <div className="planet venus" />
            </div>
            <div className="orbit earth-orbit">
              <div className="planet earth">
                <div className="moon" />
              </div>
            </div>
            <div className="orbit mars-orbit">
              <div className="planet mars" />
            </div>
          </div>
          <div className="spaceship" style={{ 
            animationDelay: "0s",
            transform: "scale(0.8)"
          }} />
          <div className="spaceship" style={{ 
            animationDelay: "12s",
            transform: "scale(1.2) rotate(15deg)"
          }} />
          <div className="rocket" style={{ 
            animationDelay: "5s",
            transform: "scale(1.1)"
          }} />
          <div className="rocket" style={{ 
            animationDelay: "18s",
            transform: "scale(0.9) rotate(-10deg)"
          }} />
        </div>

        {asteroids.map(asteroid => (
          <div
            key={asteroid.id}
            className="asteroid"
            style={{
              width: `${asteroid.size}px`,
              height: `${asteroid.size}px`,
              animationDelay: `${asteroid.delay}s`,
              '--duration': `${asteroid.duration}s`,
              '--rotation': `${asteroid.rotation}deg`,
              top: asteroid.top,
              left: asteroid.left,
            }}
          />
        ))}

        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
      </div>
    </div>
  );
} 