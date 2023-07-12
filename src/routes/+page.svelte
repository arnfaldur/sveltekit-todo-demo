<script lang="ts">
	import TodoEntry from './TodoEntry.svelte';

	let entries = ['one', 'two', 'three'];

	function addTodoEntry(e) {
		entries = [e.target.children['new-todo-entry'].value, ...entries];
		e.target.children['new-todo-entry'].value = '';
		console.log(entries);
	}
	function removeTodoEntry(e) {
		console.log(e);
		entries = entries.filter((_, i) => i !== e.detail);
	}
</script>

<h1>Todo Demo</h1>

<form on:submit|preventDefault={addTodoEntry}>
	<input class="input" type="text" name="new-todo-entry" placeholder="What do you need to do?" />
</form>
<ol class="list-none">
	{#each entries as entry, i}
		<TodoEntry id={i} contents={entry} on:removeButtonClicked={removeTodoEntry} />
	{/each}
</ol>
