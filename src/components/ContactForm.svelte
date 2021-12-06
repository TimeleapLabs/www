<script>
  import ChevronDown from "src/icons/ChevronDown.svelte";
  import { contact } from "src/lib/api/contact";

  export let topic = "";
  export let subject = "";
</script>

<div class="contact-form">
  <input type="text" placeholder="Name" />
  <input type="text" placeholder="Email" />
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
  <textarea placeholder="Your message" rows="5" />
</div>

<style>
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
  @media (max-width: 760px) {
    .contact-form {
      grid-template-columns: 1fr;
    }
    textarea {
      grid-column: 1;
    }
  }
</style>
