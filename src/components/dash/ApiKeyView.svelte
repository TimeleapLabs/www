<script>
  import { signedKeys } from "src/stores/signed-keys";
  import { aesGcmDecrypt } from "src/lib/crypto";
  import { Button } from "carbon-components-svelte";
  import { View, ViewOff, Copy } from "carbon-icons-svelte";
  import { onMount } from "svelte";
  import copy from "clipboard-copy";
  import { toast } from "@zerodevx/svelte-toast";

  export let sharedKey;
  export let encryptedKey;

  let hidden = true;
  let apikey = "";

  const decrypt = async (sharedKey, encryptedKey) => {
    const signed = $signedKeys[sharedKey];
    return await aesGcmDecrypt(encryptedKey, signed);
  };

  const copyApiKey = () => {
    copy(apikey);
    toast.push("Copied to the clipboard");
  };

  const toggle = () => (hidden = !hidden);

  onMount(async () => {
    apikey = await decrypt(sharedKey, encryptedKey);
  });
</script>

<div class="key">
  <span>
    {#if hidden}
      {"●".repeat(apikey.length)}
    {:else}
      {apikey}
    {/if}
  </span>
  <Button
    icon={hidden ? View : ViewOff}
    kind="ghost"
    iconDescription={hidden ? "Show" : "Hide"}
    on:click={toggle}
  />
  <Button
    icon={Copy}
    kind="ghost"
    iconDescription={"Copy"}
    on:click={copyApiKey}
  />
</div>

<style>
  .key {
    display: flex;
    align-items: center;
  }
  .key span {
    font-family: "IBM Plex Mono", monospace;
  }
</style>
