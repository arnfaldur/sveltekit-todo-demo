<script lang="ts">
	import TodoEntry from './TodoEntry.svelte';
	import { onMount } from 'svelte';
	import type { todoEntry } from './api/todo/+server';

	let todos: todoEntry[] = [];

	onMount(() => {
		loadTodos();
	});
	async function loadTodos() {
		let response = await fetch('/api/todo');
		// If they managed to add some very quickly before they loaded
		todos = [...(await response.json()), ...todos];
	}

	function updateFetch(body: { action: string; value?: any; id?: number; state?: boolean }) {
		fetch('/api/todo', {
			method: 'POST',
			body: JSON.stringify(body)
		}).then((response) => {
			response.json().then((response) => {
				todos = response;
			});
		});
	}

	function localAddTodo(e: any) {
		let value = e.target.children['new-todo-entry'].value;
		if (value === '') {
			return;
		}
		updateFetch({ action: 'add', value });
		// clear the input field
		e.target.children['new-todo-entry'].value = '';
	}
	function localRemoveTodo(e: { detail: number }) {
		updateFetch({ action: 'remove', id: e.detail });
	}
	function localToggleTodo(e: { detail: { id: number; state: boolean } }) {
		updateFetch({ action: 'toggle', id: e.detail.id, state: e.detail.state });
	}
</script>

<h1 class="text-3xl font-bold text-center my-6">Todo Demo</h1>

<form class="flex my-4" on:submit|preventDefault={localAddTodo}>
	<input
		class="input input-bordered flex-1"
		type="text"
		name="new-todo-entry"
		placeholder="What do you need to do?"
	/>
</form>
<ol class="list-none">
	{#each todos as entry}
		<TodoEntry
			bind:entry
			on:removeButtonClicked={localRemoveTodo}
			on:checkboxToggled={localToggleTodo}
		/>
	{/each}
</ol>
