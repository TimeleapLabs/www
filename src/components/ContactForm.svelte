<script>
  import { contact } from "src/lib/api/contact";
  import { toast } from "@zerodevx/svelte-toast";
  import { Grid, Row, Column } from "carbon-components-svelte";
  import {
    TextInput,
    TextArea,
    SelectItem,
    Select,
    OutboundLink,
    Button,
  } from "carbon-components-svelte";
  import { Send } from "carbon-icons-svelte";

  export let topic = "general";
  export let subject = "";

  let name;
  let email;
  let body;

  let message;
  let disabled = undefined;
  let hideForm = false;

  const submitMessage = () => {
    disabled = true;
    if (!body) {
      toast.push("Please write your message first");
      disabled = undefined;
      return;
    }
    if (!name) {
      toast.push("We need to know your name!");
      disabled = undefined;
      return;
    }
    if (!email) {
      toast.push("We need your email to be able to contact you back!");
      disabled = undefined;
      return;
    }
    if (!subject) {
      toast.push("Please enter a subject for your message");
      disabled = undefined;
      return;
    }
    if (!topic) {
      toast.push("Please choose one of the possible topics");
      disabled = undefined;
      return;
    }
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
        toast.push(
          "There was an issue sending your message, please try again later"
        );
        disabled = undefined;
      }
    });
  };
</script>

<Grid noGutter fullWidth padding>
  {#if hideForm}
    <Row>
      <Column>
        <p>
          We've received your message and will contact you as soon as possible!
        </p>
      </Column>
    </Row>
  {:else}
    <Row>
      <Column>
        <TextInput
          bind:value={name}
          labelText={"Your name"}
          placeholder="John Doe"
          required
        />
      </Column>
      <Column>
        <TextInput
          bind:value={email}
          labelText={"Your email"}
          placeholder="john@example.com"
          required
        />
      </Column>
      <Column>
        <Select bind:selected={topic} labelText={"Topic"} required>
          <SelectItem value={"general"} text={"General Inquiry"} />
          <SelectItem value={"support"} text={"Tech Support"} />
          <SelectItem value={"press"} text={"Media & Press"} />
          <SelectItem value={"legal"} text={"Legal"} />
        </Select>
      </Column>
    </Row>
    <Row>
      <Column>
        <TextInput
          bind:value={subject}
          labelText={"Subject"}
          placeholder={"Inquiry regarding..."}
          required
        />
      </Column>
    </Row>
    <Row>
      <Column>
        <TextArea
          bind:value={message}
          labelText={"Your inquiry"}
          placeholder={"Hi! I'm writing you for..."}
          required
        />
      </Column>
    </Row>
    <Row>
      <Column>
        <Button icon={Send} {disabled} on:click={submitMessage}>Send</Button>
      </Column>
    </Row>
    <Row>
      <Column>
        <p class="legal-01">
          This site is protected by reCAPTCHA and the Google
          <OutboundLink href="https://policies.google.com/privacy">
            Privacy Policy
          </OutboundLink> and
          <OutboundLink href="https://policies.google.com/terms">
            Terms of Service
          </OutboundLink> apply.
        </p>
      </Column>
    </Row>
  {/if}
</Grid>
