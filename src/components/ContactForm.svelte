<script>
  import ChevronDown from "src/icons/ChevronDown.svelte";
  import { contact } from "src/lib/api/contact";

  export let topic = "";
  export let subject = "";

  let name;
  let email;
  let body;

  let message;
  let disable = undefined;
  let hideForm = false;

  const submitMessage = () => {
    disable = true;
    if (!body) {
      message = "Please write your message first";
      disable = undefined;
      return;
    }
    if (!name) {
      message = "We need to know your name!";
      disable = undefined;
      return;
    }
    if (!email) {
      message = "We need your email to be able to contact you back!";
      disable = undefined;
      return;
    }
    if (!subject) {
      message = "Please enter a subject for your message";
      disable = undefined;
      return;
    }
    if (!topic) {
      message = "Please choose one of the possible topics";
      disable = undefined;
      return;
    }
    message = "";
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(
        "6LcFm-UdAAAAAA2HsCcTFj7dA_okrJlKKoYR0rKf",
        {
          action: "submit",
        }
      );
      const resp = await contact(subject, body, name, topic, email, token);
      if (resp.status === 200) {
        hideForm = true;
      } else {
        message =
          "There was an issue sending your message, please try again later";
        disable = undefined;
      }
    });
  };
</script>

{#if !hideForm}
  {#if message}
    <div class="message">{message}</div>
  {/if}
  <div class="contact-form">
    <input type="text" placeholder="Name" bind:value={name} />
    <input type="text" placeholder="Email" bind:value={email} />
    <input type="text" placeholder="Subject" bind:value={subject} />
    <div class="select-wrapper">
      <select bind:value={topic}>
        <option disabled value=""> Select Topic </option>
        <option value="devel"> Development </option>
        <option value="audit"> Security Audits </option>
        <option value="locker"> Locker Service </option>
        <option value="lbp"> Liquidity Bootstrapping </option>
        <option value="token"> Kenshi Token </option>
        <option value="other"> Other </option>
      </select>
      <div class="chevron"><ChevronDown /></div>
    </div>
    <textarea placeholder="Your message" rows="5" bind:value={body} />
    <button on:click={submitMessage} disabled={disable}>Send</button>
  </div>
  <p>
    This site is protected by reCAPTCHA and the Google
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
  </p>
{:else}
  We've received your message and will contact you as soon as possible!
{/if}

<style>
  a {
    color: var(--primary-color);
  }
  p {
    padding: 0.5em;
  }
  .contact-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
  input,
  select,
  textarea {
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 40px 4px rgb(0 0 0 / 10%);
    border-radius: 1.5em;
    padding: 1em 2em;
    align-items: center;
    background: linear-gradient(
      166deg,
      rgba(105, 118, 121, 0.2) 44%,
      rgba(33, 43, 46, 0.2) 100%
    );
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(32px);
    color: #000;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 1em;
  }
  textarea {
    grid-column: 1 / 3;
  }
  select {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    cursor: pointer;
  }
  .select-wrapper {
    position: relative;
  }
  .select-wrapper .chevron {
    position: absolute;
    right: 1em;
    top: calc(50% - 0.5em);
    height: 1em;
    width: 1em;
    pointer-events: none;
  }
  button {
    font-size: 1.25em;
    padding: 0.75em 1.5em;
    background: #000;
    color: #fff;
    border-radius: 3em;
    font-family: "Roboto";
    display: inline-flex;
    align-items: center;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
    border: none;
    outline: none;
    max-width: 160px;
    justify-content: center;
    cursor: pointer;
  }
  button:hover {
    background: var(--primary-color);
  }
  .message {
    color: var(--primary-color);
    padding: 0em 1em 2em;
  }
  @media (max-width: 760px) {
    .contact-form {
      grid-template-columns: 1fr;
    }
    textarea {
      grid-column: 1;
    }
  }
</style>
