<script>
    import MinecraftMap from "$lib/MinecraftMap.svelte";
	import { onMount } from "svelte";
    let minecraftMapRef;
    let long = 0;
    let lat = 0;

    onMount(() => {
        navigator.geolocation.getCurrentPosition(async pos => {
            console.log(pos.coords.accuracy)
            lat = pos.coords.longitude;
            long = pos.coords.latitude;

            console.log(long, lat)
        }, console.error, { enableHighAccuracy: true })
    })

</script>


<MinecraftMap bind:this={minecraftMapRef} width={"75vh"} height={"75vh"} />
<button on:click={() => minecraftMapRef.getMap(long, lat)}>Update Minecraft Map Position</button>