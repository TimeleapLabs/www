<script>
  /** Set to `true` to toggle the expanded state */
  export let expanded = false;

  /** Specify the `href` attribute */
  export let href = "/";

  /**
   * Specify the text
   * @type {string}
   */
  export let text = undefined;

  /** Obtain a reference to the HTML anchor element */
  export let ref = null;

  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { ChevronDown } from "carbon-icons-svelte";
  import { Tile } from "carbon-components-svelte";

  const selectedItems = writable({});

  let menuRef = null;

  setContext("HeaderNavMenu", {
    selectedItems,
    updateSelectedItems(item) {
      selectedItems.update((_items) => ({
        ..._items,
        [item.id]: item.isSelected,
      }));
    },
    closeMenu() {
      expanded = false;
    },
  });

  $: isCurrentSubmenu =
    Object.values($selectedItems).filter(Boolean).length > 0;

  const onClick = (e) => {
    if (!menuRef.contains(e.target)) {
      e.preventDefault();
      expanded = !expanded;
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      expanded = !expanded;
    }
  };
</script>

<svelte:window
  on:click={({ target }) => {
    if (!ref.contains(target) && !menuRef.contains(target)) {
      expanded = false;
    }
  }}
/>

<li
  role="none"
  class:bx--header__submenu={true}
  class:bx--header__submenu--current={isCurrentSubmenu}
  class="full-width"
  on:click={onClick}
  on:keydown={onKeyDown}
>
  <a
    bind:this={ref}
    role="menuitem"
    tabindex="0"
    aria-haspopup="menu"
    aria-expanded={expanded}
    aria-label={text}
    {href}
    class:bx--header__menu-item={true}
    class:bx--header__menu-title={true}
    {...$$restProps}
    style="{$$restProps.style}; z-index: 1"
    on:keydown
    on:keydown={(e) => {
      if (e.key === " ") e.preventDefault();
      if (e.key === "Enter" || e.key === " ") {
        expanded = !expanded;
      }
    }}
    on:click|preventDefault
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:keyup
    on:focus
    on:blur
  >
    {text}
    <ChevronDown class="bx--header__menu-arrow" />
  </a>
  <div
    class="full-width-drop"
    bind:this={menuRef}
    role="menu"
    aria-label={text}
  >
    <Tile light>
      <slot />
    </Tile>
  </div>
  <div class="overlay" />
</li>

<style>
  .full-width-drop {
    display: none;
  }
  .full-width [aria-expanded="true"] + .full-width-drop {
    display: block;
    width: 100%;
    position: fixed;
    top: 48px;
    z-index: 8000;
    left: 0;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 50%);
  }
  .full-width [aria-expanded="true"] ~ .overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 48px;
    bottom: 0;
    z-index: 7999;
    background: rgba(0, 0, 0, 0.7);
  }
</style>
