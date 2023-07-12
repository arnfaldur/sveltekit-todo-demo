<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: null | number = null;
	export let contents = '';
	let showRemoveButton = false;
	let done = false;

	function removeButtonClicked() {
		dispatch('removeButtonClicked', id);
	}
</script>

<li
	class="flex items-center space-x-2"
	on:mouseenter={() => (showRemoveButton = true)}
	on:mouseleave={() => (showRemoveButton = false)}
>
	<input class="checkbox checkbox-lg checkbox-success" type="checkbox" bind:checked={done} />
	<input
		class="input input-bordered flex-1"
		type="text"
      disabled={done}
		value={contents}
	/>
	{#if showRemoveButton}
		<button
			class="btn btn-sm btn-circle btn-outline btn-error text-xl"
			on:click={removeButtonClicked}>✖</button
		>
	{/if}
</li>
