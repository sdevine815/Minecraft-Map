<script>
    export let width;
    export let height;

    let src = '';
    let loading = false;
    export async function getMap(long, lat){
        loading = true
        console.log(`/api/getImage?long=${long}&lat=${lat}`)
        const data = await fetch(`/api/getImage?long=${long}&lat=${lat}`).then(res => res.json())
        src = data.src

        loading = false
    }
</script>

{#if loading}
    <p>Loading...</p>
    {:else}
    <img src={src} alt="minecraft map" style={`height: ${height};width: ${width}`} />
{/if}
