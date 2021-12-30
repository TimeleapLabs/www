<script>
  import Medium from "src/icons/Medium.svelte";
  import Telegram from "src/icons/Telegram.svelte";
  import Twitter from "src/icons/Twitter.svelte";
  import Github from "src/icons/Github.svelte";
  import Reddit from "src/icons/Reddit.svelte";
  import Formatted from "src/icons/Formatted.svelte";
  import Shield from "src/icons/Shield.svelte";
  import Vial from "src/icons/Vial.svelte";
  import Deploy from "src/icons/Deploy.svelte";
  import Comment from "src/icons/Comment.svelte";
  import Pdf from "src/icons/PDF.svelte";

  import ContactForm from "src/components/ContactForm.svelte";
</script>

<div class="page">
  <div class="head">
    <div class="navbar">
      <div class="links spaced">
        <a href="/">
          <div class="vertical-logo">
            <div class="logo">
              <img src="/images/kenshi.round.png" alt="Kenshi" />
            </div>
            <div class="logo textual">
              <img src="/images/kenshi.textual.svg" alt="Kenshi" />
            </div>
          </div>
        </a>
        <a href="/#services">Services</a>
        <a href="/#tokenomics">Tokenomics</a>
        <a href="https://docs.kenshi.io">Whitepaper</a>
      </div>
      <div class="spacer" />
      <div class="links">
        <a href="https://t.me/kenshi_token"> <Telegram /> </a>
        <a href="https://twitter.com/kenshi_token"> <Twitter /> </a>
        <a href="https://blog.kenshi.io"> <Medium /> </a>
        <a href="https://www.reddit.com/r/kenshi_token/"> <Reddit /> </a>
        <a href="https://github.com/kenshi-token"> <Github /> </a>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="kenshi-illustration" />
    <div class="title">
      <h2>Smart Contract Development</h2>
    </div>
    <div class="features">
      <div class="feature">
        <div class="title">
          <span class="icon"><Comment /></span>
          <h3>Fully Commented</h3>
        </div>
        <div class="content">
          We make sure all functions are commented, all complex processes are
          documented, and all variable names are sensible! We keep the code
          readable, maintainable and easily understandable.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Vial /></span>
          <h3>Automatic Tests</h3>
        </div>
        <div class="content">
          We write automated unit tests for the smart contracts we develop. We
          deliver your orders with 100% test coverage. Every function in your
          contract is tested to make sure everything works as expected.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Formatted /></span>
          <h3>Beautifully Written</h3>
        </div>
        <div class="content">
          We setup automated linting and formatting tools for your projects. We
          make sure everything in the contract follows the same convention and
          the same style of code, no inconsistencies are acceptable.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Shield /></span>
          <h3>Security</h3>
        </div>
        <div class="content">
          We follow the best practices. We setup automated vulnerability
          scanning for your project and make sure there are no compiler warnings
          and no security issues before delivering the project.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Deploy /></span>
          <h3>Deployment</h3>
        </div>
        <div class="content">
          We're with you until the day you deploy your contract to the network
          of your choice. If required, we can deploy the smart contract for you!
          We'll manage your token from zero to the moon.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Pdf /></span>
          <h3>Free Audits</h3>
        </div>
        <div class="content">
          Your audit is on us! We give you a high quality service and generate a
          high quality audit for your project. You can check a sample audit
          <a href="/audits" class="red">here</a>.
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="samurai-illustration" />
    <div class="sample">
      <img src="/images/code.svg" class="shadow" alt="Code" />
      <div class="content">
        <h3>Want to see a sample of our code?</h3>
        <p>
          You can check out our GitHub repository here for the Kenshi token.
          We're proud of writing clean, well documented, well tested code!
        </p>
        <div class="spacer" />
        <a
          href="https://github.com/kenshi-token/contracts"
          class="button"
          target="_blank"
        >
          <span class="icon"><Github /></span>
          View on GitHub
        </a>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="title">
      <h2>Interested in this service?</h2>
    </div>
    <div class="interested">
      Fill out the contact form below to get a quote for your project. We will
      contact you back as soon as possible!
    </div>
  </div>
  <div class="section contact">
    <div class="guardian-illustration" />
    <div class="title">
      <h2>Contact Us</h2>
    </div>
    <div class="contact-us">
      <ContactForm topic="devel" subject="Contract Development Quotation" />
    </div>
  </div>
  <div class="section footer">
    <div class="made-with">
      Made with ❤️ by awesome people
      <div class="contact">
        Contact us on
        <a href="https://t.me/kenshi_token">Telegram</a> or
        <a href="https://twitter.com/kenshi_token">Twitter</a>, we're friendly!
      </div>
    </div>
    <div class="spacer" />
    <div class="copyright">Copyright © 2021 - Kenshi</div>
  </div>
