<script context="module">
	export async function load({ session }) {
		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script>
	export let user;
</script>

<section class="absolute w-full h-full">
	<div
		class="absolute top-0 w-full h-full bg-gray-900"
		style="background-image: url(./img/register_bg_2.png); background-size: 100%; background-repeat: no-repeat;"
	/>
	<div class="container mx-auto px-4 h-full">
		<div class="flex content-center items-center justify-center h-full">
			<div class="w-full lg:w-4/12 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
				>
					<div class="rounded-t mb-0 px-6 py-6">
						<div class="btn-wrapper text-center">
							{#if user}
								<p>Hi {JSON.parse(user).name}.</p>
								<p>Here's your information.</p>
								<div class="my-6">{user}</div>
								<a
									href="/auth/logout"
									rel="external"
									class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
									>Log out</a
								>
							{:else}
								<div class="text-center mb-3">
									<h6 class="text-gray-600 text-sm font-bold">Sign in with</h6>
								</div>
								<button
									class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
									type="button"
									style="transition: all 0.15s ease 0s;"
								>
									<img alt="Google" class="w-5 mr-1" src="./img/google.svg" />
									<a href="/auth/login" rel="external">Google</a>
								</button>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
