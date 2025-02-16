<script>
	import { onMount } from "svelte";
    import { getSatellite, mapify } from "./mapify";

    let img;
    onMount(async () => {
        const apiKey = "AIzaSyBc2fb__ShgSJtk3HUhcpiK9qvFu9Ix0qs"
        const lat = 0;
        const long = 0;
        let buffer = await getSatellite(apiKey);
        // let map = await mapify(png);
        let b64data = buffer.toString('base64')

        let src = `data:image/jpeg;base64,${b64data.toString("base64")}`;
        img = `<img style='display:block; width:100px;height:100px;' id='base64image'
       src='${src}' />`;
    })
</script>

{@html img}