</div>

<div class="bar" />

<style>
  .sample {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4em;
  }
  .sample h3 {
    font-size: 2em;
    margin-top: 0;
  }
  .sample .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2em;
    box-sizing: border-box;
  }
  .sample .content p {
    font-size: 1.2em;
    font-weight: lighter;
    line-height: 1.5em;
  }
  .features {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .features .feature .title {
    font-size: 1.4em;
    display: flex;
    align-items: center;
  }
  .features .feature .icon {
    height: 2em;
    width: 2em;
  }
  .features .feature .content {
    font-size: 1.2em;
    font-weight: lighter;
    margin-top: 1.2em;
    line-height: 1.5em;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2em;
  }
  .vertical-logo {
    display: flex;
    align-items: center;
  }
  .vertical-logo img {
    height: 4em;
  }
  .vertical-logo .logo.textual {
    margin-left: 1em;
  }
  .vertical-logo .logo.textual img {
    height: 2em;
  }
  .spacer {
    flex: 1;
  }
  a {
    font-family: "Raleway";
    color: #000;
  }
  a :global(svg) {
    width: 1em;
  }
  a {
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
  }
  a:not(.button):not(.buy a):not(.red):hover {
    color: var(--primary-color);
  }
  .button {
    font-size: 1.25em;
    padding: 0.75em 1.5em;
    background: #000;
    color: #fff;
    border-radius: 3em;
    font-family: "Raleway";
    display: inline-flex;
    align-items: center;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
  }
  .button:hover {
    background: var(--primary-color);
  }
  .button .icon {
    margin-right: 0.5em;
    display: flex;
  }
  .kenshi-illustration {
    background: url(/images/kenshi.png);
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    height: 100vh;
    width: 600px;
    right: 5%;
    top: 5%;
    z-index: -1;
    filter: grayscale(1) contrast(1.25) opacity(0.05);
  }
  .interested {
    font-size: 1.2em;
    line-height: 1.2em;
    font-weight: lighter;
  }
  .page {
    padding: 1em 6em;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 4px);
    box-sizing: border-box;
  }
  .bar {
    height: 4px;
    width: 100%;
    background: url(/images/square.jpg);
    background-size: 20%;
    opacity: 0.4;
  }
  .section {
    padding: 3em;
  }
  .head + .section {
    padding-top: 2em;
  }
  .head {
    padding: 0em 3em;
  }
  .section h2 {
    font-size: 3em;
    margin-top: 0;
    margin-bottom: 1em;
  }
  .footer {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 2em;
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    flex-wrap: wrap;
  }
  .links {
    font-size: 1.2em;
    display: flex;
    gap: 0.5em;
    align-items: center;
    margin-bottom: 1em;
  }
  .links.spaced {
    gap: 2em;
  }
  .title {
    display: flex;
    align-items: baseline;
    gap: 1em;
  }
  .samurai-illustration {
    background: url(/images/samurai.png);
    background-size: cover;
    position: absolute;
    height: 1200px;
    width: 800px;
    left: -300px;
    bottom: -300px;
    z-index: -1;
    filter: grayscale(1) contrast(0);
    transform: rotate(33deg);
    opacity: 0.1;
  }
  .guardian-illustration {
    background: url(/images/guardian.png);
    background-size: cover;
    position: absolute;
    height: 400px;
    width: 400px;
    right: 0;
    bottom: 0px;
    z-index: -1;
  }
  .section.contact {
    position: relative;
    flex: 1;
  }
  .red {
    color: var(--primary-color);
  }
  .contact-us {
    width: 50%;
  }
  img.shadow {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
  }
  .sample img {
    max-width: 100%;
  }
  @media (max-width: 1800px) {
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
    .kenshi-illustration {
      right: -8em;
    }
  }
  @media (max-width: 1350px) {
  }
  @media (max-width: 1200px) {
    .features {
      grid-template-columns: 1fr 1fr;
    }
    .sample {
      grid-template-columns: 1fr;
    }
    .sample img {
      justify-self: center;
    }
    .sample .spacer {
      margin-bottom: 2em;
    }
  }
  @media (max-width: 960px) {
  }
  @media (max-width: 860px) {
    .navbar .links:first-of-type a:not(:first-of-type) {
      display: none;
    }
    .guardian-illustration {
      filter: grayscale(1) opacity(0.1);
    }
    .contact-us {
      width: 100%;
    }
    .features {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .navbar {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 1em;
    }
    .navbar .spacer {
      flex: 0;
    }
    .sample .content {
      padding: 0;
    }
    .head {
      padding: 0 1em;
    }
    .page {
      padding: 0;
    }
    .section {
      padding: 2em;
    }
    h2 {
      margin-bottom: 0.5em !important;
    }
  }
</style>
