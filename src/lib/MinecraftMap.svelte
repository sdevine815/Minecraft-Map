<script>
	import { onMount } from "svelte";

    let img;
    onMount(async () => {
        const data = await fetch("/api/getImage?long=39.430567&lat=-74.645647").then(res => res.json())
        const { src } = data

        img = `<img style='display:block; width:100px;height:100px;' id='base64image'
       src='${src}' />`;
    })
</script>

{@html img}