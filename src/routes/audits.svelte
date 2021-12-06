<script>
  import Medium from "src/icons/Medium.svelte";
  import Telegram from "src/icons/Telegram.svelte";
  import Twitter from "src/icons/Twitter.svelte";
  import Github from "src/icons/Github.svelte";
  import Reddit from "src/icons/Reddit.svelte";
  import Secret from "src/icons/Secret.svelte";
  import Magnify from "src/icons/Magnify.svelte";
  import Vial from "src/icons/Vial.svelte";
  import Quality from "src/icons/Quality.svelte";
  import HandShake from "src/icons/HandShake.svelte";
  import Pdf from "src/icons/PDF.svelte";
  import Identify from "src/icons/Identify.svelte";

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
      <h2>Kenshi Security Audits</h2>
    </div>
    <div class="features">
      <div class="feature">
        <div class="title">
          <span class="icon"><Secret /></span>
          <h3>Security Issues</h3>
        </div>
        <div class="content">
          We scan your contracts for security issues and report them back to
          you. Our security experts use automated tools to scan your code as
          well as manually review your contract to investigate more.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Magnify /></span>
          <h3>Manual Review</h3>
        </div>
        <div class="content">
          Our developers will read your source code line by line, reporting back
          their findings to you. Several developers read your code independently
          to make sure no issue stays unnoticed.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Vial /></span>
          <h3>Automatic Tests</h3>
        </div>
        <div class="content">
          We will use our test-suite on your smart contracts to see how it
          reacts to different situations. We will also write automated tests
          made specifically for your smart contracts if required.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Quality /></span>
          <h3>Quality Control</h3>
        </div>
        <div class="content">
          We check for inconsistencies, code-stinks, formatting errors and
          misspellings in your smart contract. If required, we will format and
          fix your smart contract for you.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><HandShake /></span>
          <h3>On Your Side</h3>
        </div>
        <div class="content">
          We will suggest a fix for any issues found in your smart contract. We
          will be on your side from the start until you deploy your smart
          contract on the network of your choice.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Identify /></span>
          <h3>Identification</h3>
        </div>
        <div class="content">
          If necessary, we will identify and verify your team members and assess
          their expertise and experiences without directly exposing any of your
          identities to the public.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Pdf /></span>
          <h3>PDF Reports</h3>
        </div>
        <div class="content">
          A PDF document with the results of your audit will be created for each
          of your projects. Check the below sample document to see how awesome
          they look!
        </div>
      </div>
    </div>
    <object
      width="100%"
      height="720px"
      type="application/pdf"
      data="/audits/kenshi.pdf?view=FitH"
      title="Kenshi Sample Audit"
    >
      <a href="/audits/kenshi.pdf" class="button">View PDF Report</a>
    </object>
  </div>
  <div class="section">
    <div class="samurai-illustration" />
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
      <ContactForm topic="audit" subject="Audit Quotation" />
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
  object {
    margin-top: 8em;
    border-radius: 4px;
    box-shadow: 0px 0px 40px 4px rgba(0, 0, 0, 0.4);
  }
  object a.button {
    margin-top: 2em;
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
  .contact-us {
    width: 50%;
  }
  @media (max-width: 1800px) {
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
  }
  @media (max-width: 1350px) {
    .kenshi-illustration {
      right: -8em;
    }
  }
  @media (max-width: 1080px) {
    .features {
      grid-template-columns: 1fr 1fr;
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
  }
  @media (max-width: 600px) {
    .features {
      grid-template-columns: 1fr;
    }
    .navbar {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 1em;
    }
    .navbar .spacer {
      flex: 0;
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
