<script>
  import { toast } from "@zerodevx/svelte-toast";
  import { subscribe } from "src/lib/api/subscribe";

  import { FluidForm, TextInput, Button } from "carbon-components-svelte";
  import { Bullhorn } from "carbon-icons-svelte";

  let showSubscribe = true;
  let email;
  let disabled = undefined;

  export let buttonText = "Notify Me";
  export let topic;

  const handleSubscribe = () => {
    if (!email) {
      toast.push("Please enter your email address");
      return;
    }
    grecaptcha.ready(async () => {
      disabled = true;
      const token = await grecaptcha.execute(
        "6LcFm-UdAAAAAA2HsCcTFj7dA_okrJlKKoYR0rKf",
        { action: "submit" }
      );
      const resp = await subscribe(email, topic, token);
      if (resp.status === 200) {
        showSubscribe = false;
        toast.push("You have successfully subscribed!");
      } else {
        toast.push(
          "An error occurred while subscribing. Please try again later."
        );
        disabled = undefined;
      }
    });
  };
</script>

{#if showSubscribe}
  <p class="suppress">
    <slot />
  </p>
  <div class="subscribe suppress">
    <FluidForm>
      <TextInput
        id="email"
        type="email"
        labelText="Email Address"
        placeholder="Enter your email address"
        bind:value={email}
      />
    </FluidForm>
    <Button kind="primary" on:click={handleSubscribe} icon={Bullhorn}>
      {buttonText}
    </Button>
  </div>
{/if}

<style>
  .subscribe {
    display: flex;
    gap: 0;
    margin-top: 1em;
    width: 100%;
  }
  .subscribe :global(.bx--form--fluid) {
    flex: 1;
  }
</style>
