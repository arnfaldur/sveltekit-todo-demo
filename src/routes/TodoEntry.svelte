<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: null | number = null;
	export let contents = '';

	function removeButtonClicked() {
		dispatch('removeButtonClicked', id);
	}
</script>

<li class="flex items-center space-x-4">
    <input class="checkbox" type="checkbox" />
	<input class="input input-bordered" type="text" readonly value={contents} />
	<button class="btn-sm btn-circle btn-outline" on:click={removeButtonClicked}>❌</button>
</li>
