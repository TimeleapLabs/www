<script lang="ts">
  import { enhance } from '$app/forms';
  import { Twitter, MessageCircle, Github, CheckCircle } from 'lucide-svelte';
  import MetaTags from '$lib/components/seo/MetaTags.svelte';

  export let data;
  export let form;

  let loading = false;

  const socials = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/TimeleapLabs' },
    { name: 'Discord', icon: MessageCircle, href: 'https://discord.gg/timeleap' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/TimeleapLabs' },
  ];

  const currentYear = new Date().getFullYear();

  $: waitlistCount = form?.success ? form.position : data.waitlistCount;
</script>

<MetaTags
  title="Timeleap - Compute Without Compromise"
  description="Instant VMs across multiple providers. Zero lock-in. Your compute, your rules. Launching soon."
  ogImageText="Timeleap\nCompute Without\nCompromise"
/>

<div class="min-h-screen bg-black relative flex flex-col">
  <!-- Dot grid background -->
  <div
    class="absolute inset-0 bg-dots"
  />

  <!-- Header -->
  <header class="relative z-10 border-b border-white/5">
    <div class="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
      <div class="font-mono text-sm text-white tracking-wider">
        ~/TIMELEAP
      </div>
      <div class="flex items-center gap-4">
        {#each socials as social}
          <a
            href={social.href}
            target="_blank"
            rel="noopener"
            class="text-zinc-400 hover:text-white transition-colors"
            title={social.name}
          >
            <svelte:component this={social.icon} class="w-5 h-5" />
          </a>
        {/each}
      </div>
    </div>
  </header>

  <!-- Main content -->
  <main class="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
    <div class="max-w-2xl w-full text-center">

      <!-- Launching soon badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-500/30 bg-emerald-500/5 mb-6">
        <span class="w-2 h-2 bg-emerald-400 rounded-full status-pulse" />
        <span class="font-mono text-xs text-emerald-400 uppercase tracking-wider">
          Launching Soon
        </span>
      </div>

      <!-- Headline -->
      <h1 class="font-mono text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight mb-6">
        COMPUTE WITHOUT
        <span class="block sm:inline"> COMPROMISE</span>
      </h1>

      <!-- Subtitle -->
      <p class="font-mono text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-2">
        Instant VMs &middot; Multiple providers &middot; Zero lock-in
      </p>
      <p class="font-mono text-base sm:text-lg text-zinc-200 max-w-xl mx-auto mb-8">
        Your compute, your rules.
      </p>

      <!-- Email signup -->
      <div class="max-w-md mx-auto mb-6">
        <!-- Success state -->
        {#if form?.success}
          <div class="border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div class="flex items-center justify-center gap-2 text-emerald-400 mb-2">
              <CheckCircle class="w-5 h-5" />
              <span class="font-mono text-sm uppercase tracking-wider">You're on the list</span>
            </div>
            <p class="font-mono text-xs text-zinc-400">
              Position #{form.position} - We'll notify you when we launch.
            </p>
          </div>
        {:else}
          <!-- Form -->
          <form
            method="POST"
            action="?/signup"
            use:enhance={() => {
              loading = true;
              return async ({ update }) => {
                await update();
                loading = false;
              };
            }}
            class="space-y-3"
          >
            <div class="flex flex-col sm:flex-row gap-3">
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={loading}
                value={form?.email ?? ''}
                class="flex-1 px-4 py-3 bg-black/30 border border-white/20 font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                class="px-6 py-3 bg-white text-black font-mono text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {#if loading}
                  ...
                {:else}
                  Request Access
                {/if}
              </button>
            </div>

            <!-- Error message -->
            {#if form?.error}
              <p class="font-mono text-xs text-red-400">
                {form.error}
              </p>
            {/if}
          </form>
        {/if}
      </div>

      <!-- Social proof (only show when count >= 10) -->
      {#if waitlistCount >= 10 && !form?.success}
        <p class="font-mono text-xs text-zinc-500">
          Join {waitlistCount.toLocaleString()} others on the waitlist
        </p>
      {/if}

    </div>
  </main>

  <!-- Footer -->
  <footer class="relative z-10 border-t border-white/5">
    <div class="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="font-mono text-xs text-zinc-500">
        &copy; {currentYear} Timeleap SA &middot; Switzerland
      </div>
      <a
        href="/tos"
        class="font-mono text-xs text-zinc-500 hover:text-white transition-colors"
      >
        Terms
      </a>
    </div>
  </footer>
</div>

<style>
  .bg-dots {
    background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .status-pulse {
    animation: status-pulse 2s ease-in-out infinite;
  }

  @keyframes status-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }
</style>
