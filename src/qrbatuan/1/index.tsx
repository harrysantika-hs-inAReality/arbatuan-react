import React from 'react';
import { Scene as AScene } from 'aframe';
import { Camera, GLTFModel, Plane, Assets, Item } from 'aframe-react-component';
import ImageTracking from '../../provider/ImageTracking';
import { Entity, Marker, Scene } from '../../components';
import useARManager from '../../utils/useARManager';

const ExampleImageTracking = () => {
  const [enabled, setEnabled] = React.useState(false);
  const sceneRef = React.useRef<AScene>();

  const { startAR, stopAR } = useARManager(sceneRef);

  const onClick = () => {
    if (enabled) {
      stopAR();
    } else {
      startAR();
    }

    setEnabled((curr) => !curr);
  };

  const rotationSettings = {
    enabled: true,
    rotationFactor: 5,
  };

  const scaleSettings = {
    enabled: true,
    minScale: 0.3,
    maxScale: 8,
  };

  return (
    <ImageTracking>
      <button onClick={onClick} style={{ position: 'absolute', zIndex: 999 }}>
        {enabled ? 'Stop' : 'Start'}
      </button>
      <Scene
        mindARImage={{
          imageTargetSrc:
            'https://cdn.jsdelivr.net/gh/harrysantika-hs-inAReality/batuanpuraar@main/Marker/Pura1.mind',
          autoStart: false,
        }}
        color-space="sRGB"
        mouse-detector
        gesture-detector
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        orientationUI
        stats={enabled}
        ref={sceneRef}
      >
        <Assets>
          <Item
            id="avatarModel"
            src="https://cdn.jsdelivr.net/gh/harrysantika-hs-inAReality/batuanpuraar@main/3dgtlf/pura1.gltf"
          />
        </Assets>
        <Camera position={{ x: 0, y: 0, z: 0 }} look-controls={false} />
        <Entity visible={enabled}>
          <Marker targetIndex={0}>
            <Entity
              mouse-rotation={rotationSettings}
              mouse-scale={scaleSettings}
              gesture-rotation={rotationSettings}
              gesture-scale={scaleSettings}
            >
              <Plane
                src="#card"
                position={[0, 0, 0]}
                height={0.552}
                width={1}
                rotation={[0, 0, 0]}
              />
              <GLTFModel
                rotation={[0, 0, 0]}
                position={[0, 0, 0.1]}
                scale={[0.005, 0.005, 0.005]}
                animation={{
                  property: 'position',
                  to: '0 0.1 0.1',
                  dur: 1000,
                  easing: 'easeInOutQuad',
                  loop: true,
                  dir: 'alternate',
                }}
                src="#avatarModel"
              />
            </Entity>
          </Marker>
        </Entity>
      </Scene>
    </ImageTracking>
  );
};

export default ExampleImageTracking;
