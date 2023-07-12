<script lang="ts">
	import TodoEntry from './TodoEntry.svelte';

	let entries = ['one', 'two', 'three'];

	function addTodoEntry(e) {
		entries = [...entries, e.target.children['new-todo-entry'].value];
		e.target.children['new-todo-entry'].value = '';
		console.log(entries);
	}
	function removeTodoEntry(e) {
		console.log(e);
		entries = entries.filter((_, i) => i !== e.detail);
	}
</script>

<h1 class="text-3xl font-bold text-center my-6">Todo Demo</h1>

<form class="flex my-4" on:submit|preventDefault={addTodoEntry}>
	<input class="input input-bordered flex-1" type="text" name="new-todo-entry" placeholder="What do you need to do?" />
</form>
<ol class="list-none">
	{#each entries as entry, i}
		<TodoEntry id={i} contents={entry} on:removeButtonClicked={removeTodoEntry} />
	{/each}
</ol>
