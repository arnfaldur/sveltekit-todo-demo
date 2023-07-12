<script lang="ts">
	import TodoEntry from './TodoEntry.svelte';
	import { todoEntries, addTodo, removeTodo } from '../stores/todoStore';


 function localAddTodo(e) {
	 addTodo(e.target.children['new-todo-entry'].value)
	 // clear the input field
 	 e.target.children['new-todo-entry'].value = '';
 }
 function localRemoveTodo(e) {
	 removeTodo(e.detail);
 }
</script>

<h1 class="text-3xl font-bold text-center my-6">Todo Demo</h1>

<form class="flex my-4" on:submit|preventDefault={localAddTodo}>
	<input class="input input-bordered flex-1" type="text" name="new-todo-entry" placeholder="What do you need to do?" />
</form>
<ol class="list-none">
	{#each $todoEntries as entry, i}
		<TodoEntry id={i} bind:entry={entry} on:removeButtonClicked={localRemoveTodo} />
	{/each}
</ol>
