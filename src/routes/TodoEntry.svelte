<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { todoEntry } from '../stores/todoStore';

	const dispatch = createEventDispatcher();

	export let entry: todoEntry;

	let showRemoveButton = false;
</script>

<li
	class="flex items-center space-x-2"
	on:mouseenter={() => (showRemoveButton = true)}
	on:mouseleave={() => (showRemoveButton = false)}
>
	<input
		class="checkbox checkbox-lg checkbox-success"
		type="checkbox"
		bind:checked={entry.done}
        on:change={(e) => dispatch('checkboxToggled', {id: entry.id, state: e.target.checked})}
	/>
	<input class="input input-bordered flex-1" type="text" disabled={entry.done} value={entry.text} />
	{#if showRemoveButton}
		<button
			class="btn btn-sm btn-circle btn-outline btn-error text-xl"
			on:click={() => dispatch('removeButtonClicked', entry.id)}>✖</button
		>
	{/if}
</li>
