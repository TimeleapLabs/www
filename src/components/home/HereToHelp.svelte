<script>
  import { Grid, Row, Column, OutboundLink } from "carbon-components-svelte";
  import ExpressiveHeading from "../carbon/ExpressiveHeading.svelte";
  import ContactForm from "../ContactForm.svelte";
  export let subject = "";
</script>

<Grid id="contact">
  <Row>
    <Column lg={4}>
      <div class="flex-column">
        <ExpressiveHeading size={2}>
          <h2>We're here to help.</h2>
        </ExpressiveHeading>
        <p class="body-02">
          If you have any questions about Kenshi, our suite of products, or how
          we can assist you in your journey towards building custom solutions on
          the blockchain, please reach out to us.
        </p>
        <p class="body-01">
          Our dedicated team is ready to provide you with the information and
          support you need. Whether you're a seasoned developer, a business
          looking to leverage the power of blockchain, or simply curious about
          our platform, your inquiries are always welcome.
        </p>
        <p class="body-01">
          You can contact us directly through this form or reach us at our
          email: <OutboundLink href="mailto:inquiries@kenshi.io">
            inquiries@kenshi.io
          </OutboundLink>.
        </p>
        <p class="body-01">
          We strive to respond to all inquiries as quickly as possible. Your
          journey into the world of Web 3.0 starts here. Get in touch with us
          today.
        </p>
      </div>
    </Column>
    <Column />
    <Column lg={10}>
      <ContactForm {subject} />
    </Column>
  </Row>
</Grid>
