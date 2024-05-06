<script>
  import { Canvas } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import { T } from "@threlte/core";

  import Model from "../model/HSM.svelte";

  let innerWidth = 0;
  let cameraZoom = 1;

  $: if (innerWidth < 640) {
    cameraZoom = 0.5;
  } else {
    cameraZoom = 1;
  }
</script>

<svelte:window bind:innerWidth />

<Canvas>
  <T.PerspectiveCamera
    makeDefault
    fov={20}
    position={[0, -4, 48 / cameraZoom]}
    near={0.1}
    far={100}
    on:create={({ ref }) => {
      ref.lookAt(0, 0, 0);
    }}
  >
    <OrbitControls />
  </T.PerspectiveCamera>

  <T.DirectionalLight
    intensity={20}
    color={"white"}
    shadow
    position={[0, 10, 10]}
  />
  <T.DirectionalLight intensity={10} shadow position={[0, -10, -10]} />
  <Model />
</Canvas>
