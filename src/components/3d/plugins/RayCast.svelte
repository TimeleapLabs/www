<script>
  import { injectPlugin } from "@threlte/core";
  import {
    computeBoundsTree,
    disposeBoundsTree,
    acceleratedRaycast,
  } from "three-mesh-bvh";

  const isBufferGeometry = (ref) => {
    return ref.isBufferGeometry;
  };

  const isMesh = (ref) => {
    return ref.isMesh;
  };

  injectPlugin("bvh-raycast", () => {
    return {
      onRefChange(ref) {
        if (isBufferGeometry(ref)) {
          ref.computeBoundsTree = computeBoundsTree;
          ref.disposeBoundsTree = disposeBoundsTree;
          ref.computeBoundsTree();
        }
        if (isMesh(ref)) {
          ref.raycast = acceleratedRaycast;
        }
        return () => {
          if (isBufferGeometry(ref)) {
            ref.disposeBoundsTree();
          }
        };
      },
    };
  });
</script>

<slot />
